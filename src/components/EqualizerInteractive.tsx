import React, { useState } from 'react';
import { Sliders, Volume2, RefreshCw, Disc3, Gauge } from 'lucide-react';
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
    en: 'Flat Reference',
    ar: 'مستوي / مرجع',
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bass: 0,
    virtualizer: 0,
  },
  bass: {
    en: 'Bass Punch',
    ar: 'جهير قوي',
    gains: [8, 6, 4, 1, 0, 0, 1, 2, 3, 2],
    bass: 75,
    virtualizer: 30,
  },
  vocal: {
    en: 'Vocal Clarity',
    ar: 'وضوح الصوت',
    gains: [-2, -1, 0, 2, 4, 5, 4, 3, 2, 1],
    bass: 20,
    virtualizer: 45,
  },
  vinyl: {
    en: 'Analog Warmth',
    ar: 'دفء الفينيل',
    gains: [4, 5, 3, 1, 0, -1, -2, -1, 1, 0],
    bass: 50,
    virtualizer: 25,
  },
  rock: {
    en: 'Dynamic Stage',
    ar: 'ديناميكي مسرحي',
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
  const svgHeight = 110;
  const zeroY = svgHeight / 2;
  const points = gains.map((gain, idx) => {
    const x = (idx / (FREQUENCY_BANDS.length - 1)) * (svgWidth - 40) + 20;
    // -12dB at bottom, +12dB at top
    const y = zeroY - (gain / 12) * (svgHeight / 2 - 12);
    return `${x},${y}`;
  });
  const pathD = `M 20,${zeroY} Q ${points.join(' ')} L ${svgWidth - 20},${zeroY}`;

  return (
    <div className="bg-[#111114] border border-[#242428] rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#929299] mb-1">
            <Sliders className="w-3.5 h-3.5 text-[#B91C35]" />
            <span>{isAr ? 'محرك DSP الصوتي' : 'Hardware DSP Engine'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F7] tracking-tight">
            {isAr ? 'معادل صوتي بياني بـ 10 نطاقات' : '10-Band Graphic Equalizer'}
          </h3>
          <p className="text-xs sm:text-sm text-[#929299] mt-1">
            {isAr
              ? 'تحكم دقيق في الترددات من 31 هرتز إلى 16 كيلوهرتز مع مضخم الجهير والصوت المحيطي.'
              : 'Interactive frequency response simulator matching Weechy’s built-in Android equalizer.'}
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#242428] bg-[#0A0A0C] hover:bg-[#16161A] text-xs font-mono text-[#929299] hover:text-[#F5F5F7] transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-[#66666E]" />
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-[#B91C35] text-white shadow-sm'
                  : 'bg-[#0A0A0C] text-[#929299] hover:text-[#F5F5F7] border border-[#242428]'
              }`}
            >
              {isAr ? item.ar : item.en}
            </button>
          );
        })}
        {selectedPreset === 'custom' && (
          <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#16161A] text-[#B91C35] border border-[#B91C35]/30">
            {isAr ? 'مخصص' : 'Custom Curve'}
          </span>
        )}
      </div>

      {/* Responsive Visual Frequency Curve Graphic */}
      <div className="relative w-full h-28 bg-[#050506] rounded-xl border border-[#242428] p-2 mb-8 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-4 top-1/2 h-px bg-[#242428]" />
        <span className="absolute left-3 top-2 text-[10px] font-mono text-[#66666E]">+12 dB</span>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#66666E]">0 dB</span>
        <span className="absolute left-3 bottom-2 text-[10px] font-mono text-[#66666E]">-12 dB</span>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Harmonic line */}
          <path
            d={pathD}
            fill="none"
            stroke="#B91C35"
            strokeWidth="2"
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
                r="3"
                fill="#F5F5F7"
                stroke="#B91C35"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>

      {/* 10-Band Sliders Rack */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5 mb-8">
        {FREQUENCY_BANDS.map((band, idx) => (
          <div key={band} className="flex flex-col items-center bg-[#0A0A0C] border border-[#242428] rounded-xl p-2.5">
            <span className="text-[11px] font-mono font-medium text-[#F5F5F7] mb-2">
              {gains[idx] > 0 ? `+${gains[idx]}` : gains[idx]}
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
                className="w-24 -rotate-90 origin-center accent-[#B91C35] cursor-pointer"
              />
            </div>

            <span className="text-[10px] font-mono text-[#66666E] mt-2 text-center whitespace-nowrap">
              {band}
            </span>
          </div>
        ))}
      </div>

      {/* Additional DSP Audio Knobs (Bass Boost, Virtualizer, Playback Speed) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#242428]">
        {/* Bass Boost */}
        <div className="p-4 rounded-xl bg-[#0A0A0C] border border-[#242428]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F5F5F7] flex items-center gap-1.5">
              <Disc3 className="w-3.5 h-3.5 text-[#B91C35]" />
              {isAr ? 'مضخم الجهير' : 'Bass Boost'}
            </span>
            <span className="text-xs font-mono text-[#B91C35]">{bassBoost}%</span>
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
            className="w-full accent-[#B91C35] cursor-pointer"
          />
          <span className="text-[10px] text-[#66666E] block mt-1">
            {isAr ? 'تعزيز الترددات المنخفضة تحت 100 هرتز' : 'Sub-100Hz resonant boost'}
          </span>
        </div>

        {/* Virtualizer */}
        <div className="p-4 rounded-xl bg-[#0A0A0C] border border-[#242428]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F5F5F7] flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#66666E]" />
              {isAr ? 'الصوت المحيطي' : 'Virtualizer 3D'}
            </span>
            <span className="text-xs font-mono text-[#929299]">{virtualizer}%</span>
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
            className="w-full accent-[#66666E] cursor-pointer"
          />
          <span className="text-[10px] text-[#66666E] block mt-1">
            {isAr ? 'توسيع المسرح الصوتي لسماعات الرأس' : 'Acoustic soundstage stereo widening'}
          </span>
        </div>

        {/* Playback Speed */}
        <div className="p-4 rounded-xl bg-[#0A0A0C] border border-[#242428]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#F5F5F7] flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#66666E]" />
              {isAr ? 'سرعة التشغيل' : 'Playback Speed'}
            </span>
            <span className="text-xs font-mono text-[#929299]">{playbackSpeed.toFixed(1)}×</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            aria-label="Playback speed"
            className="w-full accent-[#66666E] cursor-pointer"
          />
          <span className="text-[10px] text-[#66666E] block mt-1">
            {isAr ? 'من 0.5× إلى 2.0× مع الحفاظ على طبقة الصوت' : 'Pitch-preserving tempo control (0.5× - 2.0×)'}
          </span>
        </div>
      </div>
    </div>
  );
};
