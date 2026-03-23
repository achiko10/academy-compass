'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { useAppContext } from '@/components/GlobalProvider';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useAppContext();

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-red-200 dark:border-red-900/50 shadow-2xl rounded-3xl p-8 text-center flex flex-col items-center gap-6 relative overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="h-16 w-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
          <AlertCircle size={32} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            ფიქსირდება შეცდომა სერვერთან
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 whitespace-pre-wrap">
            {error.message || "კავშირი სისტემასთან დროებით შეფერხებულია. გთხოვთ, სცადოთ მოგვიანებით."}
          </p>
        </div>

        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl font-medium transition-colors shadow-sm"
        >
          <RefreshCcw size={16} />
          <span>თავიდან ცდა</span>
        </button>
      </div>
    </div>
  );
}
