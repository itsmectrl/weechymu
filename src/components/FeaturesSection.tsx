import React from 'react';
import {
  Mic2,
  Palette,
  ShieldCheck,
  CheckCircle2,
  Music,
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
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050506] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span>{isAr ? 'جوهر التطبيق' : 'Engineered Architecture'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'صُمم لأجل الموسيقى، لا للإعلانات' : 'Dedicated to Sound, Not Surveillance'}
          </h2>
          <p className="text-sm sm:text-base text-[#929299] leading-relaxed">
            {isAr
              ? 'كل ميزة في ويتشي وُضعت لتعطيك تحكماً مطلقاً بمكتبتك الموسيقية على هاتفك الأندرويد بأعلى جودة وبأقل استهلاك للموارد.'
              : 'Every capability in Weechy serves one purpose: giving you complete, uncompromised control of your local audio library with zero distractions.'}
          </p>
        </div>

        {/* 1. Feature Grid: Library & Organization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0C] border border-[#242428] flex items-center justify-center text-[#929299] mb-6">
                <Music className="w-5 h-5 text-[#B91C35]" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">
                {isAr ? 'مكتبة محلية فورية' : 'Local Audio Indexing'}
              </h3>
              <p className="text-xs sm:text-sm text-[#929299] leading-relaxed mb-6">
                {isAr
                  ? 'فهرسة سريعة عبر Android MediaStore. تصفح مساراتك حسب الأغاني، الألبومات، الفنانين، المجلدات، أو قوائم التشغيل.'
                  : 'Zero-latency scanning through Android MediaStore. Organize and navigate by Songs, Albums, Artists, Folders, or custom Playlists.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#242428] flex flex-wrap gap-1.5 text-[10px] font-mono text-[#929299]">
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">FLAC</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">MP3</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">M4A / AAC</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">OGG</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">OPUS</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#242428]">WAV</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0C] border border-[#242428] flex items-center justify-center text-[#929299] mb-6">
                <Mic2 className="w-5 h-5 text-[#929299]" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">
                {isAr ? 'نظام كلمات متزامن ذكي' : 'Layered Synced Lyrics'}
              </h3>
              <p className="text-xs sm:text-sm text-[#929299] leading-relaxed mb-6">
                {isAr
                  ? 'عرض الكلمات بالتزامن مع توقيت الغناء. يدعم ملفات .lrc المحلية، والبيانات المدمجة، وجلب اختياري من LRCLIB مع حفظ تلقائي دون إنترنت.'
                  : 'Follow song position in real-time. Resolves local .lrc files, embedded ID3 tags, and optional LRCLIB retrieval with offline disk caching.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#242428] space-y-1.5 text-xs text-[#929299]">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                <span>Tap any line to seek playback</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                <span>Fine-tune offset timing (-0.5s / +0.5s)</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0C] border border-[#242428] flex items-center justify-center text-[#929299] mb-6">
                <Palette className="w-5 h-5 text-[#929299]" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">
                {isAr ? '4 ثيمات داكنة وتكيف لوني' : '4 OLED Dark Themes'}
              </h3>
              <p className="text-xs sm:text-sm text-[#929299] leading-relaxed mb-6">
                {isAr
                  ? 'اختر من بين: Graphite Noir، OLED Black الموفر للبطارية، Midnight Navy، و Deep Crimson. مع تلوين ديناميكي مستوحى من غلاف الألبوم.'
                  : 'Graphite Noir, pure battery-saving OLED Black, Midnight Navy, and Deep Crimson. The Now Playing screen extracts tones dynamically from album art.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#242428] flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full bg-[#111114] border border-[#2F2F35]" title="Graphite Noir" />
              <span className="w-4 h-4 rounded-full bg-[#000000] border border-[#242428]" title="OLED Black" />
              <span className="w-4 h-4 rounded-full bg-[#0D1527] border border-[#1E293B]" title="Midnight Navy" />
              <span className="w-4 h-4 rounded-full bg-[#4A0B15] border border-[#B91C35]" title="Deep Crimson" />
              <span className="text-[10px] text-[#66666E] ml-auto font-mono">Dynamic Artwork</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Equalizer Demo */}
        <div className="pt-4">
          <EqualizerInteractive currentLang={currentLang} />
        </div>

        {/* 3. Deep Features: Playback Controls & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio Controls */}
          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-[#242428] text-[#929299]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F7]">
                  {isAr ? 'أدوات تحكم احترافية' : 'Refined Playback Mechanics'}
                </h3>
                <span className="text-xs text-[#66666E] font-mono">Android MediaSession & AudioFocus</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#929299] leading-relaxed mb-6">
              {isAr
                ? 'تحكم سلس لا ينقطع. يتعامل ويتشي مع تداخلات الصوت بذكاء، فيوقف التشغيل مؤقتاً عند ورود مكالمة أو فصل سماعة الرأس، مع أزرار تشغيل متكاملة في شاشة القفل والإشعارات.'
                : 'Engineered for seamless everyday listening. Full integration with Android Audio Focus, media notifications, lockscreen media controls, and automatic pause upon headphone disconnection.'}
            </p>

            <div className="grid grid-cols-2 gap-2.5 text-xs text-[#F5F5F7]">
              <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#242428]">
                <div className="font-medium text-white mb-0.5">{isAr ? 'مؤقت النوم' : 'Sleep Timer'}</div>
                <div className="text-[10px] text-[#66666E]">{isAr ? 'إيقاف تدريجي مؤقت' : 'Configurable countdown'}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#242428]">
                <div className="font-medium text-white mb-0.5">{isAr ? 'تلاشي انتقالي' : 'Crossfade & Gapless'}</div>
                <div className="text-[10px] text-[#66666E]">{isAr ? 'محاكاة التلاشي الناعم' : 'Smooth track transitions'}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#242428]">
                <div className="font-medium text-white mb-0.5">{isAr ? 'سرعة متغيرة' : 'Tempo Modulation'}</div>
                <div className="text-[10px] text-[#66666E]">0.5× to 2.0× without pitch shift</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#242428]">
                <div className="font-medium text-white mb-0.5">{isAr ? 'إحصائيات الاستماع' : 'Playtime Analytics'}</div>
                <div className="text-[10px] text-[#66666E]">{isAr ? 'مخزنة محلياً في جهازك' : '100% on-device metrics'}</div>
              </div>
            </div>
          </div>

          {/* Privacy Architecture */}
          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-[#242428] text-[#B91C35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F7]">
                  {isAr ? 'خصوصية غير مشروطة' : 'Uncompromising Privacy'}
                </h3>
                <span className="text-xs text-[#66666E] font-mono">No telemetry. No accounts.</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#929299] leading-relaxed mb-6">
              {isAr
                ? 'لا يحتوي التطبيق على أي مكتبات إعلانية، ولا أدوات تتبع السلوك، ولا مجمعات أعطال ترسل بياناتك إلى خوادم خارجية. يتم استخدام الإنترنت حصرياً لجلب الكلمات أونلاين عند تفعيلها والتحقق من التحديثات.'
                : 'Weechy contains no third-party telemetry, no crash-reporting SDKs, no advertising trackers, and no mandatory login. Network requests occur exclusively for user-initiated LRCLIB lyrics lookups and public GitHub release checks.'}
            </p>

            <div className="space-y-2.5 text-xs text-[#929299]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B91C35] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Local Room SQLite:</strong> Playlists, favorites, and settings stay private in your device sandbox.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B91C35] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Zero Account Requirements:</strong> No email, no password, no tracking profiles. Install and play immediately.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B91C35] shrink-0 mt-0.5" />
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
