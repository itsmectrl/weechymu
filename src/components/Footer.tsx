import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  versionName: string;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, versionName }) => {
  const isAr = currentLang === 'ar';

  return (
    <footer className="bg-[#050506] border-t border-[#242428] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B91C35]" />
            <span className="text-base font-semibold text-[#F5F5F7] tracking-tight">Weechy</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#111114] border border-[#242428] text-[#66666E]">
              v{versionName}
            </span>
          </div>
          <p className="text-xs text-[#66666E] max-w-sm text-center md:text-left">
            {isAr
              ? 'مشغل موسيقى محلي خفيف الوزن لنظام أندرويد. موسيقاك، جهازك، إيقاعك.'
              : 'A quiet, personal space for music on Android. Local-first and privacy-conscious.'}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#929299] font-mono">
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
            className="hover:text-[#B91C35] transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#66666E]" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#66666E] text-center md:text-right font-mono">
          <div>© {new Date().getFullYear()} Weechy Project.</div>
          <div className="text-[11px] text-[#66666E]/70 mt-0.5">
            Android is a trademark of Google LLC.
          </div>
        </div>
      </div>
    </footer>
  );
};
