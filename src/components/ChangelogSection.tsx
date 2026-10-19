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
    <section id="changelog" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#08090B] border-t border-[#27292F] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121418] border border-[#27292F] text-xs font-mono text-[#D8D9DE] mb-3">
            <History className="w-3.5 h-3.5 text-[#C41E3A]" />
            <span>{isAr ? 'سجل التحديثات' : 'Authoritative Version History'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-4">
            {isAr ? 'تطورات مستمرة وتحسينات متواصلة' : 'Changelog & Release Notes'}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {isAr
              ? 'سجل التغييرات الحقيقي المأخوذ من مستودع إصدارات GitHub لسلسلة New Version.'
              : 'Verifiable release log synced with the official GitHub Releases pipeline for the New Version series.'}
          </p>
        </div>

        {/* Timeline of Releases */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-[#27292F]">
          {history.map((rel, index) => (
            <div key={rel.releaseTag} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Timeline marker node */}
              <div
                className={`relative z-10 w-10 sm:w-16 h-10 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                  index === 0
                    ? 'bg-[#191C21] border-[#C41E3A] text-[#C41E3A] shadow-lg shadow-[#C41E3A]/20'
                    : 'bg-[#121418] border-[#27292F] text-[#8A8D96]'
                }`}
              >
                <GitCommit className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Release Card */}
              <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-[#0D0E11] border border-[#27292F] hover:border-[#363841] transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold text-white">
                      v{rel.versionName}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#191C21] border border-[#27292F] text-[#D8D9DE]">
                      {rel.series}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C41E3A]/20 border border-[#C41E3A]/50 text-[#E02A46]">
                        {isAr ? 'أحدث إصدار' : 'Latest'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#777982]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{rel.date}</span>
                    <span>• {rel.sizeDisplay}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {rel.notes}
                </p>

                {/* Checksum and Download actions */}
                <div className="pt-3 border-t border-[#27292F]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {rel.sha256 && rel.sha256 !== 'Unavailable in manifest' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#777982] font-mono text-[11px]">SHA-256:</span>
                      <span className="font-mono text-[11px] text-[#D8D9DE] truncate max-w-[180px] sm:max-w-xs">
                        {rel.sha256}
                      </span>
                      <button
                        onClick={() => handleCopyHash(rel.sha256)}
                        className="text-[#C41E3A] hover:text-[#E02A46] p-1"
                        title="Copy checksum"
                      >
                        {copiedHash === rel.sha256 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-[#777982]">SHA-256 recorded in release tag</span>
                  )}

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={rel.apkUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191C21] hover:bg-[#C41E3A] hover:text-white border border-[#27292F] text-xs font-mono text-[#D8D9DE] transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>APK</span>
                    </a>
                    <a
                      href={rel.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121418] hover:bg-[#191C21] border border-[#27292F] text-xs font-mono text-[#777982] hover:text-white transition-colors"
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
