<div align="center">

# ⚡ ZedXLab Prodia Image API

### Generate images with Prodia Flux 2 — free, no auth, sub-second

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel&logoColor=white)](https://zedxlab-prodimg-api.vercel.app)
[![GitHub](https://img.shields.io/github/stars/zedxlab/zedxlab-prodimg-api?style=for-the-badge&logo=github&color=yellow)](https://github.com/zedxlab/zedxlab-prodimg-api)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=open-source-initiative&logoColor=white)](#)
[![Owner](https://img.shields.io/badge/Owner-@zade4everbot-pink?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/zade4everbot)

---

**One prompt. One call. Image in < 1s.**

`GET /?prompt=your+text` → JSON with image URL

</div>

---

## ⚡ Quick Start

```bash
# Basic — generate an image
curl "https://zedxlab-prodimg-api.vercel.app/?prompt=a+cute+cat"

# With style
curl "https://zedxlab-prodimg-api.vercel.app/?prompt=cyberpunk+city&style=anime"

# Custom dimensions
curl "https://zedxlab-prodimg-api.vercel.app/?prompt=samurai&dimensions=1920x1080"
```

---

## 🔌 Endpoint

### `GET /?prompt=<text>` — Image Generation

> Node.js · ~120 LOC · Prodia Flux 2 Klein 4B · < 1s

Generates an image from a text prompt and returns a direct download URL.

```json
{
  "status": true,
  "owner": "zade4everbot",
  "model": "inference.flux-2.klein.4b.txt2img.v1",
  "prompt": "a cute cat",
  "style": "photographic",
  "dimensions": "1024x1024",
  "image_url": "https://tmpfiles.org/dl/xxxxx.jpg",
  "time_taken": "0.85s"
}
```

---

## 📐 Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `prompt` | string | **Yes** | Text description of image to generate |
| `aspect` | string | No | `square` / `landscape` / `portrait` |
| `dimensions` | string | No | Custom WxH like `1920x1080` (overrides `aspect`) |
| `style` | string | No | Style preset (default: `photographic`) |

---

## 🎨 Style Presets

Pass any of these as the `style` parameter:

| | | | | |
|---|---|---|---|---|
| `cinematic` | `anime` | `digital-art` | `3d-model` | `photographic` |
| `pixel-art` | `comic-book` | `fantasy-art` | `line-art` | `low-poly` |
| `isometric` | `origami` | `neon-punk` | `enhance` | `3d-render` |
| `modeling-compound` | `professional` | `texture` | `oil-painting` | `watercolor` |

---

## 📐 Aspect Ratios

| Value | Dimensions | Use Case |
|---|---|---|
| `square` | 1024 x 1024 | Profile pictures, thumbnails |
| `landscape` | 1344 x 768 | Banners, wallpapers |
| `portrait` | 768 x 1344 | Posters, phone wallpapers |
| Custom | Any WxH | Use `dimensions` param |

---

## 🛠️ Tech Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Prodia](https://img.shields.io/badge/Prodia-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMiAxOGMtMy4zMSAwLTYtMi42OS02LTZzMi42OS02IDYtNiA2IDIuNjkgNiA2LTIuNjkgNi02IDZ6Ii8+PC9zdmc+&logoColor=white)

</div>

---

## 📁 Structure

```
zedxlab-prodimg-api/
├── api/
│   └── index.js       # / — Image generation endpoint (~120 LOC)
├── vercel.json         # Route config
├── package.json
└── README.md
```

---

## 👤 Owner

<div align="center">

[![Telegram](https://img.shields.io/badge/@zade4everbot-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/zade4everbot)
[![GitHub](https://img.shields.io/badge/zedxlab-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zedxlab)

</div>

---

<div align="center">

**Made with ❤️ by [@zade4everbot](https://t.me/zade4everbot)**

</div>
