export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="flex flex-col items-center gap-4">
        {/* Sophisticated spinning loader matching the cosmic theme */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute w-full h-full border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-blue-500 dark:border-cyan-400 rounded-full border-t-transparent dark:border-t-transparent animate-spin"></div>
          
          {/* Inner pulse */}
          <div className="w-4 h-4 bg-blue-500 dark:bg-cyan-400 rounded-full animate-ping"></div>
        </div>
        
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          მიმდინარეობს ჩატვირთვა...
        </p>
      </div>
    </div>
  );
}
