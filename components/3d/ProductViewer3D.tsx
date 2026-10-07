'use client';

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

// Procedural 3D luxury Antique Greek/Roman Amphora Vase mesh with bronze and gold patina
function AntiqueVaseMesh({ color = '#8c6d46', isHovered = false }: { color?: string; isHovered?: boolean }) {
  const meshGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshGroup.current) {
      // Gentle auto turntable spin when not dragging
      meshGroup.current.rotation.y += delta * 0.25;
    }
  });

  // Create antique bronze material
  const bronzeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.88,
    roughness: 0.32,
    envMapIntensity: 1.2,
  });

  const goldAccentMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d4af37'),
    metalness: 0.95,
    roughness: 0.22,
    envMapIntensity: 1.5,
  });

  return (
    <group ref={meshGroup} position={[0, -0.6, 0]}>
      {/* Vase Pedestal Foot */}
      <mesh position={[0, 0, 0]} material={bronzeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.9, 0.25, 32]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[0.72, 0.05, 16, 32]} />
      </mesh>

      {/* Vase Lower Flare / Base Stem */}
      <mesh position={[0, 0.55, 0]} material={bronzeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.5, 32]} />
      </mesh>

      {/* Main Amphora Belly (Bulbous Body) */}
      <mesh position={[0, 1.45, 0]} material={bronzeMaterial} castShadow receiveShadow>
        <sphereGeometry args={[1.25, 36, 36]} />
      </mesh>

      {/* Decorative Embossed Gold Belly Band */}
      <mesh position={[0, 1.45, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[1.27, 0.06, 16, 48]} />
      </mesh>
      <mesh position={[0, 1.7, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[1.18, 0.04, 16, 48]} />
      </mesh>
      <mesh position={[0, 1.2, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[1.18, 0.04, 16, 48]} />
      </mesh>

      {/* Vase Elongated Neck */}
      <mesh position={[0, 2.5, 0]} material={bronzeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.85, 1.1, 32]} />
      </mesh>

      {/* Neck Gold Collar */}
      <mesh position={[0, 2.8, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[0.68, 0.05, 16, 32]} />
      </mesh>

      {/* Flared Mouth / Rim */}
      <mesh position={[0, 3.1, 0]} material={bronzeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 0.65, 0.35, 32]} />
      </mesh>
      <mesh position={[0, 3.25, 0]} material={goldAccentMaterial} castShadow>
        <torusGeometry args={[0.96, 0.06, 16, 32]} />
      </mesh>

      {/* Left Ornate Scrolled Handle */}
      <group position={[-1.25, 2.1, 0]} rotation={[0, 0, Math.PI / 12]}>
        <mesh material={goldAccentMaterial} castShadow>
          <torusGeometry args={[0.65, 0.09, 16, 32, Math.PI * 1.2]} />
        </mesh>
      </group>

      {/* Right Ornate Scrolled Handle */}
      <group position={[1.25, 2.1, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <mesh material={goldAccentMaterial} castShadow>
          <torusGeometry args={[0.65, 0.09, 16, 32, Math.PI * 1.2]} />
        </mesh>
      </group>

      {/* Circular Display Plinth */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[1.7, 1.8, 0.16, 48]} />
        <meshStandardMaterial color="#f0eae1" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Plinth Gold Rim */}
      <mesh position={[0, -0.15, 0]}>
        <torusGeometry args={[1.72, 0.03, 16, 48]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Procedural 3D Bronze Sculpture Mesh
function BronzeSculptureMesh({ color = '#7a5a3a' }: { color?: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
    }
  });

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.35,
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Marble Base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.3, 1.4]} />
        <meshStandardMaterial color="#1f1e1c" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Bronze Figure Abstract Anatomy */}
      <mesh position={[0, 1.1, 0]} material={bronzeMat} castShadow>
        <cylinderGeometry args={[0.4, 0.6, 1.6, 24]} />
      </mesh>
      <mesh position={[0, 2.0, 0]} material={bronzeMat} castShadow>
        <sphereGeometry args={[0.55, 32, 32]} />
      </mesh>
      <mesh position={[-0.7, 1.4, 0]} rotation={[0, 0, 0.4]} material={bronzeMat} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 16]} />
      </mesh>
      <mesh position={[0.7, 1.4, 0]} rotation={[0, 0, -0.4]} material={bronzeMat} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 16]} />
      </mesh>
    </group>
  );
}

