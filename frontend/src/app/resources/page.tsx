'use client';

import { useEffect, useState } from 'react';
import { getResources, getSkills } from '@/lib/api';
import type { Resource, Skill } from '@/lib/mockData';
import { BookOpen, GraduationCap, Wrench, Newspaper, ExternalLink } from 'lucide-react';

const typeIcons: Record<string, any> = { book: <BookOpen size={18} />, course: <GraduationCap size={18} />, journal: <Newspaper size={18} />, tool: <Wrench size={18} /> };
const typeLabels: Record<string, string> = { book: 'წიგნი', course: 'კურსი', journal: 'ჟურნალი', tool: 'ინსტრუმენტი' };

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => { (async () => { setResources(await getResources()); setSkills(await getSkills()); })(); }, []);
  const filteredResources = filter === 'all' ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center cosmic-heading">უნარები & რესურსები</h1>
      <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-16">მეცნიერისთვის საჭირო უნარები და საუკეთესო რესურსები სწავლისთვის.</p>

      <h2 className="text-2xl font-bold text-foreground mb-6">კვლევისთვის საჭირო უნარები</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {skills.map(skill => (
          <div key={skill.id} className="p-6 bg-surface/70 border border-foreground/10 rounded-2xl hover:border-accent-cyan/30 transition-colors">
            <h3 className="text-lg font-bold text-accent-cyan mb-2">{skill.name}</h3>
            <p className="text-sm text-foreground/70 mb-4">{skill.description}</p>
            <div className="space-y-1">{skill.resources.map((r, i) => (<div key={i} className="text-xs text-primary-blue">→ {r}</div>))}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4">რესურსების ბიბლიოთეკა</h2>
      <div className="flex gap-2 mb-8 flex-wrap">
        {['all', 'book', 'course', 'journal', 'tool'].map(type => (
          <button key={type} onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === type ? 'bg-accent-cyan text-primary-dark' : 'bg-surface-light text-foreground/70 hover:bg-surface'}`}>
            {type === 'all' ? 'ყველა' : typeLabels[type]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map(resource => (
          <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer"
            className="p-5 bg-surface/70 border border-foreground/10 rounded-2xl hover:border-primary-blue/40 transition-all group flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-blue/20 flex items-center justify-center text-primary-blue flex-shrink-0">{typeIcons[resource.type]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><h3 className="font-semibold text-foreground group-hover:text-accent-cyan transition-colors">{resource.title}</h3><ExternalLink size={12} className="text-foreground/30" /></div>
              <div className="text-xs text-foreground/50 mb-1">{typeLabels[resource.type]}</div>
              <p className="text-sm text-foreground/70">{resource.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
