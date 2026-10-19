import React from 'react';
import { ExternalLink, Heart, Radio } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  versionName: string;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, versionName }) => {
  const isAr = currentLang === 'ar';

  return (
    <footer className="bg-[#08090B] border-t border-[#27292F] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative subtle sound-wave silhouette at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C41E3A]/40 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#121418] border border-[#27292F] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Weechy</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121418] border border-[#27292F] text-[#777982]">
              v{versionName}
            </span>
          </div>
          <p className="text-xs text-[#777982] max-w-sm text-center md:text-left">
            {isAr
              ? 'مشغل موسيقى محلي خفيف الوزن لنظام أندرويد. موسيقاك، جهازك، إيقاعك.'
              : 'A quiet, personal space for music on Android. Local-first, privacy-driven, and open.'}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#A1A1AA] font-mono">
          <a href="#features" className="hover:text-white transition-colors">
            {isAr ? 'المميزات' : 'Features'}
          </a>
          <a href="#showcase" className="hover:text-white transition-colors">
            {isAr ? 'الواجهة' : 'Interface'}
          </a>
          <a href="#download" className="hover:text-white transition-colors">
            {isAr ? 'التحميل' : 'Download'}
          </a>
          <a href="#changelog" className="hover:text-white transition-colors">
            {isAr ? 'سجل الإصدارات' : 'Changelog'}
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            {isAr ? 'الخصوصية' : 'Privacy'}
          </a>
          <a
            href="https://github.com/itsmectrl/weechy-releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C41E3A] transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#777982] text-center md:text-right font-mono">
          <div>© {new Date().getFullYear()} Weechy Project.</div>
          <div className="text-[11px] text-[#777982]/80 mt-0.5">
            Android is a trademark of Google LLC.
          </div>
        </div>
      </div>
    </footer>
  );
};
