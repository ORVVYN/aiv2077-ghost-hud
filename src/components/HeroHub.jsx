import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { heroes as allHeroes, getHeroById } from '../data/heroes'
import HeroModel3D from './HeroModel3D'
import PlasmaBioReactor from './PlasmaBioReactor'
import BiometricsPanel from './BiometricsPanel'
import HeroGallery from './HeroGallery'

/**
 * HeroHub - The Command Center (Phase 2)
 * 3-Layer Composition: Grid Background → 3D Hero → HUD Panels
 */
const HeroHub = ({ gridId }) => {
  const [selectedHeroId, setSelectedHeroId] = useState('zephyr-01')
  const [hero, setHero] = useState(getHeroById('zephyr-01'))

  // Update hero when selection changes
  useEffect(() => {
    const newHero = getHeroById(selectedHeroId)
    setHero(newHero)
  }, [selectedHeroId])

  // Loading fallback for 3D
  const LoadingFallback = () => (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-neon border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
          Loading Neural Chamber...
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      className="fixed inset-0 bg-obsidian overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* LAYER 0: Deep Obsidian Background */}
      <div className="absolute inset-0 z-0 bg-obsidian" />

      {/* Global CRT Overlay (scanline + grain noise) */}
      <div className="crt-overlay" />

      {/* High-tech mesh grid overlay */}
      <div className="absolute inset-0 z-0 mesh-overlay opacity-30" />

      {/* LAYER 1: The 3D Hero (Center, 60-70% height) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* 3D Hero Chamber - NO UI SHOULD OVERLAP THIS AREA */}
        <div className="relative w-full h-[70vh] max-w-2xl">
          <Suspense fallback={<LoadingFallback />}>
            <HeroModel3D hero={hero} />
          </Suspense>

          {/* Hero name display - Ghost HUD Style (above 3D model) */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
            key={hero.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="font-mono text-xs text-cyan-neon/30 uppercase tracking-widest mb-1">
                {hero.codename}
              </div>
              <div
                className="font-mono text-4xl font-black uppercase tracking-tight"
                style={{
                  color: hero.appearance.primaryColor,
                  textShadow: `0 0 20px ${hero.appearance.glowColor}`
                }}
              >
                {hero.name}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LAYER 2: HUD Panels (Pinned to Edges - Never Overlap Hero) */}

      {/* Top-Left: Plasma Bio-Reactor */}
      <PlasmaBioReactor
        dailySteps={hero.dailySteps}
        targetSteps={hero.targetSteps}
      />

      {/* Left-Edge: Biometrics Panel */}
      <BiometricsPanel stats={hero.stats} />

      {/* Bottom: Hero Gallery */}
      <HeroGallery
        heroes={allHeroes}
        selectedHeroId={selectedHeroId}
        onHeroChange={setSelectedHeroId}
      />

      {/* Top-Right: GRID_ID - Ghost HUD Style */}
      <motion.div
        className="fixed top-8 right-8 z-30"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-right">
          <div className="font-mono text-xs text-cyan-neon/30 uppercase tracking-widest mb-1">
            neural link
          </div>
          <div
            className="font-mono text-2xl font-bold tracking-tight"
            style={{
              color: '#00e5ff',
              textShadow: '0 0 8px #00e5ff'
            }}
          >
            {gridId}
          </div>
        </div>
      </motion.div>

      {/* Corner brackets + Tactical Metadata - AAA Density */}

      {/* Top-Left Corner */}
      <div className="absolute top-6 left-6 pointer-events-none z-40">
        <div className="w-8 h-8 border-l border-t border-cyan-neon/15" />
        <div className="font-mono text-[8px] text-cyan-neon/30 uppercase tracking-widest mt-1 space-y-0.5">
          <div>SYSTEM_AUTH: OK</div>
          <div className="text-cyan-neon/20">VER: 2.7.4</div>
        </div>
      </div>

      {/* Top-Right Corner */}
      <div className="absolute top-6 right-6 pointer-events-none z-40 text-right">
        <div className="w-8 h-8 border-r border-t border-cyan-neon/15 ml-auto" />
        <div className="font-mono text-[8px] text-cyan-neon/30 uppercase tracking-widest mt-1 space-y-0.5">
          <div>LATENCY: 22ms</div>
          <div className="text-cyan-neon/20">PKT_LOSS: 0%</div>
        </div>
      </div>

      {/* Bottom-Left Corner */}
      <div className="absolute bottom-6 left-6 pointer-events-none z-40">
        <div className="font-mono text-[8px] text-cyan-neon/30 uppercase tracking-widest mb-1 space-y-0.5">
          <div>NEURAL_LINK: STABLE</div>
          <div className="text-cyan-neon/20">SYNC_RATE: 98.7%</div>
        </div>
        <div className="w-8 h-8 border-l border-b border-cyan-neon/15" />
      </div>

      {/* Bottom-Right Corner */}
      <div className="absolute bottom-6 right-6 pointer-events-none z-40 text-right">
        <div className="font-mono text-[8px] text-cyan-neon/30 uppercase tracking-widest mb-1 space-y-0.5">
          <div>CORE_TEMP: NOMINAL</div>
          <div className="text-cyan-neon/20">PWR_DRAW: 47W</div>
        </div>
        <div className="w-8 h-8 border-r border-b border-cyan-neon/15 ml-auto" />
      </div>
    </motion.div>
  )
}

export default HeroHub
