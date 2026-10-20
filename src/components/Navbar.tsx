import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sliders, Globe } from 'lucide-react';
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
      setScrolled(window.scrollY > 15);
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
          ? 'bg-[#050506]/85 backdrop-blur-md border-b border-[#242428] py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B91C35] rounded-md px-1"
          aria-label="Weechy Home"
        >
          <div className="relative w-7 h-7 flex items-center justify-center rounded-full bg-[#111114] border border-[#242428] group-hover:border-[#B91C35] transition-colors">
            <svg
              className="w-4 h-4 text-[#B91C35] transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#111114" stroke="#B91C35" strokeWidth="6" />
              <circle cx="50" cy="50" r="28" stroke="#66666E" strokeWidth="2.5" strokeDasharray="4 3" />
              <circle cx="50" cy="50" r="10" fill="#B91C35" />
              <circle cx="50" cy="50" r="3" fill="#F5F5F7" />
              <path d="M72 26 C75 36 74 48 67 58 C64 63 60 67 57 69" stroke="#F5F5F7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
              Weechy
            </span>
            <span className="text-[10px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-[#111114] border border-[#242428] text-[#929299]">
              v{versionName}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#929299]" aria-label="Main Navigation">
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
              className={`transition-colors hover:text-[#F5F5F7] ${
                link.isSpecial
                  ? 'flex items-center gap-1.5 text-[#F5F5F7] hover:text-[#B91C35]'
                  : ''
              }`}
            >
              {link.isSpecial && <Sliders className="w-3 h-3 text-[#B91C35]" />}
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Actions & Language Selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#242428] text-xs font-mono text-[#929299] hover:text-[#F5F5F7] hover:border-[#2F2F35] transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#66666E]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary CTA */}
          <a
            href={apkUrl || '#download'}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#B91C35] hover:bg-[#D12A43] text-white text-xs font-medium tracking-tight transition-all duration-150 active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isAr ? 'تحميل APK' : 'Download APK'}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
            className="p-1.5 rounded-lg border border-[#242428] text-xs font-mono text-[#929299]"
            aria-label="Toggle language"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#242428] text-[#F5F5F7] hover:bg-[#111114] focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#929299]" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0C] border-b border-[#242428] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
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
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-[#929299] hover:text-[#F5F5F7] hover:bg-[#111114] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {link.isSpecial && <Sliders className="w-3.5 h-3.5 text-[#B91C35]" />}
                  {isAr ? link.labelAr : link.labelEn}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#242428]">
            <a
              href={apkUrl || '#download'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#B91C35] hover:bg-[#D12A43] text-white text-xs font-medium tracking-tight transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل تطبيق Weechy APK' : 'Download Weechy APK'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
