import React from 'react';
import { Download, ArrowDown, ShieldCheck, Cpu, HardDrive, Sparkles, Sliders } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Signature Animated Sound Wave Background */}
      <div className="absolute inset-0 z-0">
        <SoundWaveCanvas intensity={1.1} />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121418]/80 border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-6 backdrop-blur-sm animate-in fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
          <span>
            {isAr
              ? `إصدار رسمي جديد: سلسلة ${release.series} v${release.versionName}`
              : `Official Release: ${release.series} v${release.versionName} (code ${release.versionCode})`}
          </span>
        </div>

        {/* Confident Hero Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F4F5] max-w-3xl leading-[1.08] mb-6">
          {isAr ? (
            <>
              موسيقاك. جهازك. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F5] via-[#D8D9DE] to-[#C41E3A]">
                إيقاعك الخاص.
              </span>
            </>
          ) : (
            <>
              Your music. Your device. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F5] via-[#D8D9DE] to-[#C41E3A]">
                Your rhythm.
              </span>
            </>
          )}
        </h1>

        {/* Clear Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[#A1A1AA] max-w-2xl font-normal leading-relaxed mb-10">
          {isAr
            ? 'ويتشي هو مشغل موسيقى محلي خفيف الوزن لأجهزة أندرويد مصمم لمكتبتك الصوتية الخاصة، مع كلمات متزامنة، معادل صوتي احترافي ذو 10 نطاقات، وتصميم يراعي الخصوصية تماماً.'
            : 'Weechy is a lightweight Android music player for your local library, with synchronized lyrics, powerful audio controls, and a privacy-conscious design.'}
        </p>

        {/* Primary and Secondary CTA Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <a
            href={release.apkUrl || '#download'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C41E3A] hover:bg-[#E02A46] text-white font-medium text-base tracking-wide transition-all duration-200 shadow-lg shadow-[#C41E3A]/25 hover:shadow-[#C41E3A]/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group"
          >
            <Download className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span>{isAr ? 'تحميل Weechy APK' : 'Download Weechy APK'}</span>
            <span className="text-xs font-mono opacity-80 pl-1 border-l border-white/20">
              {release.sizeDisplay || '2.05 MB'}
            </span>
          </a>

          <button
            onClick={onOpenAudioLab}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#121418]/90 hover:bg-[#191C21] text-[#D8D9DE] hover:text-white border border-[#27292F] hover:border-[#363841] font-medium text-sm transition-all duration-200 backdrop-blur-sm group"
          >
            <Sliders className="w-4 h-4 text-[#C41E3A] group-hover:rotate-45 transition-transform" />
            <span>{isAr ? 'استشر خبير الصوتيات' : 'Acoustic & EQ Advisor'}</span>
          </button>
        </div>

        {/* Compact Strip of Verified Product Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-6 border-t border-[#27292F]/60">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-lg bg-[#0D0E11]/80 border border-[#27292F]/40">
            <HardDrive className="w-4 h-4 text-[#8A8D96] shrink-0" />
            <div className="text-left text-xs">
              <div className="text-[#F4F4F5] font-semibold">{release.sizeDisplay || '2.05 MB'}</div>
              <div className="text-[#777982] text-[11px]">{isAr ? 'حجم خفيف جداً' : 'Ultra Lightweight'}</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-lg bg-[#0D0E11]/80 border border-[#27292F]/40">
            <ShieldCheck className="w-4 h-4 text-[#C41E3A] shrink-0" />
            <div className="text-left text-xs">
              <div className="text-[#F4F4F5] font-semibold">{isAr ? 'بدون تتبع' : 'Zero Tracking'}</div>
              <div className="text-[#777982] text-[11px]">{isAr ? 'بدون إعلانات' : 'No Ads, No Account'}</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-lg bg-[#0D0E11]/80 border border-[#27292F]/40">
            <Cpu className="w-4 h-4 text-[#8A8D96] shrink-0" />
            <div className="text-left text-xs">
              <div className="text-[#F4F4F5] font-semibold">10-Band EQ</div>
              <div className="text-[#777982] text-[11px]">{isAr ? 'معالج صوتي مخصص' : 'Custom DSP Engine'}</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-lg bg-[#0D0E11]/80 border border-[#27292F]/40">
            <Sparkles className="w-4 h-4 text-[#8A8D96] shrink-0" />
            <div className="text-left text-xs">
              <div className="text-[#F4F4F5] font-semibold">LRC Synced</div>
              <div className="text-[#777982] text-[11px]">{isAr ? 'كلمات أوفلاين' : 'Offline Cache'}</div>
            </div>
          </div>
        </div>

        {/* Gentle scroll indicator */}
        <a
          href="#showcase"
          className="mt-12 flex items-center gap-1.5 text-xs text-[#777982] hover:text-[#A1A1AA] transition-colors py-2 group"
          aria-label="Scroll to showcase"
        >
          <span>{isAr ? 'استكشف واجهة التطبيق' : 'Explore interface'}</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-[#C41E3A]" />
        </a>
      </div>
    </section>
  );
};
