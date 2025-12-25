import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Zap } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * CommandHeader - SLEEK AAA TACTICAL BAR (Refined)
 * Slim elegant command bar - 40% height reduction
 * Left: User Identity | Center: Bio-Reactor + Extract | Right: AIV Balance & Credits
 */
const CommandHeader = ({ dailySteps, totalAIV, credits, hero, onExtractAIV }) => {
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractStatus, setExtractStatus] = useState('STANDBY')
  const [particles, setParticles] = useState([])

  const reactorControls = useAnimation()
  const balanceControls = useAnimation()
  const ring1Controls = useAnimation()
  const ring2Controls = useAnimation()
  const ring3Controls = useAnimation()

  // Daily steps progress (max 10,000 steps per day)
  const dailyGoal = 10000
  const dailyProgress = Math.min((dailySteps / dailyGoal) * 100, 100)
  const hasStepsToExtract = dailySteps > 0

  // Bio-Reactor Rings - Mechanical rotation
  useEffect(() => {
    ring1Controls.start({
      rotate: 360,
      transition: { duration: 6, repeat: Infinity, ease: 'linear' }
    })
    ring2Controls.start({
      rotate: -360,
      transition: { duration: 10, repeat: Infinity, ease: 'linear' }
    })
    ring3Controls.start({
      rotate: 360,
      transition: { duration: 14, repeat: Infinity, ease: 'linear' }
    })
  }, [ring1Controls, ring2Controls, ring3Controls])

  // Handle AIV Extraction with 60fps animation sequence
  const handleExtractAIV = async () => {
    if (!hasStepsToExtract || isExtracting) return

    setIsExtracting(true)
    setExtractStatus('SYNCING...')

    // STAGE 1: IGNITION - Plasma Flare
    await reactorControls.start({
      rotate: [0, 360, 720],
      scale: [1, 1.2, 1],
      filter: [
        'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))',
        'drop-shadow(0 0 40px rgba(0, 229, 255, 1))',
        'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))'
      ],
      transition: { duration: 0.6, ease: 'easeOut' }
    })

    // STAGE 2: TRANSFER - Particle stream
    const particleCount = 35
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.015,
      offset: (Math.random() - 0.5) * 12
    }))
    setParticles(newParticles)

    await new Promise(resolve => setTimeout(resolve, 750))

    // STAGE 3: IMPACT
    telegram.impactOccurred('heavy')

    await balanceControls.start({
      scale: [1, 1.35, 0.95, 1.08, 1],
      transition: {
        scale: { type: 'spring', stiffness: 350, damping: 10 },
        duration: 0.5
      }
    })

    setExtractStatus('COMPLETE')

    if (onExtractAIV) {
      onExtractAIV(dailySteps)
    }

    setTimeout(() => {
      setParticles([])
      setIsExtracting(false)
      setExtractStatus('STANDBY')
    }, 1000)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      {/* DATA RIBBON - Top 12px scrolling metadata */}
      <div
        className="relative w-full h-3 overflow-hidden border-b"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 10, 15, 0.85), rgba(0, 15, 20, 0.85))',
          borderBottomColor: 'rgba(0, 229, 255, 0.25)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
        }}
      >
        <motion.div
          className="flex gap-8 font-mono text-[7px] text-cyan-neon/35 tracking-widest whitespace-nowrap py-0.5 px-3"
          animate={{ x: [0, -700] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <span>◆ UPLINK: ACTIVE</span>
          <span>◆ LATENCY: 8ms</span>
          <span>◆ SIGNAL: 98.7%</span>
          <span>◆ ENCRYPTION: AES-256</span>
          <span>◆ PKT_LOSS: 0.00%</span>
          <span>◆ NODE_ID: 0xA7F2</span>
          <span>◆ SESSION: SECURE</span>
          <span>◆ UPLINK: ACTIVE</span>
          <span>◆ LATENCY: 8ms</span>
          <span>◆ SIGNAL: 98.7%</span>
        </motion.div>
      </div>

      {/* MAIN SLEEK COMMAND BAR - Slim & Elegant */}
      <motion.div
        className="relative w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 14 }}
        style={{
          background: `
            linear-gradient(180deg, rgba(10, 15, 20, 0.4) 0%, rgba(5, 10, 15, 0.4) 100%)
          `,
          backdropFilter: 'blur(40px) saturate(1.1)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: `
            0 4px 20px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.02),
            0 0 40px rgba(0, 229, 255, 0.08)
          `,
          minHeight: '70px'
        }}
      >
        {/* Particle Stream - From Bio-Reactor CENTER to AIV Balance */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-neon pointer-events-none z-10"
            style={{
              left: '50%',
              top: `calc(50% + ${particle.offset}px)`,
              width: '5px',
              height: '5px',
              boxShadow: '0 0 10px rgba(0, 229, 255, 1), 0 0 5px rgba(0, 229, 255, 0.8)'
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{
              x: window.innerWidth * 0.35,
              y: 0,
              opacity: [1, 1, 0],
              scale: [0.5, 1.4, 0]
            }}
            transition={{
              delay: particle.delay,
              duration: 0.7,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Main Content Layout: Left | Center | Right */}
        <div className="relative grid grid-cols-[auto_1fr_auto] gap-6 items-center px-6 py-3">

          {/* LEFT: USER IDENTITY PANEL */}
          <div className="flex items-center gap-3">
            {/* Avatar - Sharp Hexagonal Ring */}
            <div className="relative">
              {/* Hexagonal Frame */}
              <div
                className="absolute inset-0 -m-1.5"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(168, 85, 247, 0.1))',
                  border: '1px solid rgba(0, 229, 255, 0.5)',
                  boxShadow: '0 0 8px rgba(0, 229, 255, 0.3)'
                }}
              />

              {/* Avatar Orb */}
              <motion.div
                className="relative w-11 h-11 rounded-full overflow-hidden border-2"
                style={{
                  borderColor: hero.appearance.primaryColor,
                  boxShadow: `0 0 12px ${hero.appearance.glowColor}`
                }}
                animate={{
                  boxShadow: [
                    `0 0 12px ${hero.appearance.glowColor}`,
                    `0 0 20px ${hero.appearance.glowColor}`,
                    `0 0 12px ${hero.appearance.glowColor}`
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(circle at center, ${hero.appearance.glowColor}, ${hero.appearance.primaryColor})`
                  }}
                />
              </motion.div>

              {/* Active Status Dot */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-neon border-2 border-obsidian"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Username + Sync Status - Compact Stack */}
            <div className="flex flex-col gap-1">
              {/* Username */}
              <div
                className="font-tactical text-sm font-black uppercase tracking-tight text-cyan-neon"
                style={{
                  transform: 'skewX(-4deg)',
                  textShadow: '0 0 10px rgba(0, 229, 255, 0.7)',
                  letterSpacing: '0.03em'
                }}
              >
                ZEPHYR_AGENT
              </div>

              {/* Sync Status Bar - Compact */}
              <div className="flex items-center gap-1.5">
                <div className="relative w-20 h-1 bg-obsidian/50 border border-cyan-neon/25 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 h-full"
                    style={{
                      background: 'linear-gradient(90deg, #00e5ff, #00ff88)'
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      boxShadow: [
                        '0 0 3px rgba(0, 229, 255, 0.3)',
                        '0 0 6px rgba(0, 255, 136, 0.7)',
                        '0 0 3px rgba(0, 229, 255, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
                <span className="font-mono text-[6px] text-cyan-neon/50 uppercase tracking-widest">SYNC</span>
              </div>
            </div>
          </div>

          {/* CENTER: BIO-REACTOR + EXTRACT BUTTON */}
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Bio-Reactor Label */}
            <div className="font-mono text-[7px] text-cyan-neon/50 uppercase tracking-widest">
              Bio-Reactor
            </div>

            <div className="flex items-center gap-3">
              {/* Reactor Ring - Compact */}
              <motion.div
                className="relative"
                animate={reactorControls}
              >
                <svg width="70" height="70" className="relative transform -rotate-90">
                {/* Background Circle - 10k limit */}
                <circle
                  cx="35"
                  cy="35"
                  r="30"
                  stroke="rgba(0, 229, 255, 0.15)"
                  strokeWidth="3"
                  fill="none"
                />

                {/* Progress Circle - Daily Steps */}
                <motion.circle
                  cx="35"
                  cy="35"
                  r="30"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 189' }}
                  animate={{ strokeDasharray: `${(dailyProgress / 100) * 189} 189` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Plasma Center */}
                <circle
                  cx="35"
                  cy="35"
                  r="10"
                  fill="url(#plasmaGradient)"
                  filter="url(#plasmaGlow)"
                />

                {/* Ring 3 - Outer decorative */}
                <motion.g animate={ring3Controls}>
                  <circle
                    cx="35"
                    cy="35"
                    r="26"
                    stroke="rgba(0, 229, 255, 0.2)"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                </motion.g>

                {/* Ring 2 - Middle decorative */}
                <motion.g animate={ring2Controls}>
                  <circle
                    cx="35"
                    cy="35"
                    r="20"
                    stroke="rgba(168, 85, 247, 0.25)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                </motion.g>

                {/* Ring 1 - Inner decorative */}
                <motion.g animate={ring1Controls}>
                  <circle
                    cx="35"
                    cy="35"
                    r="15"
                    stroke="rgba(0, 229, 255, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                </motion.g>

                {/* Crosshair */}
                <line x1="35" y1="5" x2="35" y2="12" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
                <line x1="35" y1="58" x2="35" y2="65" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
                <line x1="5" y1="35" x2="12" y2="35" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
                <line x1="58" y1="35" x2="65" y2="35" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />

                <defs>
                  <radialGradient id="plasmaGradient">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="rgba(0, 229, 255, 0.2)" />
                  </radialGradient>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="plasmaGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Center: Steps / Limit */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-mono text-[11px] font-black text-cyan-neon drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]">
                  {dailySteps.toLocaleString()}
                </div>
                <div className="font-mono text-[6px] text-cyan-dim/40 uppercase tracking-wider">
                  / 10,000
                </div>
              </div>
            </motion.div>

            {/* Extract Button - Compact Glowing Trapezoid */}
            <motion.button
              className="relative py-1.5 px-4 font-mono text-[8px] uppercase tracking-widest overflow-hidden"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                background: hasStepsToExtract
                  ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.2))'
                  : 'rgba(10, 10, 15, 0.6)',
                border: hasStepsToExtract
                  ? '1px solid rgba(250, 204, 21, 0.7)'
                  : '1px solid rgba(0, 229, 255, 0.2)',
                color: hasStepsToExtract ? '#facc15' : 'rgba(0, 229, 255, 0.4)',
                boxShadow: hasStepsToExtract
                  ? 'inset 0 1px 2px rgba(250, 204, 21, 0.2), 0 0 12px rgba(250, 204, 21, 0.4)'
                  : 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
              }}
              onClick={handleExtractAIV}
              disabled={!hasStepsToExtract || isExtracting}
              whileHover={hasStepsToExtract ? { scale: 1.05 } : {}}
              whileTap={hasStepsToExtract ? { scale: 0.95 } : {}}
              animate={hasStepsToExtract && !isExtracting ? {
                boxShadow: [
                  'inset 0 1px 2px rgba(250, 204, 21, 0.2), 0 0 12px rgba(250, 204, 21, 0.4)',
                  'inset 0 1px 2px rgba(250, 204, 21, 0.2), 0 0 20px rgba(250, 204, 21, 0.8)',
                  'inset 0 1px 2px rgba(250, 204, 21, 0.2), 0 0 12px rgba(250, 204, 21, 0.4)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="inline-block w-2.5 h-2.5 mr-1 mb-px" strokeWidth={2} fill={hasStepsToExtract ? 'currentColor' : 'none'} />
              EXTRACT
            </motion.button>

              {/* Status Only */}
              <div className="flex flex-col items-center">
                <div className="font-mono text-[6px] text-cyan-dim/30 uppercase tracking-wider">
                  {extractStatus}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AIV RESERVE & CREDITS (THE MONEY) */}
          <div className="flex flex-col items-end gap-1.5">
            {/* AIV Balance - Large Warning Yellow */}
            <motion.div animate={balanceControls}>
              <div className="font-mono text-[6px] text-cyan-dim uppercase tracking-widest opacity-60 text-right">
                AIV Reserve
              </div>
              <div className="font-display text-2xl font-black text-warning-yellow tracking-tight text-right drop-shadow-[0_0_14px_rgba(250,204,21,0.7)]">
                {totalAIV.toLocaleString()}
              </div>
            </motion.div>

            {/* Credits */}
            <div className="text-right">
              <div className="font-mono text-[6px] text-cyan-dim uppercase tracking-widest opacity-60">
                Credits
              </div>
              <div className="font-display text-sm font-black text-warning-yellow tracking-tight">
                {credits.toLocaleString()} CR
              </div>
            </div>
          </div>
        </div>

        {/* CORNER L-BRACKETS - Same style as BiometricsPanel */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyan-neon/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-cyan-neon/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-cyan-neon/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-cyan-neon/40 pointer-events-none" />
      </motion.div>
    </div>
  )
}

export default CommandHeader
