export interface ReleaseData {
  series: string;
  channel: string;
  versionCode: number;
  versionName: string;
  displayName: string;
  tag: string;
  releaseTag: string;
  apkUrl: string;
  pageUrl: string;
  sha256: string;
  sizeBytes?: number;
  sizeDisplay?: string;
  minAndroid?: string;
  isMandatory?: boolean;
  notes?: string;
}

export interface ReleaseHistoryItem {
  versionName: string;
  versionCode: number;
  series: string;
  releaseTag: string;
  date: string;
  notes: string;
  apkUrl: string;
  pageUrl: string;
  sha256: string;
  sizeDisplay: string;
}

export type Language = 'en' | 'ar';

export interface ScreenshotItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  src: string;
  badgeEn: string;
  badgeAr: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: 'general' | 'audio' | 'lyrics' | 'privacy' | 'install';
}
