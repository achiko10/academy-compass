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

const COLORS = ['#a855f7','#3b82f6','#10b981','#f59e0b','#ef4444','#6366f1'];

export default function ScienceJourneyMap({ onNodeSelect }: { onNodeSelect?: (node: any) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [allNodes, setAllNodes] = useState<D3Node[]>([]);
  const [allEdges, setAllEdges] = useState<any[]>([]);
  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const nodes = await getMapNodes();
      const edges = await getMapEdges();
      setAllNodes(nodes);
      setAllEdges(edges);
      if (nodes.length > 0) setVisibleNodeIds(new Set([nodes[0].id]));
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
    const f = defs.append("filter").attr("id", "glow");
    f.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "blur");
    const fm = f.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    const d3Nodes: D3Node[] = visibleNodes.map(n => ({ ...n }));
    const d3Links: D3Link[] = visibleEdges.map((e: any) => ({ ...e }));

    const hasChildren = (id: string) => allEdges.some((e: any) => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return src === id && !visibleNodeIds.has(tgt);
    });

    const sim = d3.forceSimulation(d3Nodes)
      .force("link", d3.forceLink(d3Links).id((d: any) => d.id).distance(160))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(60));

    // Links
    const link = svg.append("g").selectAll("line").data(d3Links).join("line")
      .attr("stroke", "#1e3a5f").attr("stroke-width", 2)
      .attr("stroke-dasharray", (d: any) => d.label ? "6 3" : "none");

    const linkLabels = svg.append("g").selectAll("text")
      .data(d3Links.filter((l: any) => l.label)).join("text")
      .text((d: any) => d.label)
      .attr("fill", "#475569").attr("font-size", "10px").attr("text-anchor", "middle");

    // Node groups
    const nodeG = svg.append("g").selectAll("g").data(d3Nodes).join("g")
      .attr("cursor", "pointer")
      .on("click", (_, d) => handleNodeClick(d.id))
      .call(d3.drag<SVGGElement, D3Node>()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }) as any);

    // Circle
    nodeG.append("circle")
      .attr("r", d => d.id === selectedId ? 24 : 20)
      .attr("fill", d => COLORS[(d.group - 1) % COLORS.length])
      .attr("fill-opacity", 0.85)
      .attr("stroke", d => d.id === selectedId ? "#fff" : "rgba(255,255,255,0.3)")
      .attr("stroke-width", d => d.id === selectedId ? 3 : 1.5)
      .attr("filter", "url(#glow)");

    // "+" dot for expandable
    nodeG.filter(d => hasChildren(d.id))
      .append("circle")
      .attr("cx", 14).attr("cy", -14).attr("r", 6)
      .attr("fill", "#22d3ee").attr("stroke", "#060d1a").attr("stroke-width", 2);

    nodeG.filter(d => hasChildren(d.id))
      .append("text")
      .attr("x", 14).attr("y", -14)
      .attr("text-anchor", "middle").attr("dy", "0.35em")
      .attr("font-size", "10px").attr("font-weight", "bold")
      .attr("fill", "#060d1a").attr("pointer-events", "none")
      .text("+");

    // Label
    nodeG.append("text")
      .attr("x", 28).attr("dy", "0.35em")
      .text(d => d.label)
      .attr("fill", d => d.id === selectedId ? "#22d3ee" : "#e2e8f0")
      .attr("font-size", "13px").attr("font-weight", "600")
      .attr("pointer-events", "none");

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
      linkLabels
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2 - 8);
      nodeG.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => { sim.stop(); };
  }, [allNodes, allEdges, visibleNodeIds, selectedId]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl border border-foreground/10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
      <div className="absolute top-4 left-6 right-6 z-10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-cyan-300">ინტერაქტიული აკადემიური რუკა</h3>
          <p className="text-xs text-slate-500">დააკლიკე კვანძს გასაშლელად</p>
        </div>
        <button onClick={reset} className="text-xs text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500 px-3 py-1.5 rounded-lg transition-all">
          ↺ თავიდან
        </button>
      </div>
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}