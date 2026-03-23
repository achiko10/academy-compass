'use client';

import Link from 'next/link';
import { Telescope, Globe, Brain, Users } from 'lucide-react';
import CosmicMap from '@/components/CosmicMap';
import { useAppContext } from '@/components/GlobalProvider';

const features = [
  { icon: <Telescope size={18} />, labelKey: 'science', href: '/science' },
  { icon: <Globe size={18} />, labelKey: 'map', href: '/map' },
  { icon: <Brain size={18} />, labelKey: 'test', href: '/quiz' },
  { icon: <Users size={18} />, labelKey: 'community', href: '/community' },
];

export default function Home() {
  const { t } = useAppContext();

  return (
    // Fills exactly the viewport below the header, no scroll
    <div
      className="w-full flex items-stretch bg-slate-50 dark:bg-slate-900 h-[calc(100dvh-64px)] transition-colors"
    >
      {/* ── LEFT PANEL (fixed width, equal internal padding) ─── */}
      <aside className="w-64 shrink-0 flex flex-col justify-start gap-6 p-6 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-colors">
        {/* Title block */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug whitespace-pre-line">
            {t('heroTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
            {t('heroSub')}
          </p>
        </div>

        {/* Feature links */}
        <nav className="flex flex-col gap-2.5">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-300 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium text-sm transition-all group"
            >
              <span className="text-blue-500 group-hover:scale-110 transition-transform shrink-0">
                {f.icon}
              </span>
              {t(f.labelKey)}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ── MAP AREA (equal padding on all 4 sides) ─────────── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        {/* Map box — equal margin from all edges of the right panel */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
          {/* 3D Canvas with overlay */}
          <CosmicMap />
        </div>
      </div>
    </div>
  );
}
