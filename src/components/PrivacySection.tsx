import React from 'react';
import { HardDrive, Server, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface PrivacySectionProps {
  currentLang: Language;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  return (
    <section id="privacy" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050506] border-t border-[#242428] relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span>{isAr ? 'الخصوصية والشفافية' : 'Privacy Statement'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'خصوصيتك ليست سلعة' : 'Privacy by Core Architecture'}
          </h2>
          <p className="text-sm text-[#929299] leading-relaxed">
            {isAr
              ? 'توضيح شفاف يفرق بين سلوك تطبيق ويتشي على جهازك وبين استضافة الموقع الرسمي.'
              : 'Clear, verifiable disclosure distinguishing application local mechanics from website hosting.'}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Android Application Privacy */}
          <div className="p-8 rounded-2xl bg-[#0A0A0C] border border-[#242428] space-y-4">
            <div className="flex items-center gap-2.5 text-[#F5F5F7] font-bold text-base">
              <HardDrive className="w-4 h-4 text-[#B91C35]" />
              <span>{isAr ? 'تطبيق ويتشي لنظام أندرويد' : 'The Weechy Android Application'}</span>
            </div>

            <ul className="space-y-3 text-xs text-[#929299] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B91C35] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">Zero Advertising SDKs:</strong> Weechy contains no ad banners, interstitial code, or monetization SDKs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B91C35] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">Zero Analytics & Trackers:</strong> No Firebase Analytics, Google Analytics, Mixpanel, Sentry, or Crashlytics inside the APK.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B91C35] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">No User Accounts:</strong> We do not ask for email, name, phone, or credentials. Everything stays on your phone.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B91C35] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">Narrow Network Usage:</strong> Network calls occur only when you choose to fetch lyrics from LRCLIB or check the GitHub release endpoint.
                </span>
              </li>
            </ul>
          </div>

          {/* 2. Official Website Privacy */}
          <div className="p-8 rounded-2xl bg-[#0A0A0C] border border-[#242428] space-y-4">
            <div className="flex items-center gap-2.5 text-[#F5F5F7] font-bold text-base">
              <Server className="w-4 h-4 text-[#66666E]" />
              <span>{isAr ? 'الموقع الإلكتروني الرسمي' : 'The Official Website'}</span>
            </div>

            <ul className="space-y-3 text-xs text-[#929299] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#66666E] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">No Tracking Pixels:</strong> This website does not deploy Facebook Pixel, Google Tag Manager, or third-party behavioral cookies.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#66666E] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">Standard Infrastructure Logs:</strong> As with any static web host (Firebase Hosting / GitHub Pages), standard access logs (IP address, user-agent) may be recorded by the infrastructure provider for security.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#66666E] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">No Personal Data Collection:</strong> No newsletters, contact forms that silently discard emails, or hidden data captures.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#66666E] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#F5F5F7]">Direct GitHub Distribution:</strong> All download links route directly to verified releases on GitHub.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Contact Note */}
        <div className="p-6 rounded-xl bg-[#111114] border border-[#242428] text-center space-y-2">
          <div className="text-xs sm:text-sm font-medium text-[#F5F5F7]">
            {isAr ? 'الدعم والاستفسارات التقنية' : 'Project Support & Feedback'}
          </div>
          <p className="text-xs text-[#929299] max-w-xl mx-auto">
            {isAr
              ? 'يمكنك فحص الكود أو الإبلاغ عن مشكلة برمجية عبر صفحة المشاكل في مستودع GitHub الرسمي.'
              : 'To report a bug, request a feature, or inspect release notes, visit the public GitHub repository:'}
          </p>
          <a
            href="https://github.com/itsmectrl/weechy-releases/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B91C35] hover:text-[#D12A43] transition-colors"
          >
            <span>github.com/itsmectrl/weechy-releases/issues</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
