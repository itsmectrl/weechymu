import React, { useState } from 'react';
import { Download, Check, Copy, ExternalLink, ShieldCheck, Terminal, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';
import { ReleaseData, Language } from '../types';

interface DownloadSectionProps {
  release: ReleaseData;
  currentLang: Language;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ release, currentLang }) => {
  const isAr = currentLang === 'ar';
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const [copiedLinuxCmd, setCopiedLinuxCmd] = useState(false);
  const [copiedWinCmd, setCopiedWinCmd] = useState(false);

  const apkFilename = release.apkUrl
    ? release.apkUrl.substring(release.apkUrl.lastIndexOf('/') + 1)
    : `Weechy-${release.versionName}-New-version.apk`;

  const linuxCmd = `sha256sum ${apkFilename}`;
  const winCmd = `certutil -hashfile ${apkFilename} SHA256`;

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0E11] border-t border-[#27292F] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
            <span>{isAr ? 'مركز التحميل الرسمي' : 'Official Release Distribution'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'تحميل تطبيق Weechy لنظام أندرويد' : 'Download Weechy for Android'}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'احصل على ملف APK الرسمي مباشرة من مستودع الإصدارات واستمتع بمكتبتك الصوتية مع كلمات متزامنة وميزات تحكم متقدمة.'
              : 'Get Weechy directly from its authoritative release source. Clean, lightweight, and completely ad-free.'}
          </p>
        </div>

        {/* Main Release Card */}
        <div className="bg-[#121418] border border-[#27292F] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C41E3A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left metadata info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#191C21] border border-[#27292F] text-xs font-mono text-[#F4F4F5]">
                  Series: <strong className="text-white">{release.series}</strong>
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#C41E3A]/20 border border-[#C41E3A]/40 text-xs font-mono text-[#E02A46]">
                  Version {release.versionName}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#191C21] border border-[#27292F] text-xs font-mono text-[#8A8D96]">
                  Build code: {release.versionCode}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                  {release.displayName || `Weechy — ${release.series} ${release.versionName}`}
                </h3>
                <div className="text-xs font-mono text-[#777982] mt-1">
                  Tag: {release.releaseTag} • Requirement: {release.minAndroid || 'Android 8.0+'}
                </div>
              </div>

              {/* Release Notes */}
              <div className="p-4 rounded-2xl bg-[#0D0E11] border border-[#27292F]">
                <div className="text-xs font-semibold text-[#D8D9DE] mb-1.5 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#C41E3A]" />
                  <span>{isAr ? 'ملاحظات الإصدار الحالي' : 'What’s New in This Release'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {release.notes || 'Smart audio filtering, Spotify metadata matching & high-res artwork enrichment, and mass bulk selection.'}
                </p>
              </div>

              {/* Verified Checksum Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8A8D96] font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C41E3A]" />
                    SHA-256 Checksum
                  </span>
                  <button
                    onClick={() => copyToClipboard(release.sha256, setCopiedChecksum)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#C41E3A] hover:text-[#E02A46] transition-colors"
                  >
                    {copiedChecksum ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedChecksum ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البصمة' : 'Copy Hash')}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#08090B] border border-[#27292F] font-mono text-[11px] text-[#D8D9DE] break-all select-all">
                  {release.sha256 || 'Unavailable in manifest'}
                </div>
              </div>
            </div>

            {/* Right Download CTA Box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0D0E11] border border-[#27292F] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {release.sizeDisplay || '2.05 MB'}
                </div>
                <div className="text-xs text-[#777982] font-mono">
                  {isAr ? 'حجم ملف APK الفعلي' : 'Standalone Signed APK'}
                </div>
              </div>

              {/* Direct APK Download Button */}
              <a
                href={release.apkUrl}
                download
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#C41E3A] hover:bg-[#E02A46] text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-[#C41E3A]/25 hover:shadow-[#C41E3A]/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] text-center"
              >
                <Download className="w-5 h-5" />
                <span>{isAr ? 'تحميل مباشر لـ APK' : 'Download APK Directly'}</span>
              </a>

              {/* GitHub Releases Link */}
              <a
                href={release.pageUrl || 'https://github.com/itsmectrl/weechy-releases'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#121418] hover:bg-[#191C21] text-xs font-mono text-[#D8D9DE] hover:text-white border border-[#27292F] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#8A8D96]" />
                <span>{isAr ? 'عرض الإصدار على GitHub' : 'View on GitHub Releases'}</span>
              </a>

              <div className="text-[11px] text-[#777982] text-center space-y-1">
                <div>Android 8.0 (API 26) through Android 15</div>
                <div>Free, open-source, and free of proprietary trackers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Guide & Terminal Verification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Step-by-Step Android APK Installation */}
          <div className="p-8 rounded-3xl bg-[#121418] border border-[#27292F]">
            <h3 className="text-xl font-bold text-[#F4F4F5] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C41E3A]" />
              {isAr ? 'خطوات التثبيت على أندرويد' : 'How to Install on Android'}
            </h3>

            <ol className="space-y-4 text-xs text-[#A1A1AA]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#191C21] border border-[#27292F] text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">Download the APK:</strong> Click the download button above on your Android smartphone or tablet.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#191C21] border border-[#27292F] text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">Open the downloaded file:</strong> Tap the download complete notification in your status bar or inside your Files app.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#191C21] border border-[#27292F] text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">Allow Unknown Sources:</strong> If Android warns you that the APK is from an unknown source, tap <em className="text-[#D8D9DE] not-italic">Settings</em> and enable <em className="text-[#D8D9DE] not-italic">"Allow from this source"</em> for your browser.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#191C21] border border-[#27292F] text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-white">Grant Media Permission:</strong> On initial launch, allow access to audio files so Weechy can scan your local music library.
                </div>
              </li>
            </ol>
          </div>

          {/* Cryptographic Verification Guide */}
          <div className="p-8 rounded-3xl bg-[#121418] border border-[#27292F]">
            <h3 className="text-xl font-bold text-[#F4F4F5] mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#8A8D96]" />
              {isAr ? 'التحقق من البصمة الرقمية' : 'Verify File Integrity'}
            </h3>

            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
              {isAr
                ? 'للتأكد من أن ملف APK الذي تم تنزيله لم يتعرض لأي تعديل، قارن ناتج أمر التجزئة بالبصمة المنشورة أعلاه:'
                : 'To verify that your downloaded APK has not been altered or corrupted in transit, run the command for your operating system:'}
            </p>

            {/* Linux / macOS */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#777982]">
                <span>Linux & macOS Terminal</span>
                <button
                  onClick={() => copyToClipboard(linuxCmd, setCopiedLinuxCmd)}
                  className="text-[#C41E3A] hover:text-[#E02A46] flex items-center gap-1"
                >
                  {copiedLinuxCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLinuxCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#08090B] border border-[#27292F] font-mono text-[11px] text-[#D8D9DE]">
                {linuxCmd}
              </div>
            </div>

            {/* Windows Command Prompt */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#777982]">
                <span>Windows Command Prompt</span>
                <button
                  onClick={() => copyToClipboard(winCmd, setCopiedWinCmd)}
                  className="text-[#C41E3A] hover:text-[#E02A46] flex items-center gap-1"
                >
                  {copiedWinCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedWinCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#08090B] border border-[#27292F] font-mono text-[11px] text-[#D8D9DE]">
                {winCmd}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
