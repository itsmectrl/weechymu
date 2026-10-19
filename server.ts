import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Cache for official release metadata
let cachedRelease: any = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const DEFAULT_VERIFIED_RELEASE = {
  series: 'New Version',
  channel: 'new-version',
  versionCode: 106,
  versionName: '1.3',
  displayName: 'Weechy — New Version 1.3',
  tag: 'new-version-1.3',
  releaseTag: 'new-version-1.3',
  apkUrl: 'https://github.com/itsmectrl/weechy-releases/releases/download/new-version-1.3/Weechy-1.3-New-version.apk',
  pageUrl: 'https://github.com/itsmectrl/weechy-releases/releases/tag/new-version-1.3',
  sha256: 'db88d2d6b4c530488cc6db667419bd650be7d8d2a793855367cf2ddd45469b43',
  sizeBytes: 2149139,
  sizeDisplay: '2.05 MB',
  minAndroid: 'Android 8.0 (Oreo)+',
  isMandatory: true,
  mandatory: true,
  notes: 'Smart audio filtering (junk & voice notes exclusion), Spotify metadata matching & high-res artwork enrichment, and mass bulk selection with Select All.',
};

const VERIFIED_RELEASE_HISTORY = [
  {
    versionName: '1.3',
    versionCode: 106,
    series: 'New Version',
    releaseTag: 'new-version-1.3',
    date: '2026-10-18',
    notes: 'Smart audio filtering to exclude junk audio and voice notes, Spotify metadata matching with high-resolution artwork enrichment, and mass bulk selection with Select All.',
    apkUrl: 'https://github.com/itsmectrl/weechy-releases/releases/download/new-version-1.3/Weechy-1.3-New-version.apk',
    pageUrl: 'https://github.com/itsmectrl/weechy-releases/releases/tag/new-version-1.3',
    sha256: 'db88d2d6b4c530488cc6db667419bd650be7d8d2a793855367cf2ddd45469b43',
    sizeDisplay: '2.05 MB',
  },
  {
    versionName: '1.2',
    versionCode: 105,
    series: 'New Version',
    releaseTag: 'new-version-1.2',
    date: '2026-10-15',
    notes: 'Optimized media store indexing, performance tuning for 10-band equalizer, and enhanced landscape mode layout on larger tablets.',
    apkUrl: 'https://github.com/itsmectrl/weechy-releases/releases/download/new-version-1.2/Weechy-1.2-New-version.apk',
    pageUrl: 'https://github.com/itsmectrl/weechy-releases/releases/tag/new-version-1.2',
    sha256: 'Unavailable in manifest',
    sizeDisplay: '2.10 MB',
  },
  {
    versionName: '1.1',
    versionCode: 104,
    series: 'New Version',
    releaseTag: 'new-version-1.1',
    date: '2026-10-13',
    notes: 'Added LRCLIB online synchronized lyrics retrieval with offline disk caching and lyrics timing adjustment controls (-0.5s / +0.5s).',
    apkUrl: 'https://github.com/itsmectrl/weechy-releases/releases/download/new-version-1.1/Weechy-1.1-New-version.apk',
    pageUrl: 'https://github.com/itsmectrl/weechy-releases/releases/tag/new-version-1.1',
    sha256: '29cdc297c07b76ef1d02c4618511f0dd808609f308aa34eed81ad3f85ac30299',
    sizeDisplay: '2.00 MB',
  },
  {
    versionName: '1.0',
    versionCode: 103,
    series: 'New Version',
    releaseTag: 'new-version-1.0',
    date: '2026-10-07',
    notes: 'Initial New Version release of Weechy. Local music library indexing, 4 dark themes (Graphite Noir, OLED Black, Midnight Navy, Deep Crimson), and custom playlist management.',
    apkUrl: 'https://github.com/itsmectrl/weechy-releases/releases/download/new-version-1.0/Weechy-1.0-New-version.apk',
    pageUrl: 'https://github.com/itsmectrl/weechy-releases/releases/tag/new-version-1.0',
    sha256: 'bb6939f003c21479039b81e5ea0450e06f6d57860becfa4370e54554b3ad3727',
    sizeDisplay: '1.98 MB',
  },
];

// Helper to validate download URL for security
function isValidReleaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    return (
      hostname === 'github.com' ||
      hostname === 'raw.githubusercontent.com' ||
      hostname.endsWith('.githubusercontent.com')
    );
  } catch {
    return false;
  }
}

// GET /api/release - Fetches and validates official GitHub version.json
app.get('/api/release', async (_req, res) => {
  const now = Date.now();
  if (cachedRelease && now - lastFetchTime < CACHE_TTL) {
    return res.json({ source: 'cache', data: cachedRelease });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const upstream = await fetch(
      'https://raw.githubusercontent.com/itsmectrl/weechy-releases/main/version.json',
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!upstream.ok) {
      throw new Error(`Upstream returned ${upstream.status}`);
    }

    const json = await upstream.json();

    // Security validation: verify HTTPS and official domain
    if (json.apkUrl && !isValidReleaseUrl(json.apkUrl)) {
      throw new Error('Invalid or untrusted APK URL domain');
    }

    const validatedData = {
      ...DEFAULT_VERIFIED_RELEASE,
      ...json,
      sizeDisplay: DEFAULT_VERIFIED_RELEASE.sizeDisplay,
      minAndroid: DEFAULT_VERIFIED_RELEASE.minAndroid,
    };

    cachedRelease = validatedData;
    lastFetchTime = now;

    res.json({ source: 'live', data: validatedData });
  } catch (err: any) {
    res.json({ source: 'fallback', data: DEFAULT_VERIFIED_RELEASE });
  }
});

// GET /api/releases-history
app.get('/api/releases-history', (_req, res) => {
  res.json({ history: VERIFIED_RELEASE_HISTORY });
});

