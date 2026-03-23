/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { getResources, getSkills } from '@/lib/api';
import type { ResourceCategory, Skill } from '@/lib/mockData';
import { BookOpen, GraduationCap, Wrench, Newspaper, ExternalLink, Globe } from 'lucide-react';

export default function ResourcesPage() {
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    (async () => { 
      try {
        const [resData, skillData] = await Promise.all([getResources(), getSkills()]);
        setCategories(resData); 
        setSkills(skillData); 
      } catch (err) {
        setError("მონაცემების ჩამოტვირთვა ვერ მოხერხდა.");
      } finally {
        setLoading(false);
      }
    })(); 
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="academic-title">უნარები & რესურსები</h1>
      <p className="academic-subtitle">მეცნიერისთვის საჭირო უნარები და საუკეთესო რესურსები სწავლისთვის.</p>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-2xl text-center max-w-lg mx-auto">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-accent-cyan/20 rounded-lg flex items-center justify-center text-accent-cyan"><GraduationCap size={20} /></span>
              კვლვევისთვის საჭირო უნარები
            </h2>
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill.id} className="p-6 bg-surface/70 border border-foreground/10 rounded-2xl hover:border-accent-cyan/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent-cyan transition-colors">{skill.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 bg-accent-cyan/15 text-accent-cyan rounded-full font-bold uppercase tracking-wider">{skill.level}</span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary-blue/20 rounded-lg flex items-center justify-center text-primary-blue"><BookOpen size={20} /></span>
              რესურსების ბიბლიოთეკა
            </h2>
            <div className="space-y-8">
              {categories.map(cat => (
                <div key={cat.id}>
                  <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4 pl-1">{cat.title}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {cat.items.map(item => (
                      <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                        className="p-4 bg-surface/50 border border-foreground/5 rounded-xl hover:bg-surface-light hover:border-primary-blue/30 transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-foreground/40 group-hover:text-primary-blue transition-colors">
                            <Globe size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-all">{item.title}</span>
                        </div>
                        <ExternalLink size={14} className="text-foreground/20 group-hover:text-primary-blue transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
