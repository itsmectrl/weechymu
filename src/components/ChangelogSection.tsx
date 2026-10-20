import React, { useEffect, useState } from 'react';
import { History, GitCommit, Download, ExternalLink, Calendar, Check, Copy } from 'lucide-react';
import { ReleaseHistoryItem, Language } from '../types';

interface ChangelogSectionProps {
  currentLang: Language;
}

export const ChangelogSection: React.FC<ChangelogSectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';
  const [history, setHistory] = useState<ReleaseHistoryItem[]>([]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/releases-history')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.history) {
          setHistory(data.history);
        }
      })
      .catch((err) => console.warn('Failed to load history:', err));
  }, []);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="changelog" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050506] border-t border-[#242428] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#242428] text-[11px] font-mono text-[#929299] mb-4">
            <span>{isAr ? 'سجل التحديثات' : 'Version History'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7] mb-4">
            {isAr ? 'تطورات مستمرة وتحسينات متواصلة' : 'Changelog & Updates'}
          </h2>
          <p className="text-sm text-[#929299] leading-relaxed">
            {isAr
              ? 'سجل التغييرات الحقيقي المأخوذ من مستودع إصدارات GitHub لسلسلة New Version.'
              : 'Verifiable release log synced with the official GitHub Releases pipeline.'}
          </p>
        </div>

        {/* Timeline of Releases */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-6 before:w-px before:bg-[#242428]">
          {history.map((rel, index) => (
            <div key={rel.releaseTag} className="relative flex items-start gap-4 sm:gap-6">
              {/* Timeline marker node */}
              <div
                className={`relative z-10 w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                  index === 0
                    ? 'bg-[#111114] border-[#B91C35] text-[#B91C35]'
                    : 'bg-[#0A0A0C] border-[#242428] text-[#66666E]'
                }`}
              >
                <GitCommit className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Release Card */}
              <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-[#0A0A0C] border border-[#242428] space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#F5F5F7]">
                      v{rel.versionName}
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111114] border border-[#242428] text-[#929299]">
                      {rel.series}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16161A] border border-[#B91C35]/40 text-[#B91C35]">
                        {isAr ? 'أحدث إصدار' : 'Latest'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#66666E]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{rel.date}</span>
                    <span>• {rel.sizeDisplay}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#929299] leading-relaxed">
                  {rel.notes}
                </p>

                {/* Checksum and Download actions */}
                <div className="pt-3 border-t border-[#242428] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {rel.sha256 && rel.sha256 !== 'Unavailable in manifest' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#66666E] font-mono text-[11px]">SHA-256:</span>
                      <span className="font-mono text-[11px] text-[#929299] truncate max-w-[180px] sm:max-w-xs">
                        {rel.sha256}
                      </span>
                      <button
                        onClick={() => handleCopyHash(rel.sha256)}
                        className="text-[#929299] hover:text-white p-0.5"
                        title="Copy checksum"
                      >
                        {copiedHash === rel.sha256 ? <Check className="w-3 h-3 text-[#B91C35]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-[#66666E]">SHA-256 in release metadata</span>
                  )}

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={rel.apkUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111114] hover:bg-[#B91C35] hover:text-white border border-[#242428] text-xs font-mono text-[#929299] transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>APK</span>
                    </a>
                    <a
                      href={rel.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A0A0C] hover:bg-[#111114] border border-[#242428] text-xs font-mono text-[#66666E] hover:text-[#929299] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Tag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
