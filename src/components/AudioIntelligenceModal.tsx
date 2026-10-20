import React, { useState } from 'react';
import { X, Sliders, Send, Headphones, Music, FileAudio, Check, Copy, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface AudioIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

const SAMPLE_QUERIES = [
  {
    icon: Headphones,
    titleEn: 'Headphone EQ Tuning',
    titleAr: 'تعديل المعادل للسماعات',
    prompt: 'What are the exact recommended 10-band EQ gain settings (dB values for 31Hz through 16kHz) for Sony WH-1000XM5 / Sennheiser to achieve a neutral Harman target curve in Weechy?',
  },
  {
    icon: FileAudio,
    titleEn: 'FLAC vs Opus vs AAC',
    titleAr: 'مقارنة ترميز FLAC و Opus',
    prompt: 'Analyze FLAC 24-bit/96kHz lossless vs Opus 160kbps vs MP3 320kbps: how does the Android Audio HAL resample them and what are the perceptual trade-offs?',
  },
  {
    icon: Music,
    titleEn: 'LRC Timestamp Drift Correction',
    titleAr: 'تصحيح تزامن ملفات LRC',
    prompt: 'How does Weechy’s layered lyrics engine resolve timestamps, and how do I format .lrc tags to eliminate millisecond drift on live tracks?',
  },
];

export const AudioIntelligenceModal: React.FC<AudioIntelligenceModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const isAr = currentLang === 'ar';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (promptText: string) => {
    if (!promptText.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/audio-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: promptText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze acoustic query');
      }

      setResponse(data.reply);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to acoustic advisor');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#111114] border border-[#242428] rounded-2xl p-6 sm:p-8 shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#66666E] hover:text-[#F5F5F7] hover:bg-[#16161A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#0A0A0C] border border-[#242428] text-[#B91C35]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#F5F5F7]">
                {isAr ? 'مستشار هندسة الصوتيات والمعادل' : 'Acoustic & EQ Advisor'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16161A] border border-[#242428] text-[#929299]">
                DSP Analysis
              </span>
            </div>
            <p className="text-xs text-[#66666E] font-mono mt-0.5">
              Calibrations grounded in Android audio architecture and 10-band DSP
            </p>
          </div>
        </div>

        {/* Query Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(query);
          }}
          className="mb-5"
        >
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'اسأل عن ضبط ترددات المعادل لسماعاتك أو مقارنة صيغ الصوت Lossless و LRC...'
                  : 'Ask about 10-band EQ curves for your headphones, audio codecs, or .lrc timing...'
              }
              rows={3}
              className="w-full bg-[#050506] border border-[#242428] focus:border-[#B91C35] rounded-xl p-3.5 text-xs sm:text-sm text-[#F5F5F7] placeholder-[#66666E] focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#B91C35] hover:bg-[#D12A43] disabled:opacity-40 disabled:hover:bg-[#B91C35] text-white transition-colors"
              title="Submit query"
              aria-label="Submit query"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Suggested Queries */}
        {!response && !loading && (
          <div className="space-y-2 mb-4">
            <div className="text-[11px] font-mono text-[#66666E] uppercase tracking-wider">
              {isAr ? 'نماذج استفسارات صوتية مقترحة:' : 'Suggested Acoustic Queries:'}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_QUERIES.map((sample, idx) => {
                const Icon = sample.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(sample.prompt);
                      handleSubmit(sample.prompt);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0C] hover:bg-[#16161A] border border-[#242428] text-left transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-[#66666E] group-hover:text-[#B91C35] shrink-0" />
                    <div className="text-xs text-[#929299] group-hover:text-[#F5F5F7] leading-snug">
                      <strong className="block text-[11px] text-[#66666E] font-mono mb-0.5">
                        {isAr ? sample.titleAr : sample.titleEn}
                      </strong>
                      {sample.prompt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="p-8 rounded-xl bg-[#050506] border border-[#242428] flex flex-col items-center justify-center space-y-2.5 text-center">
            <div className="w-6 h-6 border-2 border-[#B91C35] border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-mono text-[#F5F5F7]">
              {isAr ? 'جاري حساب المعايرة الصوتية...' : 'Calculating acoustic DSP parameters...'}
            </div>
            <div className="text-[11px] font-mono text-[#66666E]">
              Grounded in 10-band hardware equalizer specifications
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-[#4A0B15]/40 border border-[#B91C35] text-xs text-[#F5F5F7] flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-[#D12A43] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formatted Response Box */}
        {response && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#929299]">
                {isAr ? 'توصيات خبير الصوتيات:' : 'Acoustic Specialist Recommendation:'}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-mono text-[#929299] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-[#B91C35]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#050506] border border-[#242428] max-h-80 overflow-y-auto text-xs sm:text-sm text-[#929299] leading-relaxed whitespace-pre-line font-sans">
              {response}
            </div>

            <button
              onClick={() => {
                setResponse(null);
                setQuery('');
              }}
              className="text-xs font-mono text-[#66666E] hover:text-[#929299] transition-colors"
            >
              ← {isAr ? 'طرح سؤال آخر' : 'Ask another question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
