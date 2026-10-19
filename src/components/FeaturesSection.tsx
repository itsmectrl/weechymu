import React from 'react';
import {
  FolderTree,
  Mic2,
  Sliders,
  Palette,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Clock,
  Radio,
  Music,
  Disc,
  Headphones,
} from 'lucide-react';
import { EqualizerInteractive } from './EqualizerInteractive';
import { Language } from '../types';

interface FeaturesSectionProps {
  currentLang: Language;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#C41E3A] mb-3">
            <span>{isAr ? 'جوهر التطبيق' : 'Engineered Pillars'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'صُمم لأجل الموسيقى، لا للإعلانات' : 'Dedicated to Sound, Not Surveillance'}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'كل ميزة في ويتشي وُضعت لتعطيك تحكماً مطلقاً بمكتبتك الموسيقية على هاتفك الأندرويد بأعلى جودة وبأقل استهلاك للموارد.'
              : 'Every capability in Weechy serves one purpose: giving you complete, uncompromised control of your local audio library with zero distractions.'}
          </p>
        </div>

        {/* 1. Feature Grid: Library & Organization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#0D0E11] border border-[#27292F] hover:border-[#363841] transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#121418] border border-[#27292F] flex items-center justify-center text-[#C41E3A] mb-6 group-hover:scale-105 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">
                {isAr ? 'مكتبة محلية فورية' : 'Local Audio Indexing'}
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {isAr
                  ? 'فهرسة سريعة عبر Android MediaStore. تصفح مساراتك حسب الأغاني، الألبومات، الفنانين، المجلدات، أو قوائم التشغيل.'
                  : 'Zero-latency scanning through Android MediaStore. Organize and navigate by Songs, Albums, Artists, Folders, or custom Playlists.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#27292F]/60 flex flex-wrap gap-2 text-[11px] font-mono text-[#D8D9DE]">
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">FLAC</span>
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">MP3</span>
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">M4A / AAC</span>
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">OGG</span>
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">OPUS</span>
              <span className="px-2 py-1 rounded bg-[#121418] border border-[#27292F]">WAV</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0E11] border border-[#27292F] hover:border-[#363841] transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#121418] border border-[#27292F] flex items-center justify-center text-[#D8D9DE] mb-6 group-hover:scale-105 transition-transform">
                <Mic2 className="w-6 h-6 text-[#C41E3A]" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">
                {isAr ? 'نظام كلمات متزامن ذكي' : 'Layered Synced Lyrics'}
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {isAr
                  ? 'عرض الكلمات بالتزامن مع توقيت الغناء. يدعم ملفات .lrc المحلية، والبيانات المدمجة، وجلب اختياري من LRCLIB مع حفظ تلقائي دون إنترنت.'
                  : 'Follow song position in real-time. Resolves local .lrc files, embedded ID3 tags, and optional LRCLIB retrieval with offline disk caching.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#27292F]/60 space-y-1.5 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C41E3A]" />
                <span>Tap any line to seek playback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8A8D96]" />
                <span>Fine-tune offset timing (-0.5s / +0.5s)</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0E11] border border-[#27292F] hover:border-[#363841] transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#121418] border border-[#27292F] flex items-center justify-center text-[#8A8D96] mb-6 group-hover:scale-105 transition-transform">
                <Palette className="w-6 h-6 text-[#F4F4F5]" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">
                {isAr ? '4 ثيمات داكنة وتكيف لوني' : '4 OLED Dark Themes'}
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {isAr
                  ? 'اختر من بين: Graphite Noir، OLED Black الموفر للبطارية، Midnight Navy، و Deep Crimson. مع تلوين ديناميكي مستوحى من غلاف الألبوم.'
                  : 'Graphite Noir, pure battery-saving OLED Black, Midnight Navy, and Deep Crimson. The Now Playing screen extracts tones dynamically from album art.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#27292F]/60 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#121418] border border-[#363841]" title="Graphite Noir" />
              <span className="w-5 h-5 rounded-full bg-[#000000] border border-[#27292F]" title="OLED Black" />
              <span className="w-5 h-5 rounded-full bg-[#0D1527] border border-[#1E293B]" title="Midnight Navy" />
              <span className="w-5 h-5 rounded-full bg-[#4C0D19] border border-[#C41E3A]" title="Deep Crimson" />
              <span className="text-xs text-[#777982] ml-auto font-mono">Dynamic Art</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Equalizer Demo */}
        <div className="pt-8">
          <EqualizerInteractive currentLang={currentLang} />
        </div>

        {/* 3. Deep Features: Playback Controls & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Audio Controls */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E11] border border-[#27292F]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F] text-[#C41E3A]">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F4F4F5]">
                  {isAr ? 'أدوات تحكم احترافية' : 'Refined Playback Mechanics'}
                </h3>
                <span className="text-xs text-[#777982] font-mono">Android MediaSession + AudioFocus</span>
              </div>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
              {isAr
                ? 'تحكم سلس لا ينقطع. يتعامل ويتشي مع تداخلات الصوت بذكاء، فيوقف التشغيل مؤقتاً عند ورود مكالمة أو فصل سماعة الرأس، مع أزرار تشغيل متكاملة في شاشة القفل والإشعارات.'
                : 'Engineered for seamless everyday listening. Full integration with Android Audio Focus, media notifications, lockscreen media controls, and automatic pause upon headphone disconnection.'}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#D8D9DE]">
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F]">
                <div className="font-semibold text-white mb-1">{isAr ? 'مؤقت النوم' : 'Sleep Timer'}</div>
                <div className="text-[11px] text-[#777982]">{isAr ? 'إيقاف تدريجي مؤقت' : 'Configurable countdown'}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F]">
                <div className="font-semibold text-white mb-1">{isAr ? 'تلاشي انتقالي' : 'Crossfade & Gapless'}</div>
                <div className="text-[11px] text-[#777982]">{isAr ? 'محاكاة التلاشي الناعم' : 'Smooth track transitions'}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F]">
                <div className="font-semibold text-white mb-1">{isAr ? 'سرعة متغيرة' : 'Tempo Modulation'}</div>
                <div className="text-[11px] text-[#777982]">0.5× to 2.0× without pitch shift</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F]">
                <div className="font-semibold text-white mb-1">{isAr ? 'إحصائيات الاستماع' : 'Playtime Analytics'}</div>
                <div className="text-[11px] text-[#777982]">{isAr ? 'مخزنة محلياً في جهازك' : '100% on-device metrics'}</div>
              </div>
            </div>
          </div>

          {/* Privacy Architecture */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E11] border border-[#27292F]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#121418] border border-[#27292F] text-[#C41E3A]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F4F4F5]">
                  {isAr ? 'خصوصية غير مشروطة' : 'Uncompromising Privacy'}
                </h3>
                <span className="text-xs text-[#777982] font-mono">No telemetry. No accounts.</span>
              </div>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
              {isAr
                ? 'لا يحتوي التطبيق على أي مكتبات إعلانية، ولا أدوات تتبع السلوك، ولا مجمعات أعطال ترسل بياناتك إلى خوادم خارجية. يتم استخدام الإنترنت حصرياً لجلب الكلمات أونلاين عند تفعيلها والتحقق من التحديثات.'
                : 'Weechy contains no third-party telemetry, no crash-reporting SDKs, no advertising trackers, and no mandatory login. Network requests occur exclusively for user-initiated LRCLIB lyrics lookups and public GitHub release checks.'}
            </p>

            <div className="space-y-3 text-xs text-[#A1A1AA]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C41E3A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Local Room SQLite:</strong> Playlists, favorites, and settings stay encrypted in your device’s sandbox.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C41E3A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Zero Account Requirements:</strong> No email, no password, no tracking profiles. Install and play immediately.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C41E3A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Clean MediaStore Access:</strong> Only reads local audio files to create your library index.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
