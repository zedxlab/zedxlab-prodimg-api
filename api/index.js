const fetch = require('node-fetch');
const FormData = require('form-data');

const PRODIA_TOKEN = "eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIn0..VRAglj3aEIOnNlO-.W5tLm8a-UWUUY6Rd69FtzAJtH1F7lzQw_OtrG1EEXGrJwBqr4OwUT4SfsSHFHp5VtAtEIuIRsdUK2-BlGh8KCOdZtW9YntrY7rev2WjL7jWSXW78scLH8o32G5rtuQttA8lU_4JcPakODHoEoi5DPNzFv3174mJHlwDiVQ-GzDn2mjIXnewJ26uPlg9WJtWLrkBE059B4WedFRsmMEVTk6u1MI70MeQhq7uGVgWj-zISQbayNTwV6S-D4AfN5qZ_eXDvmwgUm_6utJZ9CROHEYq9HrpPI1S1SoTLFDAXZcszMFfZRz1pQSpJOf1Ufgc-xEWD8N6FCqxMvgfqt4ualx6djX2XcKrGclvwxjtLtzqfCvNpf7AkVtxkPdEsqmi2VcIE9d4eULLiBcTbEqzyXAzwVS9NlO9T6gpojNbxKlxXiodETslSVRrHDX2pIdX1ySk_MCWmRSgukgXNVNp7dwPypvSEAPH3EGBcN5m85qOlx-BBeIcah4svTJ-oWktWJCFb7OEX34beGzAn-vOzh3K-SNIfL7CdNnl9QpfNWALU4eA.J0irWSQ_iPeL4MRGvo9tzQ";
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
