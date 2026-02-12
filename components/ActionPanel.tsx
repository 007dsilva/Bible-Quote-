
import React from 'react';
import { ContentType, DailyInspiration } from '../types';

interface ActionPanelProps {
  onGenerate: (type?: ContentType) => void;
  onScheduleClick: () => void;
  inspiration: DailyInspiration | null;
  loading: boolean;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onGenerate, onScheduleClick, inspiration, loading }) => {
  const handleShare = () => {
    if (!inspiration) return;
    
    const text = `"${inspiration.content}" — ${inspiration.reference}\n\n${inspiration.reflection}\n\n${inspiration.tags.map(t => `#${t}`).join(' ')}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleCopy = () => {
    if (!inspiration) return;
    const text = `"${inspiration.content}" — ${inspiration.reference}\n\n${inspiration.reflection}\n\n${inspiration.tags.map(t => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => onGenerate(ContentType.BIBLE_VERSE)}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Get Bible Verse
        </button>
        <button 
          onClick={() => onGenerate(ContentType.INSPIRATIONAL_QUOTE)}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Wisdom Quote
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
        <button
          onClick={handleCopy}
          disabled={!inspiration || loading}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 text-white rounded-2xl font-semibold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:shadow-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </button>
        <button
          onClick={onScheduleClick}
          disabled={!inspiration || loading}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm disabled:opacity-50 disabled:shadow-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule
        </button>
        <button
          onClick={handleShare}
          disabled={!inspiration || loading}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-4 bg-[#1DA1F2] text-white rounded-2xl font-semibold hover:bg-[#1a8cd8] transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Post to X
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
