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
      {/* LAYER 0: AI Server Core Background Image - Deep Hangar */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.2) contrast(1.2) blur(8px)',
            opacity: 1
          }}
        />
      </div>

      {/* Gemini Grid Background - 40px violet grid with 0.2 opacity wrapper */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-20 z-0" />

      {/* Gemini Scanline - Green horizontal line */}
      <div className="crt-overlay" />

      {/* Cinematic Ambient Lighting - Gemini Style */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* LAYER 1: The 3D Hero (Center, 60-70% height) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* 3D Hero Chamber - NO UI SHOULD OVERLAP THIS AREA */}
        <div className="relative w-full h-[70vh] max-w-2xl">
          <Suspense fallback={<LoadingFallback />}>
            <HeroModel3D hero={hero} />
          </Suspense>

          {/* Hero name display - Orbitron headers (above 3D model) */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
            key={hero.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
                {hero.codename}
              </div>
              <div
                className="font-tactical text-4xl font-black uppercase tracking-tight"
                style={{
                  color: hero.appearance.primaryColor,
                  textShadow: `0 0 12px ${hero.appearance.glowColor}`,
                  opacity: 0.8
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

      {/* Top-Right: GRID_ID - Orbitron header */}
      <motion.div
        className="fixed top-8 right-8 z-30"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-right">
          <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(0, 229, 255, 0.25)' }}>
            neural link
          </div>
          <div
            className="font-tactical text-2xl font-bold tracking-tight"
            style={{
              color: '#00e5ff',
              textShadow: '0 0 8px #00e5ff',
              opacity: 0.7
            }}
          >
            {gridId}
          </div>
        </div>
      </motion.div>

      {/* Corner brackets + Tactical Metadata */}

      {/* Top-Left Corner */}
      <div className="absolute top-6 left-6 pointer-events-none z-40">
        <div className="w-8 h-8 border-l border-t" style={{ borderColor: 'rgba(0, 229, 255, 0.3)' }} />
        <div className="font-mono text-[8px] uppercase tracking-widest mt-1 space-y-0.5" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
          <div>SYSTEM_AUTH: OK</div>
          <div style={{ color: 'rgba(0, 229, 255, 0.15)' }}>VER: 2.7.4</div>
        </div>
      </div>

      {/* Top-Right Corner */}
      <div className="absolute top-6 right-6 pointer-events-none z-40 text-right">
        <div className="w-8 h-8 border-r border-t ml-auto" style={{ borderColor: 'rgba(0, 229, 255, 0.3)' }} />
        <div className="font-mono text-[8px] uppercase tracking-widest mt-1 space-y-0.5" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
          <div>LATENCY: 22ms</div>
          <div style={{ color: 'rgba(0, 229, 255, 0.15)' }}>PKT_LOSS: 0%</div>
        </div>
      </div>

      {/* Bottom-Left Corner */}
      <div className="absolute bottom-6 left-6 pointer-events-none z-40">
        <div className="font-mono text-[8px] uppercase tracking-widest mb-1 space-y-0.5" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
          <div>NEURAL_LINK: STABLE</div>
          <div style={{ color: 'rgba(0, 229, 255, 0.15)' }}>SYNC_RATE: 98.7%</div>
        </div>
        <div className="w-8 h-8 border-l border-b" style={{ borderColor: 'rgba(0, 229, 255, 0.3)' }} />
      </div>

      {/* Bottom-Right Corner */}
      <div className="absolute bottom-6 right-6 pointer-events-none z-40 text-right">
        <div className="font-mono text-[8px] uppercase tracking-widest mb-1 space-y-0.5" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
          <div>CORE_TEMP: NOMINAL</div>
          <div style={{ color: 'rgba(0, 229, 255, 0.15)' }}>PWR_DRAW: 47W</div>
        </div>
        <div className="w-8 h-8 border-r border-b ml-auto" style={{ borderColor: 'rgba(0, 229, 255, 0.3)' }} />
      </div>
    </motion.div>
  )
}

export default HeroHub
