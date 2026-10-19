# Weechy — Official Website

> **“Your music. Your device. Your rhythm.”**
> The official website for **Weechy**, a lightweight, local-first Android music player featuring synchronized lyrics, a 10-band graphic equalizer, 4 OLED-optimized dark themes, and an uncompromising privacy-first design.
> 
> Maintained by **itsmectrl**.

---

## 1. Architectural Overview

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Backend:** Express full-stack proxy (`server.ts`) for secure, cached release metadata fetching and acoustic reference routing.
- **Acoustic Advisor:** Interactive 10-band DSP frequency and impedance curve advisor calibrated for Android Audio HAL architecture.
- **Signature Feature:** Custom Canvas 2D programmatic sound-wave field with deterministic multi-octave harmonic oscillations and smooth Gaussian pointer deformation.
- **Internationalization:** Complete English and Arabic (`rtl`) localization with instant language switching and reciprocal URL sync (`?lang=ar`).
- **SEO & Discoverability:** Rich OpenGraph, Twitter Cards, Schema.org JSON-LD (`SoftwareApplication` & `WebSite`), `sitemap.xml`, and `robots.txt`.

---

## 2. Project Directory Structure

```text
/
├── index.html                   # HTML entry point with metadata, JSON-LD, and favicon
├── metadata.json                # Project descriptor & configuration
├── package.json                 # Dependencies & build scripts (maintained by itsmectrl)
├── server.ts                    # Full-stack Express server with Vite middleware integration
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite build & alias setup
├── README.md                    # Operational & maintenance guide
├── public/
│   ├── favicon.svg              # Authentic vinyl record brand logo
│   ├── robots.txt               # Search engine crawl rules pointing to sitemap.xml
│   ├── sitemap.xml              # Canonical sitemap with hreflang alternates
│   ├── manifest.webmanifest     # PWA manifest
│   ├── assets/
│   │   └── brand/               # App icon & SVG assets
│   └── screenshots/             # Authentic Android screen captures:
│       ├── songs.png            # Main songs library view
│       ├── lyrics.png           # Synchronized lyrics karaoke view
│       ├── albums.png           # Album grid artwork view
│       ├── landscape.png        # Dedicated tablet / car dock landscape mode
│       ├── settings.png         # Audio DSP & theme preferences
│       ├── artist.png           # Artist discography breakdown
│       ├── folders.png          # Filesystem storage hierarchy
│       └── playlist.png         # Custom Room SQLite playlist management
└── src/
    ├── App.tsx                  # Main application orchestrator
    ├── main.tsx                 # React entry point
    ├── index.css                # Global styles & design system CSS tokens
    ├── types/
    │   └── index.ts             # TypeScript interfaces for releases, FAQ, screenshots
    ├── config/
    │   └── site.ts              # Central site configuration, copy, and FAQ items
    └── components/
        ├── SoundWaveCanvas.tsx  # Interactive programmatic 2D sound-wave field
        ├── Navbar.tsx           # Minimalist top navigation & language toggle
        ├── Hero.tsx             # Confident hero section with download CTA
        ├── ScreenshotsShowcase.tsx # Tabbed screenshot viewer with zoom modal
        ├── FeaturesSection.tsx  # Deep feature explanations & interactive EQ
        ├── EqualizerInteractive.tsx # 10-band graphic equalizer & DSP simulator
        ├── DownloadSection.tsx  # Verifiable download card, SHA-256 copy & guide
        ├── ChangelogSection.tsx # Chronological version history from GitHub
        ├── FAQSection.tsx       # Searchable, category-filtered semantic FAQ
        ├── PrivacySection.tsx   # Truthful local-first privacy statement
        ├── Footer.tsx           # Clean minimalist footer & wave emblem
        └── AudioIntelligenceModal.tsx # Acoustic & EQ Tuning Advisor modal
```

---

## 3. Signature Sound-Wave Implementation

The signature sound-wave canvas (`src/components/SoundWaveCanvas.tsx`) renders continuous harmonic audio oscillations:
- **Palette:** Silver-white (`#D8D9DE`), graphite (`#8A8D96`), charcoal border (`#363841`), and restrained crimson (`#C41E3A`).
- **Mathematical Function:** Deterministic multi-octave sine/cosine harmonics:
  $$y(x, t) = \text{baseY} + A_1 \sin(k_1 x + \omega_1 t) + \sum A_n \sin(k_n x + \omega_n t + \phi_n)$$
- **Pointer Interaction:** Elastic Gaussian falloff:
  $$\text{displacement} = \text{pull} \times \exp\left(-\frac{\Delta x^2 + \Delta y^2}{2 \sigma^2}\right)$$
  When the cursor leaves, the wave elastically returns to baseline with zero accumulated drift.
- **Scroll Interaction:** Compresses and subtly shifts phase with window scroll, focusing reader attention on content below.
- **Performance:** Throttled with `requestAnimationFrame`, pauses when `document.hidden`, and honors `prefers-reduced-motion: reduce`.

---

## 4. Release Integration & Metadata Pipeline

The website dynamically consumes release data from the official repository:
- **Endpoint:** `https://raw.githubusercontent.com/itsmectrl/weechy-releases/main/version.json`
- **Current Series:** `New Version`
- **Security Validation:** `server.ts` validates that incoming download URLs use HTTPS and originate strictly from `github.com` or `raw.githubusercontent.com`.
- **Integrity Checksum:** SHA-256 hash is published with every release and can be verified via terminal:
  - Linux/macOS: `sha256sum Weechy-1.3-New-version.apk`
  - Windows: `certutil -hashfile Weechy-1.3-New-version.apk SHA256`

---

## 5. Development & Deployment

### Run Locally:
```bash
npm install
npm run dev
```
The server boots at `http://localhost:3000` with Express and Vite middlewares.

### Production Build:
```bash
npm run build
npm start
```

### Static Hosting on GitHub Pages:
The site can be statically exported to GitHub Pages:
1. Run `npm run build` to generate the `/dist` directory.
2. In GitHub repository settings under **Pages**, select **GitHub Actions** or deploy the `dist` folder to the `gh-pages` branch.
3. Configure your custom domain or verify base path in `src/config/site.ts`.

---

## 6. How to Update Content & Assets

- **Updating the Default Release:** Edit `src/config/site.ts` (`INITIAL_RELEASE`).
- **Adding Screenshots:** Replace or add images in `/public/screenshots/` and update `SCREENSHOTS` array in `src/config/site.ts`.
- **Adding FAQ Questions:** Add items to `FAQ_ITEMS` in `src/config/site.ts`. Both English and Arabic are maintained reciprocally.
- **Updating Brand Logo:** Modify `/public/favicon.svg` and `/public/assets/brand/`.

---

## 7. License & Ownership
Copyright (c) 2026 itsmectrl. All rights reserved.
Weechy is built for Android (Oreo 8.0+ through Android 15, package `com.itsmectrl.weechy`).
Open Source under the MIT License.
