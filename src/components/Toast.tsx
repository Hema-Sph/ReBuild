import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgClasses = {
    success: 'bg-emerald-900/95 text-white border-emerald-500/50',
    info: 'bg-sustain-deep/95 text-white border-sustain-forest',
    warning: 'bg-amber-900/95 text-white border-amber-500/50'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md max-w-md text-xs font-medium ${bgClasses[toast.type]}`}
      >
        {icons[toast.type]}
        <div className="leading-snug">{toast.message}</div>
      </div>
    </div>
  );
};
