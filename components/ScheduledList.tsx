
import React from 'react';
import { ScheduledPost, ContentType } from '../types';

interface ScheduledListProps {
  posts: ScheduledPost[];
  onRemove: (id: string) => void;
}

const ScheduledList: React.FC<ScheduledListProps> = ({ posts, onRemove }) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-24 w-full max-w-2xl mx-auto">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        Upcoming Scheduled Posts
      </h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="relative group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${post.type === ContentType.BIBLE_VERSE ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {post.type === ContentType.BIBLE_VERSE ? 'Verse' : 'Quote'}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {new Date(post.scheduledAt).toLocaleString(undefined, { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <button 
                  onClick={() => onRemove(post.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  title="Remove schedule"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-slate-600 font-serif italic line-clamp-2 text-sm">"{post.content}"</p>
            <div className="mt-2 text-xs font-bold text-slate-400">— {post.reference}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduledList;
