import React, { useState } from 'react';
import { SCREENSHOTS } from '../config/site';
import { Language } from '../types';
import { Maximize2, X, ChevronRight, ChevronLeft, Sparkles, Smartphone } from 'lucide-react';

interface ScreenshotsShowcaseProps {
  currentLang: Language;
}

export const ScreenshotsShowcase: React.FC<ScreenshotsShowcaseProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';
  const [selectedId, setSelectedId] = useState<string>('songs');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const activeIndex = SCREENSHOTS.findIndex((s) => s.id === selectedId);
  const activeItem = SCREENSHOTS[activeIndex] || SCREENSHOTS[0];

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SCREENSHOTS.length;
    setSelectedId(SCREENSHOTS[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length;
    setSelectedId(SCREENSHOTS[prevIdx].id);
  };

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0E11] border-y border-[#27292F] relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C41E3A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#363841]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-3">
            <Smartphone className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span>{isAr ? 'واجهة التطبيق الحقيقية' : 'Authentic Application Interface'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'مصمم بعناية ليناسب تركيزك' : 'Artfully Engineered for Audio Focus'}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'لقطات شاشة حقيقية من داخل تطبيق ويتشي على نظام أندرويد. واجهة حديثة مبنية بـ Jetpack Compose وثيمات داكنة تحافظ على البطارية وتريح العينين.'
              : 'Real captures from Weechy on Android. High-performance UI built with Jetpack Compose, Material Design 3, and OLED-optimized dark palettes.'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" role="tablist">
          {SCREENSHOTS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(item.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#191C21] text-[#F4F4F5] border-[#C41E3A]/70 shadow-md shadow-[#C41E3A]/10'
                    : 'bg-[#121418] text-[#777982] hover:text-[#A1A1AA] border-[#27292F]'
                }`}
              >
                {isAr ? item.titleAr : item.titleEn}
              </button>
            );
          })}
        </div>

        {/* Lead Showcase Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto bg-[#121418] border border-[#27292F] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Screenshot Display Frame */}
          <div className="lg:col-span-6 flex justify-center relative group">
            {/* Ambient backlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#C41E3A]/15 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative rounded-2xl p-2 bg-[#08090B] border border-[#363841] shadow-2xl max-w-[310px] w-full">
              {/* Android top speaker & camera punchhole subtle simulation */}
              <div className="flex justify-between items-center px-4 py-1.5 text-[10px] text-[#777982] font-mono border-b border-[#27292F]/40 mb-1">
                <span>Weechy Player</span>
                <span className="w-2 h-2 rounded-full bg-[#27292F]" />
              </div>

              <div className="relative overflow-hidden rounded-xl bg-black">
                <img
                  src={activeItem.src}
                  alt={isAr ? activeItem.titleAr : activeItem.titleEn}
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Zoom Trigger Button */}
                <button
                  onClick={() => setLightboxImage(activeItem.src)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#08090B]/80 hover:bg-[#C41E3A] text-white border border-[#27292F] backdrop-blur-sm transition-colors opacity-90 hover:opacity-100"
                  title="Expand screenshot"
                  aria-label="Expand screenshot"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Description & Navigation Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191C21] border border-[#27292F] text-xs font-mono text-[#C41E3A] self-start">
              <span>{isAr ? activeItem.badgeAr : activeItem.badgeEn}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F5] tracking-tight">
              {isAr ? activeItem.titleAr : activeItem.titleEn}
            </h3>

            <p className="text-base text-[#A1A1AA] leading-relaxed">
              {isAr ? activeItem.descriptionAr : activeItem.descriptionEn}
            </p>

            {/* Feature bullets tailored to screen */}
            <div className="space-y-3 pt-2 border-t border-[#27292F]">
              {activeItem.id === 'songs' && (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    <span>Instant MediaStore scanning for local MP3, FLAC, AAC, WAV, OPUS</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96]" />
                    <span>Dynamic search, custom sorting by title, artist, and date added</span>
                  </div>
                </>
              )}
              {activeItem.id === 'lyrics' && (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    <span>Karaoke-style line-by-line follow with tap-to-seek playback</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96]" />
                    <span>Sync adjustment buttons (-0.5s / +0.5s) for millisecond accuracy</span>
                  </div>
                </>
              )}
              {activeItem.id === 'settings' && (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    <span>4 Dark Themes: Graphite Noir, OLED Black, Midnight Navy, Deep Crimson</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96]" />
                    <span>Sleep timer, lyrics cache management, and local file backup</span>
                  </div>
                </>
              )}
              {activeItem.id === 'landscape' && (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    <span>Split-screen view with artwork on the left and scrolling lyrics on the right</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96]" />
                    <span>Optimized for landscape in-car docks, stands, and tablets</span>
                  </div>
                </>
              )}
              {['albums', 'artist', 'folders', 'playlist'].includes(activeItem.id) && (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    <span>Offline metadata extraction without transmitting data to external servers</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D8D9DE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8D96]" />
                    <span>Room SQLite local database for fast query execution</span>
                  </div>
                </>
              )}
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-[#27292F] bg-[#0D0E11] hover:bg-[#191C21] text-[#A1A1AA] hover:text-white transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#777982]">
                {activeIndex + 1} / {SCREENSHOTS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-[#27292F] bg-[#0D0E11] hover:bg-[#191C21] text-[#A1A1AA] hover:text-white transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail gallery preview */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-8 max-w-5xl mx-auto">
          {SCREENSHOTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`relative rounded-xl overflow-hidden aspect-[9/16] border transition-all duration-200 ${
                item.id === selectedId
                  ? 'border-[#C41E3A] ring-2 ring-[#C41E3A]/40 scale-105'
                  : 'border-[#27292F] opacity-60 hover:opacity-90'
              }`}
            >
              <img
                src={item.src}
                alt={isAr ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#C41E3A] transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Expanded preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-[#363841] shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