// Procedural Ritual Bowl Mesh
function BronzeBowlMesh({ color = '#5e4835' }: { color?: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 0.6, 0.9, 36, 1, true]} />
        <meshStandardMaterial
          color={new THREE.Color(color)}
          metalness={0.88}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.7, 0.8, 0.2, 32]} />
        <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

interface ProductViewer3DProps {
  modelType?: 'vase' | 'sculpture' | 'bowl' | 'custom';
  color?: string;
  autoRotate?: boolean;
  className?: string;
}

export default function ProductViewer3D({
  modelType = 'vase',
  color = '#8c6d46',
  className = 'h-[460px] w-full',
}: ProductViewer3DProps) {
  const [mounted, setMounted] = useState(false);
  const controlsRef = useRef<any>(null);
  const { setCursor, resetCursor } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  };

  if (!mounted) {
    return (
      <div className={`relative flex items-center justify-center bg-[#110f0d] rounded-2xl ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#c5a059] border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#c5a059]">Initializing 3D Viewport...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#141210] to-[#0c0a09] border border-[#c5a059]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}
      onMouseEnter={() => setCursor('3d', 'EXPLORE 3D')}
      onMouseLeave={resetCursor}
      onMouseDown={() => setCursor('drag', 'DRAG')}
      onMouseUp={() => setCursor('3d', 'EXPLORE 3D')}
    >
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Luxury Studio Lighting Setup */}
        <ambientLight intensity={0.9} />
        {/* Warm Key Light */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.2}
          color="#fdf3e0"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-bias={-0.0001}
        />
        {/* Champagne Rim Light */}
        <directionalLight position={[-4, 3, -3]} intensity={1.8} color="#c5a059" />
        {/* Bottom Fill Light for Soft Under-Shadows */}
        <directionalLight position={[0, -2, 2]} intensity={0.6} color="#d9c7af" />

        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.15}>
            {modelType === 'vase' && <AntiqueVaseMesh color={color} />}
            {modelType === 'sculpture' && <BronzeSculptureMesh color={color} />}
            {modelType === 'bowl' && <BronzeBowlMesh color={color} />}
            {modelType === 'custom' && <AntiqueVaseMesh color={color} />}
          </Float>

          {/* Contact Shadows on Floating Platform (Optimized frames) */}
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.65}
            scale={5}
            blur={2}
            far={3.5}
            resolution={256}
            frames={1}
            color="#050403"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={2.5}
          maxDistance={6.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* 360 Degree Interactive Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a059]/30 text-[11px] font-medium tracking-[0.2em] text-[#e8decb] pointer-events-none">
        <span className="text-[#c5a059]">✦</span>
        <span>360° DRAG TO ROTATE</span>
        <span className="text-[#c5a059]">✦</span>
      </div>

      {/* Viewer Floating Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-full bg-black/50 hover:bg-[#c5a059]/20 backdrop-blur-md border border-white/10 hover:border-[#c5a059]/50 text-white hover:text-[#dfba73] transition-all"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-full bg-black/50 hover:bg-[#c5a059]/20 backdrop-blur-md border border-white/10 hover:border-[#c5a059]/50 text-white hover:text-[#dfba73] transition-all"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 rounded-full bg-black/50 hover:bg-[#c5a059]/20 backdrop-blur-md border border-white/10 hover:border-[#c5a059]/50 text-white hover:text-[#dfba73] transition-all"
          title="Reset View"
          aria-label="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Specular Glow Corner Accent */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[10px] tracking-widest text-[#f5e4bd]">
        <Sparkles className="w-3 h-3 text-[#c5a059]" />
        <span>THREE.JS WEBGL RENDER</span>
      </div>
    </div>
  );
}
