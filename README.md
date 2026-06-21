<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZedXLab Prodia Image API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0d1117;
            color: #e6edf3;
            line-height: 1.6;
            padding: 2rem;
        }
        .container { max-width: 900px; margin: 0 auto; }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #58a6ff; }
        .subtitle { color: #8b949e; font-size: 1.1rem; margin-bottom: 2rem; }
        .badges { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .badge {
            display: inline-flex; align-items: center; gap: 0.4rem;
            padding: 0.35rem 0.75rem; border-radius: 6px;
            font-size: 0.8rem; font-weight: 600; text-decoration: none;
            color: #fff; border: 1px solid rgba(255,255,255,0.1);
        }
        .badge-green { background: #238636; }
        .badge-blue { background: #1f6feb; }
        .badge-purple { background: #8957e5; }
        .badge-orange { background: #d29922; }
        .badge-gray { background: #30363d; }
        .section { margin-bottom: 2.5rem; }
        .section h2 {
            font-size: 1.5rem; color: #e6edf3;
            border-bottom: 1px solid #21262d; padding-bottom: 0.5rem;
            margin-bottom: 1rem;
        }
        .section h3 { font-size: 1.1rem; color: #58a6ff; margin: 1rem 0 0.5rem; }
        .endpoint-box {
            background: #161b22; border: 1px solid #30363d;
            border-radius: 8px; padding: 1.2rem; margin: 1rem 0;
            font-family: 'SF Mono', 'Fira Code', monospace;
        }
        .method { color: #3fb950; font-weight: 700; }
        .url { color: #58a6ff; }
        .param { color: #d2a8ff; }
        .optional { color: #8b949e; font-style: italic; }
        table {
            width: 100%; border-collapse: collapse; margin: 1rem 0;
            font-size: 0.9rem;
        }
        th, td {
            padding: 0.6rem 1rem; text-align: left;
            border-bottom: 1px solid #21262d;
        }
        th { background: #161b22; color: #58a6ff; font-weight: 600; }
        tr:hover td { background: #161b22; }
        code {
            background: #1c2128; padding: 0.2rem 0.5rem;
            border-radius: 4px; font-size: 0.85rem;
            font-family: 'SF Mono', 'Fira Code', monospace;
            color: #f0883e;
        }
        pre {
            background: #161b22; border: 1px solid #30363d;
            border-radius: 8px; padding: 1rem; overflow-x: auto;
            font-size: 0.85rem; margin: 0.8rem 0;
        }
        pre code { background: none; padding: 0; color: #e6edf3; }
        .response-box {
            background: #161b22; border: 1px solid #30363d;
            border-radius: 8px; padding: 1rem; margin: 1rem 0;
        }
        .response-box .label { color: #3fb950; font-weight: 600; margin-bottom: 0.3rem; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1rem 0; }
        .feature-card {
            background: #161b22; border: 1px solid #30363d;
            border-radius: 8px; padding: 1.2rem;
        }
        .feature-card h4 { color: #58a6ff; margin-bottom: 0.3rem; }
        .feature-card p { color: #8b949e; font-size: 0.85rem; }
        .style-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.5rem; margin: 1rem 0; }
        .style-chip {
            background: #1c2128; border: 1px solid #30363d;
            border-radius: 6px; padding: 0.5rem 0.75rem;
            text-align: center; font-size: 0.8rem; color: #d2a8ff;
        }
        .footer {
            border-top: 1px solid #21262d; padding-top: 1.5rem;
            margin-top: 3rem; text-align: center; color: #8b949e;
            font-size: 0.85rem;
        }
        a { color: #58a6ff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .speed { color: #3fb950; font-weight: 700; }
        .owner { color: #f0883e; }
    </style>
</head>
<body>
<div class="container">

    <h1>ZedXLab Prodia Image API</h1>
    <p class="subtitle">Fast, free image generation API powered by Prodia Flux 2 Klein 4B. Sub-second generation times.</p>

    <div class="badges">
        <a href="https://github.com/zedxlab/zedxlab-prodimg-api" class="badge badge-gray">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
        </a>
        <span class="badge badge-green">Deployed on Vercel</span>
        <span class="badge badge-purple">Prodia Flux 2</span>
        <span class="badge badge-blue">Serverless</span>
        <span class="badge badge-orange"><span class="owner">@zade4everbot</span></span>
    </div>

    <div class="section">
        <h2>Quick Start</h2>
        <div class="endpoint-box">
            <span class="method">GET</span> <span class="url">https://zedxlab-prodimg-api.vercel.app/?prompt=<span class="param">your+prompt</span></span>
        </div>
        <pre><code>curl "https://zedxlab-prodimg-api.vercel.app/?prompt=a+beautiful+sunset"</code></pre>
    </div>

    <div class="section">
        <h2>Features</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <h4>Lightning Fast</h4>
                <p><span class="speed">&lt; 1s</span> generation time with Prodia Flux 2 Klein 4B</p>
            </div>
            <div class="feature-card">
                <h4>20+ Styles</h4>
                <p>Anime, Cinematic, Digital Art, 3D, and more built-in presets</p>
            </div>
            <div class="feature-card">
                <h4>Custom Dimensions</h4>
                <p>Any aspect ratio or exact pixel dimensions you want</p>
            </div>
            <div class="feature-card">
                <h4>Free & Open</h4>
                <p>No API key required. No rate limits. Just call and generate.</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Parameters</h2>
        <table>
            <thead>
                <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>prompt</code></td>
                    <td>string</td>
                    <td><strong>Yes</strong></td>
                    <td>Text description of the image to generate</td>
                </tr>
                <tr>
                    <td><code>aspect</code></td>
                    <td>string</td>
                    <td class="optional">No</td>
                    <td><code>square</code> (1024x1024), <code>landscape</code> (1344x768), <code>portrait</code> (768x1344)</td>
                </tr>
                <tr>
                    <td><code>dimensions</code></td>
                    <td>string</td>
                    <td class="optional">No</td>
                    <td>Custom dimensions like <code>1920x1080</code> (overrides <code>aspect</code>)</td>
                </tr>
                <tr>
                    <td><code>style</code></td>
                    <td>string</td>
                    <td class="optional">No</td>
                    <td>Style preset (default: <code>photographic</code>)</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Aspect Ratios</h2>
        <table>
            <thead>
                <tr><th>Value</th><th>Dimensions</th><th>Use Case</th></tr>
            </thead>
            <tbody>
                <tr><td><code>square</code></td><td>1024 x 1024</td><td>Profile pictures, thumbnails, social</td></tr>
                <tr><td><code>landscape</code></td><td>1344 x 768</td><td>Banners, wallpapers, backgrounds</td></tr>
                <tr><td><code>portrait</code></td><td>768 x 1344</td><td>Posters, phone wallpapers, portraits</td></tr>
                <tr><td>Custom</td><td>Any WxH</td><td>Use <code>dimensions</code> param</td></tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Style Presets</h2>
        <p>Pass any of these as the <code>style</code> parameter:</p>
        <div class="style-grid">
            <div class="style-chip">cinematic</div>
            <div class="style-chip">anime</div>
            <div class="style-chip">digital-art</div>
            <div class="style-chip">3d-model</div>
            <div class="style-chip">photographic</div>
            <div class="style-chip">pixel-art</div>
            <div class="style-chip">comic-book</div>
            <div class="style-chip">fantasy-art</div>
            <div class="style-chip">line-art</div>
            <div class="style-chip">low-poly</div>
            <div class="style-chip">isometric</div>
            <div class="style-chip">origami</div>
            <div class="style-chip">neon-punk</div>
            <div class="style-chip">enhance</div>
            <div class="style-chip">3d-render</div>
            <div class="style-chip">modeling-compound</div>
            <div class="style-chip">professional</div>
            <div class="style-chip">texture</div>
            <div class="style-chip">oil-painting</div>
            <div class="style-chip">watercolor</div>
        </div>
    </div>

    <div class="section">
        <h2>Examples</h2>
        <h3>Basic generation</h3>
        <pre><code>GET /?prompt=a+cute+cat+playing+with+yarn</code></pre>
        <h3>Landscape with style</h3>
        <pre><code>GET /?prompt=cyberpunk+city+at+night&aspect=landscape&style=cinematic</code></pre>
        <h3>Custom dimensions + anime style</h3>
        <pre><code>GET /?prompt=samurai+warrior&dimensions=1920x1080&style=anime</code></pre>
        <h3>Portrait poster</h3>
        <pre><code>GET /?prompt=movie+poster+of+a+dragon&aspect=portrait&style=digital-art</code></pre>
    </div>

    <div class="section">
        <h2>Response</h2>
        <div class="response-box">
            <div class="label">Success Response (200)</div>
            <pre><code>{
    "status": true,
    "owner": "zade4everbot",
    "model": "inference.flux-2.klein.4b.txt2img.v1",
    "prompt": "a cute cat",
    "style": "photographic",
    "dimensions": "1024x1024",
    "image_url": "https://tmpfiles.org/dl/xxxxx.jpg",
    "time_taken": "0.85s"
}</code></pre>
        </div>
        <div class="response-box">
            <div class="label">Error Response (400/500)</div>
            <pre><code>{
    "status": false,
    "error": "Error message here",
    "owner": "zade4everbot",
    "time_taken": "0.12s"
}</code></pre>
        </div>
    </div>

    <div class="section">
        <h2>Tech Stack</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <h4>Runtime</h4>
                <p>Node.js on Vercel Serverless Functions</p>
            </div>
            <div class="feature-card">
                <h4>Model</h4>
                <p>Prodia Flux 2 Klein 4B (txt2img)</p>
            </div>
            <div class="feature-card">
                <h4>Storage</h4>
                <p>TmpFiles.org (temporary image hosting)</p>
            </div>
            <div class="feature-card">
                <h4>Deploy</h4>
                <p>GitHub Actions auto-deploy on push</p>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Built by <strong class="owner">@zade4everbot</strong> | Powered by <a href="https://prodia.com">Prodia</a> | Deployed on <a href="https://vercel.com">Vercel</a></p>
    </div>

</div>
</body>
</html>
