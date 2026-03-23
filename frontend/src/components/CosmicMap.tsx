/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useRouter } from 'next/navigation';
import { getMapNodes } from '@/lib/api';

// ─────────────────────────────────────────────────────────
// DATA: STRIPPED ACADEMIC WAYPOINTS (No Text Labels)
// ─────────────────────────────────────────────────────────
type WaypointData = {
  id: string; color: string; rgb: string; x: number; y: number; z: number; childrenCount: number;
};

// ─────────────────────────────────────────────────────────
// TEXTURE GENERATORS (Zero Dependency)
// ─────────────────────────────────────────────────────────
function makeGlowTex(rgb: string): THREE.Texture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, `rgba(${rgb}, 1)`);
  g.addColorStop(0.2, `rgba(${rgb}, 0.5)`);
  g.addColorStop(0.5, `rgba(${rgb}, 0.1)`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

// ─────────────────────────────────────────────────────────
// REACT COMPONENT
// ─────────────────────────────────────────────────────────
export default function CosmicMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const apiRef = useRef<{ goBack: () => void }>({ goBack: () => {} });
  const router = useRouter();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let waypointsDyn: WaypointData[] = [];
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const initScene = async () => {
      try {
        const nodes = await getMapNodes();
        const baseColors = [
          { color: '#fcd34d', rgb: '252,211,77' }, // Gold
          { color: '#8b5cf6', rgb: '139,92,246' }, // Deep Purple
          { color: '#0ea5e9', rgb: '14,165,233' }, // Cyan Blue
          { color: '#10b981', rgb: '16,185,129' }, // Emerald
          { color: '#f43f5e', rgb: '244,63,94' }  // Rose
        ];

        // Map up to 20 nodes for the 3D galaxy visualization
        waypointsDyn = nodes.slice(0, 20).map((n: any, i: number) => {
          // Create a visually pleasing spiral distribution
          const angle = i * 2.4;
          const radius = i === 0 ? 0 : 40 + i * 12;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 20;
          const c = baseColors[i % baseColors.length];
          return {
            id: n.id,
            color: c.color,
            rgb: c.rgb,
            x, y, z,
            childrenCount: Math.floor(Math.random() * 3) + 2
          };
        });
        
        if (waypointsDyn.length === 0) {
          // Fallback if no nodes
          waypointsDyn = [
            { id: 'root', color: '#fcd34d', rgb: '252,211,77', x: 0, y: 0, z: 0, childrenCount: 3 },
            { id: 'uni', color: '#8b5cf6', rgb: '139,92,246', x: 70, y: 5, z: -50, childrenCount: 4 },
            { id: 'life', color: '#f43f5e', rgb: '244,63,94', x: -100, y: -5, z: 80, childrenCount: 4 },
            { id: 'career', color: '#10b981', rgb: '16,185,129', x: 120, y: 10, z: 120, childrenCount: 4 },
          ];
        }
      } catch (e) {
        console.error("Failed to fetch Map nodes for CosmicMap:", e);
      }
    };

    // 1. ENGINE SETUP
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Transparent background allowing container CSS (dark mode compliant)
    renderer.setClearColor(0x000000, 0); 
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0020); // slightly thinner fog for better star visibility

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 2000);
    
    // Default global view
    const GLOBAL_POS = new THREE.Vector3(0, 180, 280); 
    const GLOBAL_LOOK = new THREE.Vector3(0, 0, 0);
    camera.position.copy(GLOBAL_POS);
    camera.lookAt(GLOBAL_LOOK);

    // 2. GALAXY GENERATION (Fermat's Spiral)
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    const pCount = 25000; // Increased particle count for deeper look
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const pSize = new Float32Array(pCount); // specific sizes for twinkling mapping
    const baseParticlesScales: number[] = [];

    const c1 = new THREE.Color('#0ea5e9'); // Cyan core
    const c2 = new THREE.Color('#8b5cf6'); // Purple mid
    const c3 = new THREE.Color('#0f172a'); // Very dark rim edges
    
    for (let i = 0; i < pCount; i++) {
        const radius = Math.sqrt(i) * 2.2;
        const angle = i * 0.137508 + (Math.random() - 0.5) * 0.5; // golden angle + noise
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Flattens out towards edges, bulges in center
        const yDist = Math.max(0, 60 - radius * 0.2); 
        const y = (Math.random() - 0.5) * yDist * (Math.random() > 0.5 ? 1 : -1);

        pPos[i*3] = x;
        pPos[i*3+1] = y;
        pPos[i*3+2] = z;

        const mix = Math.min(1, radius / 250);
        const col = c1.clone().lerp(c2, mix).lerp(c3, Math.random() * 0.7);
        pCol[i*3] = col.r; pCol[i*3+1] = col.g; pCol[i*3+2] = col.b;
        
        const initSize = Math.random() * 2.5 + 1.0;
        pSize[i] = initSize;
        baseParticlesScales.push(initSize);
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    pGeo.setAttribute('size', new THREE.BufferAttribute(pSize, 1));

    // Refined custom shader points for independent twinkling
    const pMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    
    const galaxyMesh = new THREE.Points(pGeo, pMat);
    galaxyGroup.add(galaxyMesh);

    // 3. THE WAYPOINTS (Interactive Stars)
    const hitboxGroup = new THREE.Group(); 
    scene.add(hitboxGroup);
    
    const waypointsMeshes: { id: string, core: THREE.Mesh, glow: THREE.Sprite, zBase: number, phase: number }[] = [];
    type OrbitingChild = { mesh: THREE.Group, angle: number, speed: number, radius: number, tilt: number };
    const journeyObjects: { group: THREE.Group, children: OrbitingChild[] }[] = [];

    const buildWaypoints = () => {
        waypointsDyn.forEach((wp) => {
            const wpGroup = new THREE.Group();
            wpGroup.position.set(wp.x, wp.y, wp.z);
            
            // Hot White Core - slightly larger
            const core = new THREE.Mesh(
                new THREE.SphereGeometry(3.8, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            wpGroup.add(core);

            // Colored Radiant Glow
            const glowTex = makeGlowTex(wp.rgb);
            const glow = new THREE.Sprite(new THREE.SpriteMaterial({
                map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
            }));
            glow.scale.set(35, 35, 1);
            wpGroup.add(glow);

            // Orbiting Sub-nodes (Planets) NO TEXT
            const orbiters: OrbitingChild[] = [];
            for(let i=0; i<wp.childrenCount; i++) {
                const childGroup = new THREE.Group();
                const pScale = 1.4;
                const pMesh = new THREE.Mesh(
                    new THREE.SphereGeometry(pScale, 16, 16),
                    new THREE.MeshBasicMaterial({ color: '#f8fafc' })
                );
                
                const pGlow = new THREE.Sprite(new THREE.SpriteMaterial({
                    map: makeGlowTex(wp.rgb), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false
                }));
                pGlow.scale.set(pScale * 9, pScale * 9, 1);
                pMesh.add(pGlow);
                
                childGroup.add(pMesh);
                wpGroup.add(childGroup);

                orbiters.push({
                    mesh: childGroup,
                    angle: (Math.PI * 2 / wp.childrenCount) * i,
                    speed: 0.12 + (i % 2 === 0 ? 0.04 : -0.04),
                    radius: wp.x === 0 ? 14 : 20 + (i % 2) * 5, 
                    tilt: (Math.random() - 0.5) * 1.0 
                });
            }

            galaxyGroup.add(wpGroup);
            // assign random phase for independent breathing
            waypointsMeshes.push({ id: wp.id, core, glow, zBase: wp.z, phase: Math.random() * Math.PI * 2 });
            journeyObjects.push({ group: wpGroup, children: orbiters });

            const hitbox = new THREE.Mesh(
                new THREE.SphereGeometry(18, 16, 16),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            hitbox.userData = { id: wp.id };
            hitboxGroup.add(hitbox);
        });
    };

    // 4. INTERACTION SYSTEM
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1, -1);
    let hoveredNode: string | null = null;
    
    // Stable lookup vectors for camera rotation
    const currentLookAt = new THREE.Vector3().copy(GLOBAL_LOOK);
    const trgPos = new THREE.Vector3().copy(GLOBAL_POS);
    const trgLook = new THREE.Vector3().copy(GLOBAL_LOOK);
    
    let cameraMode: 'GLOBAL' | 'FOCUSED' = 'GLOBAL';

    // DRAG INTERACTION STATE
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = 0;

    const onPointerMove = (e: MouseEvent) => {
        const bbox = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - bbox.left) / bbox.width) * 2 - 1;
        mouse.y = -((e.clientY - bbox.top) / bbox.height) * 2 + 1;

        if (isDragging && cameraMode === 'GLOBAL') {
            const deltaX = e.clientX - previousMousePosition.x;
            targetRotation += deltaX * 0.004; // Adjust rotation speed
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hitboxGroup.children);

        if (intersects.length > 0 && !isDragging) {
            hoveredNode = intersects[0].object.userData.id;
            container.style.cursor = 'pointer';
        } else {
            hoveredNode = null;
            container.style.cursor = isDragging ? 'grabbing' : (cameraMode === 'GLOBAL' ? 'grab' : 'default');
        }
    };

    const onPointerDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: MouseEvent) => {
        isDragging = false;
        container.style.cursor = hoveredNode ? 'pointer' : (cameraMode === 'GLOBAL' ? 'grab' : 'default');
    };

    const onClick = (e: MouseEvent) => {
        // Prevent click if they were dragging
        if (Math.abs(e.clientX - previousMousePosition.x) > 5) return;

        if (hoveredNode) {
            router.push(`/map?node=${hoveredNode}`);
            
            cameraMode = 'FOCUSED';
            setIsFocused(true);
            const wp = waypointsDyn.find(w => w.id === hoveredNode)!;
            
            const targetVec = new THREE.Vector3(wp.x, wp.y, wp.z);
            galaxyGroup.localToWorld(targetVec);

            trgLook.copy(targetVec);
            
            const dirFromCenter = targetVec.clone().normalize();
            if(dirFromCenter.lengthSq() < 0.1) dirFromCenter.set(0, 0, 1);
            
            // Cinematic zoom in
            trgPos.copy(targetVec).add(dirFromCenter.multiplyScalar(45)).add(new THREE.Vector3(0, 18, 0));
        }
    };

    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('mousedown', onPointerDown);
    renderer.domElement.addEventListener('mouseup', onPointerUp);
    renderer.domElement.addEventListener('mouseleave', onPointerUp);
    renderer.domElement.addEventListener('click', onClick);

    // API triggered by the React button
    apiRef.current.goBack = () => {
        cameraMode = 'GLOBAL';
        setIsFocused(false);
        trgPos.copy(GLOBAL_POS);
        trgLook.copy(GLOBAL_LOOK);
    };

    // 5. ANIMATION LOOP WITHOUT DEPRECATED THREE.CLOCK
    let lastTime = performance.now();
    let animId: number;

    const animate = () => {
        animId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Smoothly rotate the galaxy
        if (cameraMode === 'GLOBAL') {
            if (!isDragging) {
                targetRotation += dt * 0.04; // auto-rotation drift
            }
            galaxyGroup.rotation.y += (targetRotation - galaxyGroup.rotation.y) * 0.08;
        }

        // Sync invisible hitboxes & Orbit planets & Add glowing pulastion
        waypointsDyn.forEach((wp, i) => {
            const worldPos = new THREE.Vector3(wp.x, wp.y, wp.z);
            galaxyGroup.localToWorld(worldPos);
            hitboxGroup.children[i]?.position.copy(worldPos);

            const isHovered = (hoveredNode === wp.id);
            const meshSet = waypointsMeshes.find(m => m.id === wp.id);
            if(meshSet) {
                // Base pulsating size with math.sin
                const breathScale = 32 + Math.sin(now * 0.002 + meshSet.phase) * 4;
                const trgScale = isHovered ? 50 : breathScale;
                meshSet.glow.scale.setScalar( meshSet.glow.scale.x + (trgScale - meshSet.glow.scale.x) * dt * 8 );
            }
        });

        journeyObjects.forEach(wp => {
            wp.children.forEach(orbiter => {
                orbiter.angle += orbiter.speed * dt;
                orbiter.mesh.position.set(
                    Math.cos(orbiter.angle) * orbiter.radius,
                    Math.sin(orbiter.angle) * orbiter.radius * orbiter.tilt,
                    Math.sin(orbiter.angle) * orbiter.radius
                );
            });
        });

        // Cinematic Camera Lerping
        camera.position.lerp(trgPos, dt * 2.5);
        currentLookAt.lerp(trgLook, dt * 3);
        camera.lookAt(currentLookAt);

        renderer.render(scene, camera);
    };
    
    // Start Initialization
    initScene().then(() => {
        buildWaypoints();
        animate();
    });

    const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.domElement.removeEventListener('mousemove', onPointerMove);
        renderer.domElement.removeEventListener('mousedown', onPointerDown);
        renderer.domElement.removeEventListener('mouseup', onPointerUp);
        renderer.domElement.removeEventListener('mouseleave', onPointerUp);
        renderer.domElement.removeEventListener('click', onClick);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [router]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-[#060c18] to-slate-950 dark:from-slate-950 dark:via-[#020617] dark:to-black overflow-hidden font-sans rounded-2xl">
        {/* 3D Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-0" />

        {/* SIMULATION CONTROL BUTTON - ONLY SHOWS WHEN FOCUSED */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out flex gap-4 ${isFocused ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button 
                onClick={() => apiRef.current.goBack()}
                className="px-6 py-2.5 rounded-full bg-cyan-900/30 hover:bg-cyan-800/40 backdrop-blur-lg border border-cyan-500/30 text-cyan-50 font-medium shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all flex items-center gap-2 group"
            >
                <span className="text-xl leading-none group-hover:-rotate-45 transition-transform duration-300">↺</span>
                ზოგადი ხედი
            </button>
        </div>

        {/* GLOBAL UI HINT - ONLY SHOWS WHEN NOT FOCUSED */}
        <div className={`absolute bottom-6 right-6 transition-all duration-700 ease-out pointer-events-none ${!isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <div className="px-5 py-2.5 rounded-2xl bg-slate-900/40 dark:bg-black/40 backdrop-blur-md border border-white/5 text-slate-300 dark:text-slate-400 text-sm flex items-center gap-3 shadow-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                მაუსით შეგიძლიათ გალაქტიკის დატრიალება
            </div>
        </div>
    </div>
  );
}
