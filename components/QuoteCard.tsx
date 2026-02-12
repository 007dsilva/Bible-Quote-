
import React from 'react';
import { DailyInspiration, ContentType } from '../types';

interface QuoteCardProps {
  inspiration: DailyInspiration;
  loading: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ inspiration, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-xl animate-pulse flex flex-col items-center">
        <div className="h-4 w-3/4 bg-slate-100 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-slate-100 rounded mb-8"></div>
        <div className="h-4 w-1/4 bg-slate-100 rounded"></div>
      </div>
    );
  }

  const isBible = inspiration.type === ContentType.BIBLE_VERSE;

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative glass p-10 md:p-14 rounded-3xl shadow-xl bg-white/80 border border-white/40">
        <div className="flex justify-between items-start mb-8">
          <span className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${isBible ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {isBible ? 'Bible Verse (KJV)' : 'Inspirational Quote'}
          </span>
          <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017C10.4647 12 10.017 11.5523 10.017 11V7C10.017 5.89543 10.9124 5 12.017 5H19.017C20.1216 5 21.017 5.89543 21.017 7V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C8.56937 16 9.01709 15.5523 9.01709 15V9C9.01709 8.44772 8.56937 8 8.01709 8H4.01709C3.46481 8 3.01709 8.44772 3.01709 9V11C3.01709 11.5523 2.56937 12 2.01709 12H0.0170898C-0.535195 12 -0.98291 11.5523 -0.98291 11V7C-0.98291 5.89543 -0.0874805 5 1.01709 5H8.01709C9.12166 5 10.0171 5.89543 10.0171 7V15C10.0171 18.3137 7.33079 21 4.01709 21H3.01709Z" />
          </svg>
        </div>
        
        <blockquote className="mb-10">
          <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-relaxed mb-6">
            "{inspiration.content}"
          </p>
          <cite className="block text-right not-italic">
            <span className="text-xl font-bold text-slate-700">— {inspiration.reference}</span>
          </cite>
        </blockquote>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-slate-500 italic text-sm md:text-base leading-relaxed">
            <span className="font-semibold text-slate-700 not-italic block mb-1">Reflection:</span>
            {inspiration.reflection}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {inspiration.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-indigo-500">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
