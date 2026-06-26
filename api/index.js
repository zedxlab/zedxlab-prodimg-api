const fetch = require('node-fetch');
const FormData = require('form-data');

const PRODIA_TOKEN = "eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIn0..76RrpEG040IyJ79x.Dr5TtRAGXlAwTTLdD1kEHNvHcXX5IFOucsn6yrEmRd9k4-m4x0IGIhrlQ3jtE9ymuYkvrI_EyTGCvQtdfyyQmc3cohzuHNsKwYLLlSii4CqR56TNBSP0YN7ghw4d9_hOC6CtpOjhJ3HgFE1g2WiJkD3Rw07YWsxpHaxhjZfLbl6Ss3adbO4xDI3nxw8LulZYJBUn9kytPy07gZkEPa1x7MPExC6KWToQLJnFpwdMl_T_40QdpwoNlxipnCCUV4MccG1TXcQeaW4wH-nOG13uIL6vdJcqdUygn0P5_Cl2gIHQ5ddei6qcg2qLiaTrxEGVsjUy-dFi2iLL6TtYP5M2jiYDinyj1MAkSbwtXDw7_1r4_O3I8FSVvUzlCY4ryOEOOX7MUK4o82W6-8eTSJ77YzC5elKAio_nV0LiYXDN2ITFxUWOAzD7AwdVwfDjMMYsiOeiWiw4sOxMlc1gfFGklSXZwbw2q8388GNcJeLtRYezwxMvcploiusbGiCqZD1yh2eUanSrWcn9DHCZAXz_NRU0hhNj5lo_PNdq_pRukY-DQXc.Jre9N5iSTJsHIlLBXy7LEg
";
const MODEL_NAME = "inference.flux-2.klein.4b.txt2img.v1";

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const startTime = Date.now();
    
    // 1. Query me 'style' parameter bhi extract kar liya
    const { prompt, aspect, dimensions, style } = req.query;

    if (!prompt) {
        return res.status(400).json({
            status: false,
            error: "Prompt query parameter is required.",
            owner: "zade4everbot"
        });
    }

    // Dimensions Logic (Same as before)
    let width = 1024, height = 1024;
    if (dimensions) {
        const normalizedDims = dimensions.replace('×', 'x');
        const parts = normalizedDims.split('x');
        if (parts.length === 2) {
            width = parseInt(parts[0]) || 1024;
            height = parseInt(parts[1]) || 1024;
        }
    } else if (aspect) {
        const aspectLower = aspect.toLowerCase();
        if (aspectLower === 'portrait') { width = 768; height = 1344; }
        else if (aspectLower === 'landscape') { width = 1344; height = 768; }
        else if (aspectLower === 'square') { width = 1024; height = 1024; }
    }

    // 2. Style Mapping Logic (Kuch popular shortcuts set kar diye hain)
    let chosenStyle = "photographic"; // Default style
    if (style) {
        const styleLower = style.toLowerCase();
        if (styleLower === 'cinema' || styleLower === 'cinematic') chosenStyle = "cinematic";
        else if (styleLower === 'anime') chosenStyle = "anime";
        else if (styleLower === 'digital' || styleLower === 'digital-art') chosenStyle = "digital-art";
        else chosenStyle = styleLower; // Agar dropdown ka exact name pass kiya ho
    }

    try {
        const prodiaUrl = 'https://inference.prodia.com/v2/job';
        const jobPayload = {
            "type": MODEL_NAME,
            "config": {
                "prompt": prompt,
                "width": width,
                "height": height,
                "style_preset": chosenStyle, // Dynamic style preset inject ho gaya
                "steps": 4,
                "seed": Math.floor(Math.random() * 99999999)
            }
        };

        const prodiaResponse = await fetch(prodiaUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PRODIA_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'image/jpeg',
                'Origin': 'https://app.prodia.com',
                'Referer': 'https://app.prodia.com/'
            },
            body: JSON.stringify(jobPayload)
        });

        if (!prodiaResponse.ok) {
            const errText = await prodiaResponse.text();
            throw new Error(`Prodia Core Reject: ${prodiaResponse.status} - ${errText}`);
        }

        const imageBuffer = await prodiaResponse.buffer();

        // Cloud host storage integration (tmpfiles)
        const form = new FormData();
        form.append('file', imageBuffer, {
            filename: `flux2_zade_${Date.now()}.jpg`,
            contentType: 'image/jpeg',
        });

        const tmpfilesResponse = await fetch('https://tmpfiles.org/api/v1/upload', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        if (!tmpfilesResponse.ok) throw new Error(`TmpFiles Storage Connection Failed.`);

        const tmpData = await tmpfilesResponse.json();
        const directImageUrl = tmpData.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
        const timeTakenSec = ((Date.now() - startTime) / 1000).toFixed(2) + "s";

        // Full JSON manifest layout output (Style parameter added)
        return res.status(200).json({
            status: true,
            owner: "zade4everbot",
            model: MODEL_NAME,
            prompt: prompt,
            style: chosenStyle,
            dimensions: `${width}x${height}`,
            image_url: directImageUrl,
            time_taken: timeTakenSec
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
            owner: "zade4everbot",
            time_taken: ((Date.now() - startTime) / 1000).toFixed(2) + "s"
        });
    }
};
