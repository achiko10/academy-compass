/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { getMapNodes, getMapEdges } from '@/lib/api';

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
  description: string;
  details?: string;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  source: string | D3Node;
  target: string | D3Node;
  label?: string;
}

// Updated cosmic colors matching CosmicMap
const COLORS = ['#0ea5e9', '#8b5cf6', '#fcd34d', '#10b981', '#f43f5e'];

export default function ScienceJourneyMap({ onNodeSelect }: { onNodeSelect?: (node: any) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [allNodes, setAllNodes] = useState<D3Node[]>([]);
  const [allEdges, setAllEdges] = useState<any[]>([]);
  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const nodes = await getMapNodes();
        const edges = await getMapEdges();
        setAllNodes(nodes);
        setAllEdges(edges);
        if (nodes.length > 0) setVisibleNodeIds(new Set([nodes[0].id]));
      } catch (err) {
        setError("რუკის მონაცემების ჩამოტვირთვა ვერ მოხერხდა.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    const node = allNodes.find(n => n.id === nodeId);
    onNodeSelect?.(node || null);
    setSelectedId(nodeId);
    const newVisible = new Set(visibleNodeIds);
    allEdges.forEach((e: any) => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      if (src === nodeId) newVisible.add(tgt);
    });
    setVisibleNodeIds(newVisible);
  }, [allNodes, allEdges, visibleNodeIds, onNodeSelect]);

  const reset = useCallback(() => {
    if (allNodes.length > 0) {
      setVisibleNodeIds(new Set([allNodes[0].id]));
      setSelectedId(null);
      onNodeSelect?.(null);
    }
  }, [allNodes, onNodeSelect]);

  useEffect(() => {
    if (!svgRef.current || allNodes.length === 0 || visibleNodeIds.size === 0) return;

    const visibleNodes = allNodes.filter(n => visibleNodeIds.has(n.id));
    const visibleEdges = allEdges.filter((e: any) => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return visibleNodeIds.has(src) && visibleNodeIds.has(tgt);
    });

    const width = 900, height = 560;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", [0, 0, width, height] as any);

    const defs = svg.append("defs");
    
    // Modern multi-layered glow filter
    const f = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    f.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur1");
    f.append("feGaussianBlur").attr("stdDeviation", "8").attr("result", "blur2");
    const fm = f.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur2");
    fm.append("feMergeNode").attr("in", "blur1");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    const d3Nodes: D3Node[] = visibleNodes.map(n => ({ ...n }));
    const d3Links: D3Link[] = visibleEdges.map((e: any) => ({ ...e }));

    const hasChildren = (id: string) => allEdges.some((e: any) => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return src === id && !visibleNodeIds.has(tgt);
    });

    const sim = d3.forceSimulation(d3Nodes)
      .force("link", d3.forceLink(d3Links).id((d: any) => d.id).distance(180))
      .force("charge", d3.forceManyBody().strength(-600))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(70));

    // Links
    const link = svg.append("g").selectAll("line").data(d3Links).join("line")
      .attr("stroke", "#334155").attr("stroke-width", 2)
      .attr("stroke-dasharray", (d: any) => d.label ? "5 5" : "none")
      .attr("opacity", 0.6);

    const linkLabels = svg.append("g").selectAll("text")
      .data(d3Links.filter((l: any) => l.label)).join("text")
      .text((d: any) => d.label)
      .attr("fill", "#64748b").attr("font-size", "11px").attr("text-anchor", "middle");

    // Node groups
    const nodeG = svg.append("g").selectAll("g").data(d3Nodes).join("g")
      .attr("cursor", "pointer")
      .on("click", (_, d) => handleNodeClick(d.id))
      .call(d3.drag<SVGGElement, D3Node>()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }) as any);

    // Dynamic scale out circle
    nodeG.append("circle")
      .attr("r", d => d.id === selectedId ? 30 : 22)
      .attr("fill", d => COLORS[(d.group - 1) % COLORS.length])
      .attr("fill-opacity", 0.15)
      .attr("stroke", "none");

    // Main Circle
    nodeG.append("circle")
      .attr("r", d => d.id === selectedId ? 22 : 18)
      .attr("fill", d => COLORS[(d.group - 1) % COLORS.length])
      .attr("fill-opacity", 0.95)
      .attr("stroke", d => d.id === selectedId ? "#fff" : "rgba(255,255,255,0.2)")
      .attr("stroke-width", d => d.id === selectedId ? 3.5 : 1.5)
      .attr("filter", "url(#glow)")
      .style("transition", "all 0.3s ease");

    // Expandable indicator
    nodeG.filter(d => hasChildren(d.id))
      .append("circle")
      .attr("cx", 16).attr("cy", -16).attr("r", 7)
      .attr("fill", "#0ea5e9").attr("stroke", "#020617").attr("stroke-width", 2.5);

    nodeG.filter(d => hasChildren(d.id))
      .append("text")
      .attr("x", 16).attr("y", -16)
      .attr("text-anchor", "middle").attr("dy", "0.35em")
      .attr("font-size", "11px").attr("font-weight", "bold")
      .attr("fill", "#020617").attr("pointer-events", "none")
      .text("+");

    // Label with elegant typography
    nodeG.append("text")
      .attr("x", 32).attr("dy", "0.35em")
      .text(d => d.label)
      .attr("fill", d => d.id === selectedId ? "#38bdf8" : "#f1f5f9")
      .attr("font-size", "14px").attr("font-weight", "600")
      .attr("pointer-events", "none")
      .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)");

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
      linkLabels
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2 - 10);
      nodeG.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => { sim.stop(); };
  }, [allNodes, allEdges, visibleNodeIds, selectedId]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl border border-slate-200/50 dark:border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:via-[#060c18] dark:to-black transition-colors">
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-cyan-300 drop-shadow-sm">ინტერაქტიული აკადემიური რუკა</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">დააკლიკე კვანძს გასაშლელად</p>
        </div>
        <button 
          onClick={reset} 
          className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <span className="mr-1">↺</span> თავიდან
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100/80 dark:bg-[#020617]/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100/90 dark:bg-[#020617]/90 backdrop-blur-sm px-6 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-6 rounded-2xl max-w-lg shadow-xl">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}