# 📁 Media Guide — Where to Put Your Images & Videos

This folder (`public/`) is where all your images and videos live. Anything you drop
here is reachable on the website at `/<path>` (the `public` part is dropped from the URL).

Below is **exactly** what to add, where, and the recommended size for each slot.
After you add a file, tell me and I'll switch it on — or follow the "Turn it on" note.

---

## 🗂️ Folder structure

```
public/
├── images/
│   ├── profile/      ← your photo
│   ├── projects/     ← one image per project card
│   └── og/           ← social-share preview image
└── videos/
    ├── hero/         ← optional background reel for the hero
    └── projects/     ← optional project showreels / clips
```

---

## 1. Your Photo  →  `public/images/profile/`

| What | Detail |
|------|--------|
| **File name** | `profile.jpg` (or `.png`) |
| **Where it shows** | The "About" section (the framed photo) |
| **Best size** | Portrait, **900 × 1200 px** (3:4 ratio), under ~500 KB |
| **Tip** | A clean, well-lit professional headshot or half-body shot works best. Dark or neutral background fits the theme. |

**Turn it on:** open `src/lib/data.ts` and change
`export const PROFILE_IMAGE = "";` → `"/images/profile/profile.jpg"`

---

## 2. Project Images  →  `public/images/projects/`

One image per card in the "Work" section. Use the **exact file names** below so they
plug straight in:

| Project card | File name | Suggested content |
|--------------|-----------|-------------------|
| Ittehad Steel (featured) | `ittehad-steel.jpg` | A strong brand campaign visual / steel/construction shot |
| Hyundai Islamabad | `hyundai.jpg` | Showroom photo or a vehicle hero shot |
| EV Launch (Capital Smart & Jetour) | `ev-launch.jpg` | EV vehicle / launch-event visual |
| AI Creative Production | `ai-production.jpg` | A frame from one of your AI ads |
| Divine Nest (Real Estate) | `divine-nest.jpg` | Property / interior visual |
| We Here to Serve (NGO) | `we-here-to-serve.jpg` | Campaign / community photo |

| What | Detail |
|------|--------|
| **Best size** | Landscape, **1600 × 1000 px** (16:10). The featured card looks best at **1600 × 900** (16:9). |
| **Format** | `.jpg` for photos, `.webp` if you want smaller files |
| **Tip** | High-contrast, uncluttered images read best — text overlays sit on the bottom of each card. |

**Turn each on:** in `src/lib/data.ts`, each project has an `image: ""` line with the
ready path in the comment next to it. Just move the path into the quotes, e.g.
`image: "/images/projects/hyundai.jpg"`.

---

## 3. Social Share Image (optional)  →  `public/images/og/`

| What | Detail |
|------|--------|
| **File name** | `og-image.jpg` |
| **Where it shows** | The preview thumbnail when your link is shared on WhatsApp, LinkedIn, Facebook, X, etc. |
| **Best size** | **1200 × 630 px** exactly |
| **Tip** | Your name + title on a dark gold-accented background looks premium. I can design this for you. |

**Turn it on:** tell me and I'll add it to the site metadata (`src/app/layout.tsx`).

---

## 4. Videos (optional)

### Hero background reel  →  `public/videos/hero/`
| What | Detail |
|------|--------|
| **File name** | `hero.mp4` |
| **Best size** | 1920 × 1080, **under 10–15 sec**, compressed (aim < 5 MB), no audio needed |
| **Tip** | A subtle, slow-moving cinematic clip behind the hero text. Keep it dark so the text stays readable. |

### Project showreels  →  `public/videos/projects/`
| What | Detail |
|------|--------|
| **File names** | e.g. `ai-reel.mp4`, `automotive-reel.mp4` |
| **Best size** | 1080p, keep each clip compressed (< 10 MB ideally) |
| **Tip** | Great for your AI advertising samples. I can add a video lightbox/player to project cards on request. |

> ⚠️ Videos aren't wired up yet (images are). When you add any, tell me what they are
> and I'll build the player/background for them.

---

## ✅ Quick checklist

- [ ] `images/profile/profile.jpg` — your photo
- [ ] `images/projects/ittehad-steel.jpg`
- [ ] `images/projects/hyundai.jpg`
- [ ] `images/projects/ev-launch.jpg`
- [ ] `images/projects/ai-production.jpg`
- [ ] `images/projects/divine-nest.jpg`
- [ ] `images/projects/we-here-to-serve.jpg`
- [ ] `images/og/og-image.jpg` — social share (optional)
- [ ] `videos/hero/hero.mp4` — hero reel (optional)
- [ ] `videos/projects/*.mp4` — showreels (optional)

**Easiest path:** just drop the files into the right folders using the exact names
above, then message me "images added" — I'll flip every switch and rebuild for you.
