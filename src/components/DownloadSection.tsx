import React, { useState } from 'react';
import { Download, Check, Copy, ExternalLink, ShieldCheck, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
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
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] border-t border-[#242428] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B91C35]" />
            <span>{isAr ? 'مركز التحميل الرسمي' : 'Official Distribution'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'تحميل تطبيق Weechy لنظام أندرويد' : 'Download Weechy for Android'}
          </h2>
          <p className="text-sm sm:text-base text-[#929299] leading-relaxed">
            {isAr
              ? 'احصل على ملف APK الرسمي مباشرة من مستودع الإصدارات واستمتع بمكتبتك الصوتية مع كلمات متزامنة وميزات تحكم متقدمة.'
              : 'Direct from the official repository. Clean, lightweight, and completely ad-free.'}
          </p>
        </div>

        {/* Main Release Card */}
        <div className="bg-[#111114] border border-[#242428] rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left metadata info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#16161A] border border-[#242428] text-xs font-mono text-[#F5F5F7]">
                  Series: <strong className="text-white">{release.series}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#16161A] border border-[#242428] text-xs font-mono text-[#F5F5F7]">
                  v{release.versionName}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#16161A] border border-[#242428] text-xs font-mono text-[#66666E]">
                  Code: {release.versionCode}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] tracking-tight">
                  {release.displayName || `Weechy — ${release.series} ${release.versionName}`}
                </h3>
                <div className="text-xs font-mono text-[#66666E] mt-1">
                  Tag: {release.releaseTag} • Requirement: {release.minAndroid || 'Android 8.0+'}
                </div>
              </div>

              {/* Release Notes */}
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-[#242428]">
                <div className="text-xs font-medium text-[#F5F5F7] mb-1.5 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#B91C35]" />
                  <span>{isAr ? 'ملاحظات الإصدار الحالي' : 'What’s New in This Release'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#929299] leading-relaxed">
                  {release.notes || 'Smart audio filtering, Spotify metadata matching & high-res artwork enrichment, and mass bulk selection.'}
                </p>
              </div>

              {/* Verified Checksum Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#929299] font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#66666E]" />
                    SHA-256 Checksum
                  </span>
                  <button
                    onClick={() => copyToClipboard(release.sha256, setCopiedChecksum)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#929299] hover:text-white transition-colors"
                  >
                    {copiedChecksum ? <Check className="w-3 h-3 text-[#B91C35]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedChecksum ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البصمة' : 'Copy Hash')}</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-[#050506] border border-[#242428] font-mono text-[11px] text-[#929299] break-all select-all">
                  {release.sha256 || 'Unavailable in manifest'}
                </div>
              </div>
            </div>

            {/* Right Download CTA Box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0A0A0C] border border-[#242428] rounded-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1 text-center">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {release.sizeDisplay || '2.05 MB'}
                </div>
                <div className="text-xs text-[#66666E] font-mono">
                  {isAr ? 'حجم ملف APK الفعلي' : 'Standalone Signed APK'}
                </div>
              </div>

              {/* Direct APK Download Button */}
              <a
                href={release.apkUrl}
                download
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#B91C35] hover:bg-[#D12A43] text-white font-medium text-sm transition-all duration-150 active:scale-[0.99] text-center"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل مباشر لـ APK' : 'Download APK Directly'}</span>
              </a>

              {/* GitHub Releases Link */}
              <a
                href={release.pageUrl || 'https://github.com/itsmectrl/weechy-releases'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111114] hover:bg-[#16161A] text-xs font-mono text-[#929299] hover:text-[#F5F5F7] border border-[#242428] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#66666E]" />
                <span>{isAr ? 'عرض الإصدار على GitHub' : 'View on GitHub Releases'}</span>
              </a>

              <div className="text-[11px] text-[#66666E] text-center space-y-0.5">
                <div>Android 8.0 through Android 15</div>
                <div>Free, open-source, and tracker-free</div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Guide & Terminal Verification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step-by-Step Android APK Installation */}
          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428]">
            <h3 className="text-base font-bold text-[#F5F5F7] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B91C35]" />
              {isAr ? 'خطوات التثبيت على أندرويد' : 'How to Install on Android'}
            </h3>

            <ol className="space-y-3.5 text-xs text-[#929299]">
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#16161A] border border-[#242428] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">Download the APK:</strong> Tap the download button on your Android device.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#16161A] border border-[#242428] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">Open the file:</strong> Tap the download completion notification or find it in your Files app.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#16161A] border border-[#242428] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">Allow Unknown Sources:</strong> If prompted, enable "Allow from this source" in system settings.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#16161A] border border-[#242428] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-white">Grant Media Permission:</strong> On initial launch, permit reading audio files so Weechy indexes your library.
                </div>
              </li>
            </ol>
          </div>

          {/* Cryptographic Verification Guide */}
          <div className="p-8 rounded-2xl bg-[#111114] border border-[#242428]">
            <h3 className="text-base font-bold text-[#F5F5F7] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#66666E]" />
              {isAr ? 'التحقق من البصمة الرقمية' : 'Verify File Integrity'}
            </h3>

            <p className="text-xs text-[#929299] leading-relaxed mb-4">
              {isAr
                ? 'للتأكد من أن ملف APK الذي تم تنزيله لم يتعرض لأي تعديل، قارن ناتج أمر التجزئة بالبصمة المنشورة أعلاه:'
                : 'To verify that your downloaded APK has not been altered or corrupted in transit, run the command for your operating system:'}
            </p>

            {/* Linux / macOS */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#66666E]">
                <span>Linux & macOS Terminal</span>
                <button
                  onClick={() => copyToClipboard(linuxCmd, setCopiedLinuxCmd)}
                  className="text-[#929299] hover:text-white flex items-center gap-1"
                >
                  {copiedLinuxCmd ? <Check className="w-3 h-3 text-[#B91C35]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLinuxCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050506] border border-[#242428] font-mono text-[11px] text-[#929299]">
                {linuxCmd}
              </div>
            </div>

            {/* Windows Command Prompt */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#66666E]">
                <span>Windows Command Prompt</span>
                <button
                  onClick={() => copyToClipboard(winCmd, setCopiedWinCmd)}
                  className="text-[#929299] hover:text-white flex items-center gap-1"
                >
                  {copiedWinCmd ? <Check className="w-3 h-3 text-[#B91C35]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedWinCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050506] border border-[#242428] font-mono text-[11px] text-[#929299]">
                {winCmd}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
