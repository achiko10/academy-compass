'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '@/lib/api';
import type { Article } from '@/lib/mockData';
import { Microscope, Beaker, Cpu, Leaf, Globe, Search, PenTool } from 'lucide-react';

const iconMap: Record<string, any> = {
  Microscope: <Microscope size={24} />,
  Beaker: <Beaker size={24} />,
  Cpu: <Cpu size={24} />,
  Leaf: <Leaf size={24} />,
  Globe: <Globe size={24} />,
  Search: <Search size={24} />,
  PenTool: <PenTool size={24} />,
};

const colorMap: Record<string, string> = {
  blue: "text-sky-400 bg-sky-400/15",
  green: "text-emerald-400 bg-emerald-400/15",
  purple: "text-purple-400 bg-purple-400/15",
  red: "text-rose-400 bg-rose-400/15",
};

export default function SciencePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);

  useEffect(() => {
    (async () => { setArticles(await getArticles()); })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center cosmic-heading">
        რა არის მეცნიერება?
      </h1>
      <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-16">
        აღმოაჩინე მეცნიერების ისტორია, უდიდესი აღმოჩენები და მათი გავლენა ჩვენს ყოველდღიურ ცხოვრებაზე.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelected(selected?.id === article.id ? null : article)}
            className={`p-6 rounded-2xl bg-surface/70 border transition-all cursor-pointer ${
              selected?.id === article.id ? 'border-accent-cyan/60 ring-1 ring-accent-cyan/30' : 'border-foreground/10 hover:border-foreground/20'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[article.color] || colorMap.blue}`}>
              {iconMap[article.icon] || <Beaker size={24} />}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-cyan/70 mb-2">{article.category}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{article.title}</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">{article.content.slice(0, 120)}...</p>
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {article.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-accent-cyan/15 text-accent-cyan rounded-full">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-surface/80 border border-accent-cyan/30 rounded-3xl p-8 mb-12">
          <div className="text-xs text-accent-cyan/60 uppercase tracking-wider mb-2">{selected.category}</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">{selected.title}</h2>
          <div className="text-foreground/80 leading-relaxed whitespace-pre-line">{selected.content}</div>
        </div>
      )}
    </div>
  );
}
