
import React, { useState } from 'react';
import { DailyInspiration } from '../types';

interface ScheduleDialogProps {
  inspiration: DailyInspiration;
  onClose: () => void;
  onSchedule: (dateTime: string) => void;
}

const ScheduleDialog: React.FC<ScheduleDialogProps> = ({ inspiration, onClose, onSchedule }) => {
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTime) {
      onSchedule(dateTime);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">Schedule Post</h3>
        <p className="text-sm text-slate-500 mb-6">Choose when you want this profound message to be published.</p>
        
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-600 text-sm line-clamp-3">
          "{inspiration.content}"
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date & Time</label>
            <input
              type="datetime-local"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleDialog;
