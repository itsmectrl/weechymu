import React, { useState } from 'react';
import { Sliders, Volume2, Sparkles, RefreshCw, Disc3 } from 'lucide-react';
import { Language } from '../types';

interface EqualizerInteractiveProps {
  currentLang: Language;
}

const FREQUENCY_BANDS = [
  '31 Hz',
  '62 Hz',
  '125 Hz',
  '250 Hz',
  '500 Hz',
  '1 kHz',
  '2 kHz',
  '4 kHz',
  '8 kHz',
  '16 kHz',
];

const PRESETS: Record<string, { en: string; ar: string; gains: number[]; bass: number; virtualizer: number }> = {
  flat: {
    en: 'Flat / Studio Reference',
    ar: 'مستوي / مرجع الاستوديو',
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bass: 0,
    virtualizer: 0,
  },
  bass: {
    en: 'Bass Punch (Sub-Bass + EDM)',
    ar: 'جهير قوي (EDM & Bass)',
    gains: [8, 6, 4, 1, 0, 0, 1, 2, 3, 2],
    bass: 75,
    virtualizer: 30,
  },
  vocal: {
    en: 'Vocal Clarity & Acoustic',
    ar: 'وضوح الصوت والغناء الأكوستيك',
    gains: [-2, -1, 0, 2, 4, 5, 4, 3, 2, 1],
    bass: 20,
    virtualizer: 45,
  },
  vinyl: {
    en: 'Vinyl Analog Warmth',
    ar: 'دفء أسطوانات الفينيل التناظرية',
    gains: [4, 5, 3, 1, 0, -1, -2, -1, 1, 0],
    bass: 50,
    virtualizer: 25,
  },
  rock: {
    en: 'Rock & Dynamic Energy',
    ar: 'طاقة الروك والديناميكية',
    gains: [5, 4, 2, -1, -2, 1, 3, 4, 5, 6],
    bass: 60,
    virtualizer: 40,
  },
};

