import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScreenshotsShowcase } from './components/ScreenshotsShowcase';
import { FeaturesSection } from './components/FeaturesSection';
import { DownloadSection } from './components/DownloadSection';
import { ChangelogSection } from './components/ChangelogSection';
import { FAQSection } from './components/FAQSection';
import { PrivacySection } from './components/PrivacySection';
import { Footer } from './components/Footer';
import { AudioIntelligenceModal } from './components/AudioIntelligenceModal';
import { INITIAL_RELEASE } from './config/site';
import { ReleaseData, Language } from './types';

export default function App() {
  const [release, setRelease] = useState<ReleaseData>(INITIAL_RELEASE);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isAudioLabOpen, setIsAudioLabOpen] = useState(false);

  // Check URL params or localStorage for language on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'ar' || langParam === 'en') {
      setCurrentLang(langParam as Language);
    } else {
      const savedLang = localStorage.getItem('weechy_lang');
      if (savedLang === 'ar' || savedLang === 'en') {
        setCurrentLang(savedLang as Language);
      }
    }
  }, []);

  // Update document direction and lang attribute whenever currentLang changes
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('weechy_lang', currentLang);
  }, [currentLang]);

  // Fetch live release metadata
  useEffect(() => {
    fetch('/api/release')
      .then((res) => res.json())
      .then((payload) => {
        if (payload && payload.data) {
          setRelease((prev) => ({
            ...prev,
            ...payload.data,
          }));
        }
      })
      .catch((err) => {
        console.warn('Using verified default release metadata:', err);
      });
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
    const url = new URL(window.location.href);
    if (newLang === 'ar') {
      url.searchParams.set('lang', 'ar');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F5F5F7] flex flex-col selection:bg-[#B91C35]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenAudioLab={() => setIsAudioLabOpen(true)}
        apkUrl={release.apkUrl}
        versionName={release.versionName}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero with signature interactive sound wave field */}
        <Hero
          release={release}
          currentLang={currentLang}
          onOpenAudioLab={() => setIsAudioLabOpen(true)}
        />

        {/* 2. Authentic Android Screenshots Showcase */}
        <ScreenshotsShowcase currentLang={currentLang} />

        {/* 3. Deep Features & 10-Band Graphic Equalizer */}
        <FeaturesSection currentLang={currentLang} />

        {/* 4. Trustworthy Download & Integrity Verification */}
        <DownloadSection release={release} currentLang={currentLang} />

        {/* 5. Authoritative Changelog & Timeline */}
        <ChangelogSection currentLang={currentLang} />

        {/* 6. Comprehensive Semantic FAQ */}
        <FAQSection currentLang={currentLang} />

        {/* 7. Transparent Privacy Policy */}
        <PrivacySection currentLang={currentLang} />
      </main>

      {/* 8. Minimalist Brand Footer */}
      <Footer currentLang={currentLang} versionName={release.versionName} />

      {/* 9. High-thinking Acoustic & EQ Tuning Advisor Modal */}
      <AudioIntelligenceModal
        isOpen={isAudioLabOpen}
        onClose={() => setIsAudioLabOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
