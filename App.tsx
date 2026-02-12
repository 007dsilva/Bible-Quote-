
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import QuoteCard from './components/QuoteCard';
import ActionPanel from './components/ActionPanel';
import ScheduledList from './components/ScheduledList';
import ScheduleDialog from './components/ScheduleDialog';
import { generateInspiration } from './services/geminiService';
import { AppState, DailyInspiration, ContentType, ScheduledPost } from './types';

const STORAGE_KEY = 'daily_grace_scheduled';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    current: null,
    loading: true,
    error: null,
    history: [],
    scheduledPosts: []
  });

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  // Load scheduled posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(prev => ({ ...prev, scheduledPosts: JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to parse scheduled posts", e);
      }
    }
  }, []);

  // Save scheduled posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.scheduledPosts));
  }, [state.scheduledPosts]);

  const fetchInspiration = useCallback(async (type?: ContentType) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await generateInspiration(type);
      setState(prev => ({
        ...prev,
        current: data,
        loading: false,
        history: [data, ...prev.history].slice(0, 10)
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Failed to fetch. Please try again."
      }));
    }
  }, []);

  useEffect(() => {
    fetchInspiration(ContentType.BIBLE_VERSE);
  }, [fetchInspiration]);

  const handleSchedule = (dateTime: string) => {
    if (!state.current) return;
    
    const newScheduledPost: ScheduledPost = {
      ...state.current,
      id: crypto.randomUUID(),
      scheduledAt: dateTime
    };

    setState(prev => {
      const updated = [...prev.scheduledPosts, newScheduledPost].sort(
        (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );
      return { ...prev, scheduledPosts: updated };
    });
    
    setIsScheduleDialogOpen(false);
  };

  const removeScheduledPost = (id: string) => {
    setState(prev => ({
      ...prev,
      scheduledPosts: prev.scheduledPosts.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
      <Header />
      
      <main className="w-full flex-grow mt-8">
        {state.error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-center text-sm font-medium">
            {state.error}
          </div>
        )}

        {state.current && (
          <QuoteCard inspiration={state.current} loading={state.loading} />
        )}

        <ActionPanel 
          onGenerate={fetchInspiration} 
          onScheduleClick={() => setIsScheduleDialogOpen(true)}
          inspiration={state.current} 
          loading={state.loading} 
        />

        <ScheduledList 
          posts={state.scheduledPosts} 
          onRemove={removeScheduledPost} 
        />

        {state.history.length > 1 && (
          <section className="mt-24 w-full max-w-2xl mx-auto">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Recently Viewed</h2>
            <div className="space-y-4">
              {state.history.slice(1).map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-all cursor-pointer group"
                  onClick={() => setState(prev => ({ ...prev, current: item }))}
                >
                  <p className="text-slate-600 font-serif italic line-clamp-2 mb-2 group-hover:text-slate-900 transition-colors">"{item.content}"</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400">— {item.reference}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-500 uppercase">
                      {item.type === ContentType.BIBLE_VERSE ? 'Verse' : 'Quote'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {isScheduleDialogOpen && state.current && (
        <ScheduleDialog 
          inspiration={state.current} 
          onClose={() => setIsScheduleDialogOpen(false)} 
          onSchedule={handleSchedule}
        />
      )}

      <footer className="mt-20 text-center text-slate-400 text-xs">
        <p>© {new Date().getFullYear()} Daily Grace. Inspired by Truth.</p>
      </footer>
    </div>
  );
};

export default App;
