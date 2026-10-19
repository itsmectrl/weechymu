import React from 'react';
import { Shield, Lock, EyeOff, Server, HardDrive, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface PrivacySectionProps {
  currentLang: Language;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  return (
    <section id="privacy" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#08090B] border-t border-[#27292F] relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-3">
            <Lock className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span>{isAr ? 'بيان الخصوصية والشفافية' : 'Truthful Privacy Statement'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'خصوصيتك ليست سلعة' : 'Privacy by Fundamental Architecture'}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'توضيح شفاف يفرق بين سلوك تطبيق ويتشي على جهازك وبين استضافة الموقع الرسمي.'
              : 'Clear, verifiable disclosure distinguishing application local mechanics from website hosting.'}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Android Application Privacy */}
          <div className="p-8 rounded-3xl bg-[#0D0E11] border border-[#27292F] space-y-4">
            <div className="flex items-center gap-2.5 text-[#F4F4F5] font-bold text-lg">
              <HardDrive className="w-5 h-5 text-[#C41E3A]" />
              <span>{isAr ? 'تطبيق ويتشي لنظام أندرويد' : 'The Weechy Android Application'}</span>
            </div>

            <ul className="space-y-3 text-xs text-[#A1A1AA] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">Zero Advertising SDKs:</strong> Weechy contains no ad banners, interstitial code, or monetization SDKs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">Zero Analytics & Crash Trackers:</strong> No Firebase Analytics, Google Analytics, Mixpanel, Sentry, or Crashlytics inside the APK.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">No User Accounts:</strong> We do not ask for email, name, phone, or credentials. Everything stays on your phone.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">Narrow Network Usage:</strong> Network calls occur only when you choose to fetch lyrics from LRCLIB or check the GitHub release endpoint.
                </span>
              </li>
            </ul>
          </div>

          {/* 2. Official Website Privacy */}
          <div className="p-8 rounded-3xl bg-[#0D0E11] border border-[#27292F] space-y-4">
            <div className="flex items-center gap-2.5 text-[#F4F4F5] font-bold text-lg">
              <Server className="w-5 h-5 text-[#8A8D96]" />
              <span>{isAr ? 'الموقع الإلكتروني الرسمي' : 'The Official Website'}</span>
            </div>

            <ul className="space-y-3 text-xs text-[#A1A1AA] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">No Tracking Pixels:</strong> This website does not deploy Facebook Pixel, Google Tag Manager, or third-party behavioral cookies.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">Standard Hosting Logs:</strong> As with any static web host (Firebase Hosting / GitHub Pages), standard access logs (IP address, user-agent) may be recorded by the infrastructure provider for security.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">No Personal Data Collection:</strong> No newsletters, contact forms that silently discard emails, or hidden data captures.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F4F4F5]">Direct GitHub Distribution:</strong> All download links route to verified releases on GitHub.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Contact Note */}
        <div className="p-6 rounded-2xl bg-[#121418] border border-[#27292F] text-center space-y-2">
          <div className="text-sm font-semibold text-[#F4F4F5]">
            {isAr ? 'الدعم والاستفسارات التقنية' : 'Project Support & Feedback'}
          </div>
          <p className="text-xs text-[#A1A1AA] max-w-xl mx-auto">
            {isAr
              ? 'يمكنك فحص الكود أو الإبلاغ عن مشكلة برمجية عبر صفحة المشاكل في مستودع GitHub الرسمي.'
              : 'To report a bug, request a feature, or inspect release notes, visit the public GitHub repository:'}
          </p>
          <a
            href="https://github.com/itsmectrl/weechy-releases/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C41E3A] hover:text-[#E02A46] transition-colors"
          >
            <span>github.com/itsmectrl/weechy-releases/issues</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
