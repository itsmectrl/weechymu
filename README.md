# Weechy — Official Website

> **“Your music. Your device. Your rhythm.”**
> 
> The official website for **Weechy**, a lightweight, local-first music player for Android. Built for personal audio libraries with synchronized lyrics, a 10-band graphic equalizer, 4 OLED-optimized dark visual themes, and an uncompromising privacy-first architecture.
>
> Maintained by **itsmectrl** • Official App Repository: [`itsmectrl/weechy-releases`](https://github.com/itsmectrl/weechy-releases)

---

## Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Key Product Capabilities](#2-key-product-capabilities)
3. [Project Directory Structure](#3-project-directory-structure)
4. [Signature Feature: Interactive Sound-Wave Field](#4-signature-feature-interactive-sound-wave-field)
5. [Release Integration & Security Validation](#5-release-integration--security-validation)
6. [Interactive 10-Band Graphic Equalizer & Acoustic Advisor](#6-interactive-10-band-graphic-equalizer--acoustic-advisor)
7. [Internationalization & Arabic RTL Support](#7-internationalization--arabic-rtl-support)
8. [Technical SEO & Discoverability](#8-technical-seo--discoverability)
9. [Development & Build Workflow](#9-development--build-workflow)
10. [Deployment Guide (GitHub Pages & Static Hosting)](#10-deployment-guide-github-pages--static-hosting)
11. [Content & Asset Maintenance Guide](#11-content--asset-maintenance-guide)
12. [License & Ownership](#12-license--ownership)

---

## 1. Architectural Overview

- **Frontend Framework:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Backend / API Layer:** Express full-stack proxy (`server.ts`) with Vite middleware integration in development and high-performance static asset delivery in production.
- **Data Persistence:** Client-side language preference stored in `localStorage` and synchronized via URL query parameters (`?lang=ar`).
- **Sound-Wave Canvas:** 2D programmatic canvas rendering continuous harmonic audio waveforms with real-time pointer physics and viewport scroll responsiveness.
- **Acoustic Advisor Engine:** Fast, zero-dependency acoustic intelligence engine (`/api/audio-expert`) providing headphone EQ calibrations (e.g., Sony WH-1000XM series, Sennheiser, neutral Harman target) and Android Audio HAL codec analysis.
- **Privacy Standard:** Zero third-party telemetry SDKs, zero advertising trackers, and zero external cookies.

---

## 2. Key Product Capabilities

Weechy is built with Kotlin and Jetpack Compose for Android 8.0 (Oreo)+ up to Android 15:

- **Local Music Library:** Instant indexing of on-device audio files through Android MediaStore. Organization by Songs, Albums, Artists, Playlists, and Folders.
- **Audio Codec Support:** Decodes MP3, FLAC (lossless up to 24-bit/96kHz), M4A, AAC, OGG, WAV, and OPUS based on device hardware and media decoders.
- **10-Band Graphic Equalizer:** Frequency bands at 31 Hz, 62 Hz, 125 Hz, 250 Hz, 500 Hz, 1 kHz, 2 kHz, 4 kHz, 8 kHz, and 16 kHz with gains from -12 dB to +12 dB.
- **DSP Enhancements:** Bass Boost, Virtualizer 3D spatial widening, tempo adjustment from 0.5× to 2.0× without pitch shift, crossfade, and gapless transition simulation.
- **Layered Synced Lyrics:** 
  1. User-edited custom lyrics stored locally.
  2. Local sidecar `.lrc` files in track folders.
  3. Embedded ID3v2 / Vorbis metadata tags.
  4. Local disk cache for offline replay.
  5. Optional online retrieval via open-source LRCLIB.
- **4 Dark Visual Themes:** Graphite Noir, battery-saving OLED Black, Midnight Navy, and Deep Crimson, with dynamic palette extraction from album cover art.
- **Playback Mechanics:** Lock screen controls, notification shade integration, configurable sleep timer, and automatic pause on headphone disconnect (Audio Focus).

---

## 3. Project Directory Structure

```text
weechy-website/
├── index.html                   # HTML entry point with metadata, JSON-LD, and favicon
├── metadata.json                # Project descriptor & capability configuration
├── package.json                 # Dependencies & scripts (maintained by itsmectrl)
├── server.ts                    # Full-stack Express server with Vite middleware integration
├── tsconfig.json                # Strict TypeScript compiler options
├── vite.config.ts               # Vite build configuration with Tailwind v4 & aliases
├── README.md                    # Operational & maintenance guide
├── public/
│   ├── favicon.svg              # Authentic vinyl record brand logo
│   ├── robots.txt               # Search engine directives pointing to sitemap.xml
│   ├── sitemap.xml              # Canonical XML sitemap with hreflang alternates
│   ├── manifest.webmanifest     # PWA manifest
│   ├── assets/
│   │   └── brand/               # Vector icons and brand assets
│   └── screenshots/             # 8 authentic Android application captures:
│       ├── songs.png            # Track library with cover art & duration
│       ├── lyrics.png           # Synchronized lyrics with timing controls (-0.5s / +0.5s)
│       ├── albums.png           # Album grid artwork browser
│       ├── landscape.png        # Dedicated tablet / car dock landscape interface
│       ├── settings.png         # DSP settings, dark themes, and offline cache rules
│       ├── artist.png           # Artist discography breakdown
│       ├── folders.png          # Filesystem storage directory hierarchy
│       └── playlist.png         # Custom Room SQLite playlist management
└── src/
    ├── App.tsx                  # Main application orchestrator & language state
    ├── main.tsx                 # React DOM client entry point
    ├── index.css                # Global styles & design system CSS tokens
    ├── types/
    │   └── index.ts             # TypeScript interfaces for releases, FAQ, screenshots
    ├── config/
    │   └── site.ts              # Central site configuration, copy, and FAQ items
    └── components/
        ├── SoundWaveCanvas.tsx  # Interactive programmatic 2D sound-wave field
        ├── Navbar.tsx           # Minimalist navigation bar & language switcher
        ├── Hero.tsx             # Typography-led hero section with direct APK download
        ├── ScreenshotsShowcase.tsx # Tabbed screenshot viewer with zoom modal
        ├── FeaturesSection.tsx  # Deep feature explanations & embedded EQ simulator
        ├── EqualizerInteractive.tsx # 10-band graphic equalizer & DSP simulator
        ├── DownloadSection.tsx  # Verifiable download card, SHA-256 copy & guide
        ├── ChangelogSection.tsx # Chronological version history from GitHub
        ├── FAQSection.tsx       # Searchable, category-filtered semantic FAQ
        ├── PrivacySection.tsx   # Truthful local-first privacy statement
        ├── Footer.tsx           # Clean minimalist footer & wave emblem
        └── AudioIntelligenceModal.tsx # Acoustic & EQ Tuning Advisor modal
```

---

## 4. Signature Feature: Interactive Sound-Wave Field

The sound-wave canvas (`src/components/SoundWaveCanvas.tsx`) translates music motion into an interactive visual element:

- **Color Palette:** Silver-white (`#D8D9DE`), graphite (`#8A8D96`), charcoal border (`#363841`), and restrained crimson (`#C41E3A`).
- **Mathematical Multi-Harmonic Oscillation:** Deterministic sine/cosine wave equations prevent positional drift:
  $$y(x, t) = \text{baseY} + A_1 \sin(k_1 x + \omega_1 t) + \sum_{n} A_n \sin(k_n x + \omega_n t + \phi_n)$$
- **Pointer Elastic Physics:**
  Tracks pointer position using linear interpolation (lerp). When the cursor approaches a wave, sections displace smoothly via Gaussian falloff:
  $$\text{displacement} = \text{pull} \times \exp\left(-\frac{\Delta x^2 + \Delta y^2}{2 \sigma^2}\right)$$
  When the cursor leaves, the wave returns elastically to its original trajectory with zero jitter.
- **Scroll Response:** As the user scrolls down, wave amplitude and vertical spacing adapt to highlight nearby typography.
- **Performance & Accessibility:**
  - Uses `requestAnimationFrame` with a maximum `devicePixelRatio` of 2.
  - Automatically pauses rendering when the browser tab is hidden (`document.hidden`).
  - Honors `prefers-reduced-motion: reduce` by rendering calm, static harmonic curves.
  - Includes `aria-hidden="true"` so screen readers are not burdened with canvas noise.

---

## 5. Release Integration & Security Validation

The website dynamically consumes release data from the official repository:
- **Authoritative Endpoint:** `https://raw.githubusercontent.com/itsmectrl/weechy-releases/main/version.json`
- **Release Channel:** `New Version` (current stable: `1.3`, versionCode `106`).
- **Domain Security Validation:** `server.ts` validates that incoming download URLs use HTTPS and originate strictly from `github.com` or `raw.githubusercontent.com`.
- **Integrity Verification:** Every release publishes a cryptographic SHA-256 hash. Users can verify the downloaded APK in their terminal:
  - **Linux / macOS:**
    ```bash
    sha256sum Weechy-1.3-New-version.apk
    ```
  - **Windows (Command Prompt):**
    ```cmd
    certutil -hashfile Weechy-1.3-New-version.apk SHA256
    ```
- **Fallback Resilience:** If GitHub's endpoint is temporarily unreachable, the site automatically serves verified default release data without breaking page layout.

---

## 6. Interactive 10-Band Graphic Equalizer & Acoustic Advisor

### Equalizer Simulator (`EqualizerInteractive.tsx`)
- Provides real-time sliders for all 10 hardware frequency bands.
- Dynamic SVG curve calculates Bézier control points in real-time.
- One-click presets: *Flat (Studio Reference), Bass Punch (EDM), Vocal Clarity (Acoustic), Vinyl Analog Warmth, and Rock Dynamic*.
- Includes Bass Boost (0–100%), Virtualizer 3D spatial widening, and playback tempo control (0.5×–2.0×).

### Acoustic Advisor (`AudioIntelligenceModal.tsx`)
- Accessible via the navigation bar, hero CTA, and Equalizer section.
- Provides grounded advice on:
  - Headphone target curve matching (Sony WH-1000XM4/XM5 mid-bass bloat correction, Sennheiser HD series, IEMs).
  - Audio codec comparisons (Lossless FLAC 24-bit/96kHz vs Opus 160kbps vs AAC 320kbps in Android Audio HAL).
  - Synchronized `.lrc` timing drift correction and millisecond syntax.

---

## 7. Internationalization & Arabic RTL Support

- **Bilingual Architecture:** Complete English and Arabic (`العربية`) coverage for all text, headings, feature descriptions, FAQ items, and technical guidance.
- **Bidirectional Layout:** Switching to Arabic automatically applies `dir="rtl"` and `lang="ar"` to the `<html>` root, reorienting navigation, badges, timeline markers, and layout flow.
- **URL Synchronization:** Language state is preserved across page refreshes via `?lang=ar` and stored in `localStorage`.
- **Search Engine Annotations:** Reciprocal `<xhtml:link rel="alternate" hreflang="..." />` tags in `sitemap.xml` for both languages.

---

## 8. Technical SEO & Discoverability

- **Canonical URL:** Configured to `https://weechyapp.web.app` (configurable in `src/config/site.ts`).
- **OpenGraph & Twitter Cards:** Full meta tags with high-res screenshot previews (`/screenshots/songs.png`).
- **Schema.org Structured Data (JSON-LD):** Validated schemas for `SoftwareApplication` (MultimediaApplication, Android 8.0+, free offer) and `WebSite`.
- **Robots & Sitemap:** `public/robots.txt` points directly to canonical `public/sitemap.xml`.
- **PWA Manifest:** `public/manifest.webmanifest` configured with the official brand icon.

---

## 9. Development & Build Workflow

### Prerequisites
- Node.js 18+ or Bun 1.2+

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Starts the full-stack server on `http://localhost:3000` with Express and Vite middleware.

### Code Quality & Type Checking
```bash
npm run lint
```
Executes TypeScript compiler validation (`tsc --noEmit`) with zero errors.

### Production Build
```bash
npm run build
```
Generates minified, optimized production assets in `/dist`.

### Production Server
```bash
npm start
```
Boots the Express server in production mode serving static assets from `/dist`.

---

## 10. Deployment Guide (GitHub Pages & Static Hosting)

### Deploying to GitHub Pages

1. **Build the Static Assets:**
   ```bash
   npm run build
   ```
2. **Deploy the `dist/` directory:**
   - In your GitHub repository under **Settings > Pages**, choose **GitHub Actions** as the build source.
   - Alternatively, push the contents of `dist/` to the `gh-pages` branch.
3. **Custom Domain Setup:**
   - If using a custom domain (e.g., `weechy.app`), add a `CNAME` file to `public/CNAME`.
   - Update `canonicalUrl` in `src/config/site.ts` to match your production domain.

### Deploying to Firebase Hosting

```bash
firebase deploy --only hosting
```
Configured to serve the `dist/` directory with standard caching headers.

---

## 11. Content & Asset Maintenance Guide

- **Updating Release Info:** When a new Weechy version is tagged on GitHub, the site fetches `version.json` automatically. To update the offline fallback values, edit `INITIAL_RELEASE` in `src/config/site.ts`.
- **Updating Screenshots:** Add new captures into `public/screenshots/` and update the `SCREENSHOTS` array in `src/config/site.ts`.
- **Updating FAQ:** Add questions and answers in both English and Arabic in the `FAQ_ITEMS` array in `src/config/site.ts`.
- **Brand Assets:** The official vinyl record logo is stored as an SVG in `public/favicon.svg` and `public/assets/brand/weechy-logo.svg`.

---

## 12. License & Ownership

- **Copyright:** Copyright © 2026 **itsmectrl**. All rights reserved.
- **Application Package Identity:** `com.itsmectrl.weechy`
- **License:** Open Source under the [MIT License](https://opensource.org/licenses/MIT).
- *Android is a trademark of Google LLC.*
