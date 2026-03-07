'use client';

import { useState } from 'react';
import ScienceJourneyMap from "@/components/ScienceJourneyMap";
import { Info, Search, MapPin } from "lucide-react";
import { searchTerms } from '@/lib/api';

export default function MapPage() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length > 1) {
      const results = await searchTerms(q);
      setSearchResults(Array.isArray(results) ? results : results.results || []);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-surface/70 border border-foreground/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-primary-blue">
            <Search size={20} />
            <h2 className="text-lg font-semibold text-foreground">თეზაურუსის ძიება</h2>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="მოძებნე ტერმინი..."
            className="w-full bg-surface border border-foreground/15 rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-accent-cyan transition-colors"
          />
          {searchResults.length > 0 && (
            <div className="mt-3 space-y-2">
              {searchResults.map((term: any) => (
                <div key={term.id} className="p-3 bg-surface-light rounded-lg border border-foreground/10">
                  <div className="font-semibold text-sm text-accent-cyan">{term.name_ka}</div>
                  <div className="text-xs text-foreground/50">{term.name_en}</div>
                  <div className="text-xs text-foreground/70 mt-1">{term.definition?.slice(0, 100)}...</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface/70 border border-foreground/10 rounded-2xl p-6 flex-1">
          <div className="flex items-center gap-2 mb-4 text-primary-purple">
            <Info size={20} />
            <h2 className="text-lg font-semibold text-foreground">კვანძის დეტალები</h2>
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent-cyan" />
                <h3 className="text-lg font-bold text-accent-cyan">{selectedNode.label}</h3>
              </div>
              <p className="text-sm text-foreground/80">{selectedNode.description}</p>
              {selectedNode.details && (
                <div className="p-3 bg-surface-light rounded-lg border border-foreground/10">
                  <p className="text-sm text-foreground/70 leading-relaxed">{selectedNode.details}</p>
                </div>
              )}
              <div className="text-xs text-foreground/50">
                ტიპი: {selectedNode.group === 1 ? 'დასაწყისი' : selectedNode.group === 2 ? 'სკოლა' : selectedNode.group === 3 ? 'ბაკალავრიატი' : selectedNode.group === 4 ? 'მაგისტრატურა' : selectedNode.group === 5 ? 'PhD' : 'კარიერა'}
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground/60 leading-relaxed">
              აირჩიე კვანძი რუკაზე, რათა ნახო დეტალური აღწერა.
            </p>
          )}
        </div>
      </aside>

      <section className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 cosmic-heading text-center md:text-left">
          სამეცნიერო მოგზაურობის რუკა
        </h1>
        <div className="flex-1 min-h-[600px] w-full relative">
          <ScienceJourneyMap onNodeSelect={setSelectedNode} />
        </div>
      </section>
    </div>
  );
}