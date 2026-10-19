import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sliders, Globe, ExternalLink, Music2 } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAudioLab: () => void;
  apkUrl: string;
  versionName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenAudioLab,
  apkUrl,
  versionName,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAr = currentLang === 'ar';

  const navLinks = [
    { href: '#features', labelEn: 'Features', labelAr: 'المميزات' },
    { href: '#showcase', labelEn: 'Interface', labelAr: 'الواجهة' },
    { href: '#audiolab', labelEn: 'Acoustic Lab', labelAr: 'مختبر الصوت', isSpecial: true },
    { href: '#download', labelEn: 'Download', labelAr: 'التحميل' },
    { href: '#changelog', labelEn: 'Changelog', labelAr: 'التحديثات' },
    { href: '#faq', labelEn: 'FAQ', labelAr: 'الأسئلة الشائعة' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-[#27292F] py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C41E3A] rounded-md px-1"
          aria-label="Weechy Home"
        >
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-[#121418] border border-[#27292F] group-hover:border-[#C41E3A]/70 transition-colors">
            <svg
              className="w-5 h-5 text-[#C41E3A] transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#121418" stroke="#C41E3A" strokeWidth="6" />
              <circle cx="50" cy="50" r="28" stroke="#8A8D96" strokeWidth="2.5" strokeDasharray="4 3" />
              <circle cx="50" cy="50" r="10" fill="#C41E3A" />
              <circle cx="50" cy="50" r="3" fill="#F4F4F5" />
              <path d="M72 26 C75 36 74 48 67 58 C64 63 60 67 57 69" stroke="#F4F4F5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold tracking-tight text-[#F4F4F5] group-hover:text-white transition-colors">
              Weechy
            </span>
            <span className="text-[10px] tracking-widest font-mono uppercase px-1.5 py-0.5 rounded bg-[#191C21] border border-[#27292F] text-[#A1A1AA]">
              v{versionName}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.isSpecial) {
                  e.preventDefault();
                  onOpenAudioLab();
                }
              }}
              className={`transition-colors hover:text-[#F4F4F5] ${
                link.isSpecial
                  ? 'flex items-center gap-1.5 text-[#D8D9DE] hover:text-[#C41E3A]'
                  : ''
              }`}
            >
              {link.isSpecial && <Sliders className="w-3.5 h-3.5 text-[#C41E3A]" />}
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Actions & Language Selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#27292F] text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-[#363841] transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C41E3A] hover:bg-[#E02A46] text-[#F4F4F5] hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-md shadow-[#C41E3A]/20 hover:shadow-[#C41E3A]/40 active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isAr ? 'تحميل APK' : 'Download APK'}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
            className="p-2 rounded-lg border border-[#27292F] text-xs font-mono text-[#A1A1AA]"
            aria-label="Toggle language"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#27292F] text-[#F4F4F5] hover:bg-[#121418] focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0E11] border-b border-[#27292F] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.isSpecial) {
                    e.preventDefault();
                    onOpenAudioLab();
                  }
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#121418] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {link.isSpecial && <Sliders className="w-4 h-4 text-[#C41E3A]" />}
                  {isAr ? link.labelAr : link.labelEn}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#27292F] flex flex-col gap-2">
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#C41E3A] text-white text-sm font-semibold tracking-wide"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تحميل تطبيق Weechy' : 'Download Weechy APK'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
