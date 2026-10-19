import React, { useState, useId } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../config/site';
import { Language } from '../types';

interface FAQSectionProps {
  currentLang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const baseId = useId();

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const q = isAr ? item.questionAr : item.questionEn;
    const a = isAr ? item.answerAr : item.answerEn;
    const matchesSearch =
      searchTerm.trim() === '' ||
      q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0E11] border-t border-[#27292F] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'Clear & Transparent Answers'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'كل ما تود معرفته عن ويتشي' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'إجابات واضحة وحقيقية على الأسئلة التقنية والتشغيلية دون وعود تسويقية زائفة.'
              : 'Direct facts regarding playback mechanics, lyrics synchronization, format decoders, and privacy.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-[#777982] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث في الأسئلة الشائعة...' : 'Search questions or topics...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121418] border border-[#27292F] focus:border-[#C41E3A] text-xs sm:text-sm text-[#F4F4F5] placeholder-[#777982] focus:outline-none focus:ring-1 focus:ring-[#C41E3A]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { id: 'all', en: 'All Topics', ar: 'الكل' },
              { id: 'general', en: 'General', ar: 'عام' },
              { id: 'audio', en: 'Audio & DSP', ar: 'الصوت والمعادل' },
              { id: 'lyrics', en: 'Lyrics', ar: 'الكلمات' },
              { id: 'privacy', en: 'Privacy & Safety', ar: 'الخصوصية' },
              { id: 'install', en: 'Install & Verify', ar: 'التثبيت والتحقق' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                  activeCategory === cat.id
                    ? 'bg-[#191C21] text-white border-[#C41E3A]'
                    : 'bg-[#121418] text-[#777982] hover:text-[#A1A1AA] border-[#27292F]'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const isOpen = openIds.includes(item.id);
            const questionText = isAr ? item.questionAr : item.questionEn;
            const answerText = isAr ? item.answerAr : item.answerEn;
            const contentId = `${baseId}-faq-content-${index}`;
            const headerId = `${baseId}-faq-header-${index}`;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#121418] border border-[#27292F] overflow-hidden transition-colors hover:border-[#363841]"
              >
                <button
                  id={headerId}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C41E3A]"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#F4F4F5] leading-snug">
                    {questionText}
                  </span>
                  <div
                    className={`p-1 rounded-md text-[#777982] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C41E3A]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27292F]/40"
                  >
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-sm text-[#777982]">
              {isAr ? 'لم يتم العثور على نتائج تطابق بحثك.' : 'No matching questions found.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
