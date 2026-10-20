import React, { useState } from 'react';
import { SCREENSHOTS } from '../config/site';
import { Language } from '../types';
import { Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';

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
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] border-y border-[#242428] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span>{isAr ? 'واجهة التطبيق' : 'Application Interface'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'مصمم بعناية ليناسب تركيزك' : 'Engineered for Pure Focus'}
          </h2>
          <p className="text-sm sm:text-base text-[#929299] leading-relaxed">
            {isAr
              ? 'لقطات شاشة حقيقية من داخل تطبيق ويتشي على نظام أندرويد. واجهة حديثة مبنية بـ Jetpack Compose وثيمات داكنة تحافظ على البطارية وتريح العينين.'
              : 'Direct captures from Weechy running on Android. Modern UI crafted with Jetpack Compose and battery-saving dark themes.'}
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
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  isSelected
                    ? 'bg-[#16161A] text-[#F5F5F7] border-[#2F2F35]'
                    : 'bg-[#111114] text-[#66666E] hover:text-[#929299] border-[#242428]'
                }`}
              >
                {isAr ? item.titleAr : item.titleEn}
              </button>
            );
          })}
        </div>

        {/* Lead Showcase Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto bg-[#111114] border border-[#242428] rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Screenshot Display Frame */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative rounded-2xl p-2 bg-[#050506] border border-[#242428] shadow-2xl max-w-[310px] w-full">
              {/* Android top bar indicator */}
              <div className="flex justify-between items-center px-4 py-1 text-[10px] text-[#66666E] font-mono border-b border-[#242428]/40 mb-1">
                <span>Weechy Player</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#242428]" />
              </div>

              <div className="relative overflow-hidden rounded-xl bg-black">
                <img
                  src={activeItem.src}
                  alt={isAr ? activeItem.titleAr : activeItem.titleEn}
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />

                {/* Zoom Trigger Button */}
                <button
                  onClick={() => setLightboxImage(activeItem.src)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#050506]/80 hover:bg-[#B91C35] text-white border border-[#242428] backdrop-blur-sm transition-colors"
                  title="Expand screenshot"
                  aria-label="Expand screenshot"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Description & Navigation Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#16161A] border border-[#242428] text-[11px] font-mono text-[#929299] self-start">
              <span>{isAr ? activeItem.badgeAr : activeItem.badgeEn}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] tracking-tight">
              {isAr ? activeItem.titleAr : activeItem.titleEn}
            </h3>

            <p className="text-sm sm:text-base text-[#929299] leading-relaxed">
              {isAr ? activeItem.descriptionAr : activeItem.descriptionEn}
            </p>

            {/* Feature bullets tailored to screen */}
            <div className="space-y-2.5 pt-4 border-t border-[#242428] text-xs text-[#929299]">
              {activeItem.id === 'songs' && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                    <span>Instant MediaStore scanning for MP3, FLAC, AAC, WAV, OPUS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                    <span>Dynamic search, custom sorting by title, artist, and date added</span>
                  </div>
                </>
              )}
              {activeItem.id === 'lyrics' && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                    <span>Karaoke-style line-by-line follow with tap-to-seek playback</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                    <span>Sync adjustment buttons (-0.5s / +0.5s) for millisecond accuracy</span>
                  </div>
                </>
              )}
              {activeItem.id === 'settings' && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                    <span>4 Dark Themes: Graphite Noir, OLED Black, Midnight Navy, Deep Crimson</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                    <span>Sleep timer, lyrics cache management, and local file backup</span>
                  </div>
                </>
              )}
              {activeItem.id === 'landscape' && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                    <span>Split-screen view with artwork and scrolling lyrics</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                    <span>Optimized for landscape in-car docks, stands, and tablets</span>
                  </div>
                </>
              )}
              {['albums', 'artist', 'folders', 'playlist'].includes(activeItem.id) && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#B91C35]" />
                    <span>Offline metadata extraction without transmitting data to external servers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#66666E]" />
                    <span>Room SQLite local database for fast query execution</span>
                  </div>
                </>
              )}
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg border border-[#242428] bg-[#0A0A0C] hover:bg-[#16161A] text-[#929299] hover:text-[#F5F5F7] transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#66666E]">
                {activeIndex + 1} / {SCREENSHOTS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg border border-[#242428] bg-[#0A0A0C] hover:bg-[#16161A] text-[#929299] hover:text-[#F5F5F7] transition-colors"
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
              className={`relative rounded-lg overflow-hidden aspect-[9/16] border transition-all ${
                item.id === selectedId
                  ? 'border-[#B91C35] ring-1 ring-[#B91C35]'
                  : 'border-[#242428] opacity-50 hover:opacity-80'
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
              className="absolute -top-10 right-0 p-2 text-[#929299] hover:text-white transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage}
              alt="Expanded preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-[#242428] shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
