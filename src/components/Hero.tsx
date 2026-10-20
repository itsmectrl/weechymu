import React from 'react';
import { Download, Sliders, ArrowDown } from 'lucide-react';
import { SoundWaveCanvas } from './SoundWaveCanvas';
import { ReleaseData, Language } from '../types';

interface HeroProps {
  release: ReleaseData;
  currentLang: Language;
  onOpenAudioLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ release, currentLang, onOpenAudioLab }) => {
  const isAr = currentLang === 'ar';

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#050506]">
      {/* Signature Animated Sound Wave Background */}
      <div className="absolute inset-0 z-0">
        <SoundWaveCanvas intensity={1.0} />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Release Identifier */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B91C35]" />
          <span>
            {isAr
              ? `إصدار رسمي: سلسلة ${release.series} v${release.versionName}`
              : `Official Release • ${release.series} v${release.versionName}`}
          </span>
        </div>

        {/* Confident Apple-grade Hero Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F7] max-w-3xl leading-[1.08] mb-6">
          {isAr ? (
            <>
              موسيقاك. جهازك. <br />
              <span className="text-[#929299]">إيقاعك الخاص.</span>
            </>
          ) : (
            <>
              Your music. Your device. <br />
              <span className="text-[#929299]">Your rhythm.</span>
            </>
          )}
        </h1>

        {/* Quiet, Direct Subtitle */}
        <p className="text-base sm:text-lg text-[#929299] max-w-2xl font-normal leading-relaxed mb-10">
          {isAr
            ? 'ويتشي هو مشغل موسيقى محلي خفيف الوزن لأجهزة أندرويد مصمم لمكتبتك الصوتية الخاصة، مع كلمات متزامنة، معادل صوتي احترافي ذو 10 نطاقات، وتصميم يراعي الخصوصية تماماً.'
            : 'Weechy is a lightweight Android music player for your local library, with synchronized lyrics, 10-band graphic equalizer, and a privacy-conscious design.'}
        </p>

        {/* Primary and Secondary CTA Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href={release.apkUrl || '#download'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#B91C35] hover:bg-[#D12A43] text-white font-medium text-sm tracking-tight transition-all duration-150 active:scale-[0.99] group shadow-sm"
          >
            <Download className="w-4 h-4 transition-transform duration-150 group-hover:scale-105" />
            <span>{isAr ? 'تحميل Weechy APK' : 'Download Weechy APK'}</span>
            <span className="text-xs font-mono opacity-80 pl-2 border-l border-white/20">
              {release.sizeDisplay || '2.05 MB'}
            </span>
          </a>

          <button
            onClick={onOpenAudioLab}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111114] hover:bg-[#16161A] text-[#F5F5F7] border border-[#242428] hover:border-[#2F2F35] font-medium text-sm transition-all duration-150"
          >
            <Sliders className="w-4 h-4 text-[#66666E]" />
            <span>{isAr ? 'مختبر الصوت والمعادل' : 'Acoustic & EQ Advisor'}</span>
          </button>
        </div>

        {/* Minimalist Spec Strip — Clean typography and alignment, zero gimmicky cards */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-[#929299] pt-8 border-t border-[#242428]/60 w-full max-w-2xl font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F7] font-semibold">{release.sizeDisplay || '2.05 MB'}</span>
            <span className="text-[#66666E]">APK</span>
          </div>
          <span className="text-[#242428] hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F7] font-semibold">10-Band EQ</span>
            <span className="text-[#66666E]">Hardware DSP</span>
          </div>
          <span className="text-[#242428] hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F7] font-semibold">LRC Synced</span>
            <span className="text-[#66666E]">Offline Cache</span>
          </div>
          <span className="text-[#242428] hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F7] font-semibold">Zero Ads</span>
            <span className="text-[#66666E]">No Telemetry</span>
          </div>
        </div>

        {/* Subtle, restrained scroll prompt */}
        <a
          href="#showcase"
          className="mt-14 inline-flex items-center gap-1.5 text-xs font-mono text-[#66666E] hover:text-[#929299] transition-colors"
          aria-label="Scroll to interface"
        >
          <span>{isAr ? 'الواجهة' : 'Explore interface'}</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#66666E]" />
        </a>
      </div>
    </section>
  );
};
