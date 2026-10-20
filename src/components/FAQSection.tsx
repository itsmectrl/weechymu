import React, { useState, useId } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../config/site';
import { Language } from '../types';

interface FAQSectionProps {
  currentLang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
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
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] border-t border-[#242428] relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'كل ما تود معرفته عن ويتشي' : 'Direct Facts & Answers'}
          </h2>
          <p className="text-sm text-[#929299] leading-relaxed">
            {isAr
              ? 'إجابات واضحة وحقيقية على الأسئلة التقنية والتشغيلية دون وعود تسويقية زائفة.'
              : 'Direct details regarding playback mechanics, lyrics synchronization, format decoders, and privacy.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-[#66666E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث في الأسئلة الشائعة...' : 'Search questions or topics...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111114] border border-[#242428] focus:border-[#B91C35] text-xs sm:text-sm text-[#F5F5F7] placeholder-[#66666E] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                  activeCategory === cat.id
                    ? 'bg-[#16161A] text-white border-[#2F2F35]'
                    : 'bg-[#111114] text-[#66666E] hover:text-[#929299] border-[#242428]'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5">
          {filteredItems.map((item, index) => {
            const isOpen = openIds.includes(item.id);
            const questionText = isAr ? item.questionAr : item.questionEn;
            const answerText = isAr ? item.answerAr : item.answerEn;
            const contentId = `${baseId}-faq-content-${index}`;
            const headerId = `${baseId}-faq-header-${index}`;

            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#111114] border border-[#242428] overflow-hidden transition-colors"
              >
                <button
                  id={headerId}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#F5F5F7] leading-snug">
                    {questionText}
                  </span>
                  <div
                    className={`p-1 text-[#66666E] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B91C35]' : ''
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
                    className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#929299] leading-relaxed border-t border-[#242428]/40"
                  >
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-xs text-[#66666E]">
              {isAr ? 'لم يتم العثور على نتائج تطابق بحثك.' : 'No matching questions found.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