export const EqualizerInteractive: React.FC<EqualizerInteractiveProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';
  const [selectedPreset, setSelectedPreset] = useState<string>('vinyl');
  const [gains, setGains] = useState<number[]>([...PRESETS.vinyl.gains]);
  const [bassBoost, setBassBoost] = useState<number>(PRESETS.vinyl.bass);
  const [virtualizer, setVirtualizer] = useState<number>(PRESETS.vinyl.virtualizer);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = PRESETS[presetKey];
    if (preset) {
      setGains([...preset.gains]);
      setBassBoost(preset.bass);
      setVirtualizer(preset.virtualizer);
    }
  };

  const handleSliderChange = (index: number, val: number) => {
    const updated = [...gains];
    updated[index] = val;
    setGains(updated);
    setSelectedPreset('custom');
  };

  const handleReset = () => {
    handlePresetSelect('flat');
  };

  // Generate SVG curve points based on 10 bands
  const svgWidth = 600;
  const svgHeight = 120;
  const zeroY = svgHeight / 2;
  const points = gains.map((gain, idx) => {
    const x = (idx / (FREQUENCY_BANDS.length - 1)) * (svgWidth - 40) + 20;
    // -12dB is at bottom, +12dB at top
    const y = zeroY - (gain / 12) * (svgHeight / 2 - 15);
    return `${x},${y}`;
  });
  const pathD = `M 20,${zeroY} Q ${points.join(' ')} L ${svgWidth - 20},${zeroY}`;

  return (
    <div className="bg-[#121418] border border-[#27292F] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C41E3A]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C41E3A] mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>{isAr ? 'محرك DSP الصوتي' : 'Hardware-Grounded DSP Engine'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F5] tracking-tight">
            {isAr ? 'معادل صوتي بياني بـ 10 نطاقات' : '10-Band Graphic Equalizer Simulator'}
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            {isAr
              ? 'تحكم دقيق في الترددات من 31 هرتز إلى 16 كيلوهرتز مع مضخم الجهير والصوت المحيطي.'
              : 'Interactive frequency response simulator matching Weechy’s built-in Android equalizer.'}
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27292F] bg-[#191C21] hover:bg-[#27292F] text-xs font-mono text-[#D8D9DE] transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-[#A1A1AA]" />
          <span>{isAr ? 'إعادة ضبط' : 'Reset Flat'}</span>
        </button>
      </div>

      {/* Preset Selector Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(PRESETS).map(([key, item]) => {
          const isSelected = selectedPreset === key;
          return (
            <button
              key={key}
              onClick={() => handlePresetSelect(key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-[#C41E3A] text-white shadow-md shadow-[#C41E3A]/20'
                  : 'bg-[#191C21] text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#27292F]'
              }`}
            >
              {isAr ? item.ar : item.en}
            </button>
          );
        })}
        {selectedPreset === 'custom' && (
          <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#191C21] text-[#C41E3A] border border-[#C41E3A]/40">
            {isAr ? 'مخصص' : 'Custom Curve'}
          </span>
        )}
      </div>

      {/* Responsive Visual Frequency Curve Graphic */}
      <div className="relative w-full h-28 bg-[#08090B] rounded-2xl border border-[#27292F] p-2 mb-8 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-4 top-1/2 h-px bg-[#27292F] border-dashed border-t border-[#363841]" />
        <span className="absolute left-3 top-2 text-[10px] font-mono text-[#777982]">+12 dB</span>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#777982]">0 dB</span>
        <span className="absolute left-3 bottom-2 text-[10px] font-mono text-[#777982]">-12 dB</span>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C41E3A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C41E3A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill under curve */}
          <path
            d={`${pathD} L ${svgWidth - 20},${svgHeight} L 20,${svgHeight} Z`}
            fill="url(#curveGradient)"
          />

          {/* Harmonic line */}
          <path
            d={pathD}
            fill="none"
            stroke="#C41E3A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Frequency band node markers */}
          {points.map((pt, i) => {
            const [cx, cy] = pt.split(',');
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="4"
                fill="#F4F4F5"
                stroke="#C41E3A"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* 10-Band Sliders Rack */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 mb-8">
        {FREQUENCY_BANDS.map((band, idx) => (
          <div key={band} className="flex flex-col items-center bg-[#0D0E11] border border-[#27292F] rounded-xl p-2.5">
            <span className="text-[11px] font-mono font-medium text-[#F4F4F5] mb-2">
              {gains[idx] > 0 ? `+${gains[idx]}` : gains[idx]} dB
            </span>

            {/* Vertical range slider */}
            <div className="h-28 flex items-center justify-center my-1">
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={gains[idx]}
                onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                aria-label={`Gain for ${band}`}
                className="w-24 -rotate-90 origin-center accent-[#C41E3A] cursor-pointer"
              />
            </div>

            <span className="text-[10px] font-mono text-[#A1A1AA] mt-2 text-center whitespace-nowrap">
              {band}
            </span>
          </div>
        ))}
      </div>

      {/* Additional DSP Audio Knobs (Bass Boost, Virtualizer, Playback Speed) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#27292F]">
        {/* Bass Boost */}
        <div className="p-4 rounded-2xl bg-[#0D0E11] border border-[#27292F]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F4F4F5] flex items-center gap-1.5">
              <Disc3 className="w-3.5 h-3.5 text-[#C41E3A]" />
              {isAr ? 'مضخم الجهير (Bass Boost)' : 'Bass Boost'}
            </span>
            <span className="text-xs font-mono text-[#C41E3A]">{bassBoost}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={bassBoost}
            onChange={(e) => {
              setBassBoost(Number(e.target.value));
              setSelectedPreset('custom');
            }}
            aria-label="Bass Boost level"
            className="w-full accent-[#C41E3A] cursor-pointer"
          />
          <span className="text-[10px] text-[#777982] block mt-1">
            {isAr ? 'تعزيز الترددات المنخفضة تحت 100 هرتز' : 'Low-frequency resonant resonance boost'}
          </span>
        </div>

        {/* Virtualizer */}
        <div className="p-4 rounded-2xl bg-[#0D0E11] border border-[#27292F]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F4F4F5] flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#8A8D96]" />
              {isAr ? 'الصوت المحيطي (Virtualizer)' : 'Virtualizer 3D'}
            </span>
            <span className="text-xs font-mono text-[#8A8D96]">{virtualizer}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={virtualizer}
            onChange={(e) => {
              setVirtualizer(Number(e.target.value));
              setSelectedPreset('custom');
            }}
            aria-label="Virtualizer level"
            className="w-full accent-[#8A8D96] cursor-pointer"
          />
          <span className="text-[10px] text-[#777982] block mt-1">
            {isAr ? 'توسيع المسرح الصوتي لسماعات الرأس' : 'Acoustic soundstage stereo widening'}
          </span>
        </div>

        {/* Playback Speed */}
        <div className="p-4 rounded-2xl bg-[#0D0E11] border border-[#27292F]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F4F4F5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D8D9DE]" />
              {isAr ? 'سرعة التشغيل' : 'Playback Speed'}
            </span>
            <span className="text-xs font-mono text-[#D8D9DE]">{playbackSpeed.toFixed(1)}×</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            aria-label="Playback speed"
            className="w-full accent-[#D8D9DE] cursor-pointer"
          />
          <span className="text-[10px] text-[#777982] block mt-1">
            {isAr ? 'من 0.5× إلى 2.0× مع الحفاظ على طبقة الصوت' : 'Pitch-preserving tempo control (0.5× - 2.0×)'}
          </span>
        </div>
      </div>
    </div>
  );
};