// POST /api/audio-expert: Local acoustic & equalizer advisor engine
app.post('/api/audio-expert', (req, res) => {
  const { query, genre, headphones } = req.body;

  if (!query && !genre && !headphones) {
    return res.status(400).json({ error: 'Please provide an audio or playback question.' });
  }

  const advice = generateAcousticAdvice(query || '', genre || '', headphones || '');
  return res.json({ reply: advice });
});

function generateAcousticAdvice(query: string, genre: string, headphones: string): string {
  const q = (query + ' ' + genre + ' ' + headphones).toLowerCase();

  if (q.includes('sony') || q.includes('xm5') || q.includes('xm4') || q.includes('headphone') || q.includes('harman')) {
    return `### Recommended Harman Neutral 10-Band EQ Curve (for Sony WH-1000XM Series & Closed-Back Over-Ears)

Sony WH-1000XM4/XM5 feature an emphasized consumer mid-bass profile (~150Hz–250Hz) and slightly recessed upper treble around 4kHz–8kHz. In Weechy's 10-Band Graphic Equalizer, apply these corrections:

| Band | Recommended Gain | Acoustic Rationale |
| :--- | :--- | :--- |
| **31 Hz** | \`+1 dB\` | Subtle sub-bass rumble extension |
| **62 Hz** | \`0 dB\` | Neutral baseline |
| **125 Hz** | \`-2 dB\` | Cleans up mid-bass bloat and chestiness |
| **250 Hz** | \`-3 dB\` | Removes muddiness, improves separation |
| **500 Hz** | \`0 dB\` | Natural acoustic body |
| **1 kHz** | \`+1 dB\` | Vocal presence reinforcement |
| **2 kHz** | \`+2 dB\` | Crispness on acoustic instruments & snare |
| **4 kHz** | \`+3 dB\` | Compensates for the Sony upper-mid dip |
| **8 kHz** | \`+2 dB\` | Enhanced air and cymbal brilliance |
| **16 kHz** | \`+1 dB\` | High-frequency sparkle without sibilance |

*Acoustic Tip:* Keep **Bass Boost** below \`25%\` on Sony ANC headphones to prevent driver distortion. Enable **Virtualizer** around \`30%\` for widened soundstage.`;
  }

  if (q.includes('flac') || q.includes('opus') || q.includes('codec') || q.includes('aac') || q.includes('lossless') || q.includes('mp3')) {
    return `### Android Audio Architecture: FLAC vs Opus vs AAC Analysis

#### 1. Audio Processing Path on Android:
- **FLAC (Free Lossless Audio Codec):** Decoded losslessly by Android MediaCodec or software decoder into raw PCM. Bit-perfect preservation up to 24-bit/96kHz (subject to device Audio HAL sampling).
- **Opus (160 kbps):** State-of-the-art psychoacoustic compression. At 160kbps, Opus achieves transparent fidelity exceeding 320kbps MP3 while consuming half the storage space.
- **AAC (320 kbps):** Highly optimized on mobile DSP hardware with negligible battery impact.

#### 2. Perceptual vs Hardware Reality:
- On mobile DACs with standard 3.5mm or Bluetooth LDAC/aptX codecs, well-encoded 160kbps Opus is psychoacoustically indistinguishable from 24-bit FLAC in double-blind ABX tests.
- **Recommendation:** Use **FLAC** for archival ownership and studio listening; use **Opus** (128–160kbps) for saving storage while retaining supreme clarity in Weechy.`;
  }

  if (q.includes('lrc') || q.includes('lyric') || q.includes('drift') || q.includes('sync')) {
    return `### Weechy Synchronized LRC Timing & Resolution Architecture

Weechy resolves lyrics in a prioritized pipeline:
1. **User Edit Storage:** Custom corrections saved in Room SQLite database.
2. **Local Sidecar File:** \`song-name.lrc\` in the same folder as the audio track.
3. **Embedded Tags:** ID3v2 \`USLT\` / \`SYLT\` or Vorbis \`LYRICS\` metadata.
4. **Offline LRCLIB Cache:** Automatically cached for offline playback after initial lookup.

#### Fixing Millisecond Timing Drift:
- In Weechy's Now Playing lyrics view, tap the **\`-0.5s\`** or **\`+0.5s\`** buttons to immediately compensate for track silence or encoding latency.
- Ensure your \`.lrc\` files use standard millisecond timestamp syntax:
  \`[01:23.45] First lyric line here\`
  \`[01:27.12] Second lyric line here\``;
  }

  return `### Optimal 10-Band Graphic Equalizer Profile & DSP Calibration

For dynamic clarity and natural acoustic presence in Weechy:

| Band | Gain | Acoustic Purpose |
| :--- | :--- | :--- |
| **31 Hz** | \`+3 dB\` | Deep sub-bass foundation |
| **62 Hz** | \`+4 dB\` | Kick drum punch |
| **125 Hz** | \`+2 dB\` | Bass guitar presence |
| **250 Hz** | \`0 dB\` | Natural vocal warmth |
| **500 Hz** | \`0 dB\` | Acoustic balance |
| **1 kHz** | \`+1 dB\` | Vocal intelligibility |
| **2 kHz** | \`+2 dB\` | Guitar edge & vocal cut |
| **4 kHz** | \`+3 dB\` | Percussion attack & snap |
| **8 kHz** | \`+3 dB\` | Cymbal sheen & open air |
| **16 kHz** | \`+2 dB\` | Atmospheric brilliance |

**Pro Tip:** In Weechy Settings, set **ReplayGain / Track normalization** and ensure **Crossfade** is calibrated to 1.5s for seamless transitions.`;
}

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Weechy Official Website running on port ${PORT}`);
  });
}

startServer();
