import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Activity, Zap } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * CommandHeader - Unified Command Tower HUD with AIV_EXTRACTION mechanic
 * Full-width tactical header with symmetrical layout:
 * - Left: Bio-Reactor (Daily Steps Ring) + EXTRACT_AIV button
 * - Center: Neural Waveform
 * - Right: Avatar + AIV Balance + Credits
 */
const CommandHeader = ({ dailySteps, totalAIV, credits, hero, onExtractAIV }) => {
  const canvasRef = useRef(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractStatus, setExtractStatus] = useState('STANDBY')
  const [particles, setParticles] = useState([])

  const reactorControls = useAnimation()
  const balanceControls = useAnimation()
  const headerControls = useAnimation()

  // Daily steps progress (max 10,000 steps per day)
  const dailyGoal = 10000
  const dailyProgress = Math.min((dailySteps / dailyGoal) * 100, 100)
  const hasStepsToExtract = dailySteps > 0

  // Neural Waveform Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    let animationId
    let offset = 0

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height)

      // Oscillating waveform
      ctx.beginPath()
      ctx.strokeStyle = '#00e5ff'
      ctx.lineWidth = 2

      const amplitude = height / 3
      const frequency = 0.02
      const speed = 2

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x + offset) * frequency) * amplitude
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Pulse line overlay
      const pulseX = (offset * 0.5) % width
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)'
      ctx.lineWidth = 3
      ctx.moveTo(pulseX, 0)
      ctx.lineTo(pulseX, height)
      ctx.stroke()

      // Glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = '#00e5ff'
      ctx.stroke()

      offset += speed
      animationId = requestAnimationFrame(drawWaveform)
    }

    drawWaveform()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Handle AIV Extraction with 60fps animation sequence
  const handleExtractAIV = async () => {
    if (!hasStepsToExtract || isExtracting) return

    setIsExtracting(true)
    setExtractStatus('NEURAL_SYNCING...')

    // STAGE 1: IGNITION - Plasma Flare with high-speed rotation
    await reactorControls.start({
      rotate: [0, 360, 720],
      scale: [1, 1.15, 1],
      filter: [
        'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))',
        'drop-shadow(0 0 30px rgba(0, 229, 255, 1))',
        'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))'
      ],
      transition: { duration: 0.6, ease: 'easeOut' }
    })

    // STAGE 2: TRANSFER - Generate particle stream
    const particleCount = 20
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.03
    }))
    setParticles(newParticles)

    // Wait for particles to travel
    await new Promise(resolve => setTimeout(resolve, 800))

    // STAGE 3: IMPACT - Balance update with spring + screen shake + chromatic aberration
    telegram.impactOccurred('heavy')

    // Chromatic aberration + screen shake
    headerControls.start({
      x: [0, -2, 2, -1, 1, 0],
      filter: [
        'none',
        'drop-shadow(2px 0 0 red) drop-shadow(-2px 0 0 cyan)',
        'drop-shadow(1px 0 0 red) drop-shadow(-1px 0 0 cyan)',
        'none'
      ],
      transition: { duration: 0.3 }
    })

    // Spring animation on balance
    await balanceControls.start({
      scale: [1, 1.3, 0.95, 1.05, 1],
      color: ['#fbbf24', '#00e5ff', '#fbbf24'],
      transition: {
        scale: { type: 'spring', stiffness: 300, damping: 10 },
        duration: 0.5
      }
    })

    setExtractStatus('TRANSACTION_COMPLETE')

    // Call parent handler to update AIV balance
    if (onExtractAIV) {
      onExtractAIV(dailySteps)
    }

    // Clear particles and reset
    setTimeout(() => {
      setParticles([])
      setIsExtracting(false)
      setExtractStatus('STANDBY')
    }, 1000)
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, ...headerControls }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      {/* Main Header Container - Trapezoid Shape */}
      <div
        className="relative mx-auto"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)',
          background: 'rgba(5, 5, 5, 0.6)',
          backdropFilter: 'blur(40px)',
          border: '2px solid rgba(0, 229, 255, 0.8)',
          borderTop: 'none',
          minHeight: '120px',
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
        }}
      >
        {/* Micro-Grid Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Particle Stream (STAGE 2) */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-cyan-neon pointer-events-none"
            style={{
              left: '15%',
              top: '50%',
              boxShadow: '0 0 8px rgba(0, 229, 255, 1)'
            }}
            initial={{ x: 0, opacity: 1, scale: 1 }}
            animate={{
              x: window.innerWidth * 0.65,
              opacity: [1, 1, 0],
              scale: [1, 1.5, 0]
            }}
            transition={{
              delay: particle.delay,
              duration: 0.8,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Main Content Grid */}
        <div className="relative grid grid-cols-3 gap-4 px-6 py-4">
          {/* LEFT SECTION: Bio-Reactor (Daily Steps Ring) + EXTRACT_AIV Button */}
          <div className="flex items-center gap-3">
            {/* Daily Steps Ring */}
            <motion.div
              className="relative"
              animate={reactorControls}
            >
              <svg width="70" height="70" className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx="35"
                  cy="35"
                  r="28"
                  stroke="rgba(0, 229, 255, 0.2)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="35"
                  cy="35"
                  r="28"
                  stroke="url(#dailyGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 176' }}
                  animate={{ strokeDasharray: `${(dailyProgress / 100) * 176} 176` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                {/* Plasma flare effect */}
                {isExtracting && (
                  <circle
                    cx="35"
                    cy="35"
                    r="28"
                    stroke="rgba(0, 229, 255, 0.6)"
                    strokeWidth="8"
                    fill="none"
                    style={{
                      filter: 'blur(4px)',
                      opacity: 0.8
                    }}
                  />
                )}
                <defs>
                  <linearGradient id="dailyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-sm font-black text-cyan-neon">
                  {Math.round(dailyProgress)}%
                </span>
              </div>
            </motion.div>

            {/* Daily Stats + Extract Button */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Stats */}
              <div>
                <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                  Bio-Reactor
                </div>
                <div className="font-display text-base font-black text-white tracking-tight">
                  {dailySteps.toLocaleString()}
                </div>
                <div className="font-mono text-[7px] text-cyan-dim/50 uppercase">
                  / {dailyGoal.toLocaleString()} steps
                </div>
              </div>

              {/* EXTRACT_AIV Button */}
              <motion.button
                className="relative w-full py-2 px-3 font-mono text-[9px] uppercase tracking-widest overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                  background: hasStepsToExtract
                    ? 'linear-gradient(to right, rgba(0, 229, 255, 0.3), rgba(168, 85, 247, 0.3))'
                    : 'rgba(5, 5, 5, 0.5)',
                  border: hasStepsToExtract
                    ? '1px solid rgba(0, 229, 255, 0.6)'
                    : '1px solid rgba(0, 229, 255, 0.2)',
                  color: hasStepsToExtract ? '#00e5ff' : 'rgba(0, 229, 255, 0.3)'
                }}
                onClick={handleExtractAIV}
                disabled={!hasStepsToExtract || isExtracting}
                whileHover={hasStepsToExtract ? { scale: 1.02 } : {}}
                whileTap={hasStepsToExtract ? { scale: 0.98 } : {}}
                animate={hasStepsToExtract && !isExtracting ? {
                  boxShadow: [
                    '0 0 10px rgba(0, 229, 255, 0.3)',
                    '0 0 20px rgba(0, 229, 255, 0.6)',
                    '0 0 10px rgba(0, 229, 255, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="inline-block w-3 h-3 mr-1 mb-0.5" strokeWidth={1.2} fill="none" />
                [EXTRACT_AIV]
              </motion.button>

              {/* Extraction Status */}
              <div className="font-mono text-[7px] text-cyan-neon/50 uppercase tracking-widest text-center">
                {extractStatus}
              </div>
            </div>
          </div>

          {/* CENTER SECTION: Neural Waveform */}
          <div className="flex flex-col items-center justify-center">
            {/* Neural Status Label */}
            <div className="font-mono text-[9px] text-cyan-neon uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3" strokeWidth={1.2} fill="none" />
              <span>NEURAL_LINK: ACTIVE</span>
            </div>

            {/* Waveform Canvas */}
            <canvas
              ref={canvasRef}
              width={200}
              height={30}
              className="opacity-80"
            />

            {/* Neural Link Code */}
            <div className="font-mono text-[7px] text-cyan-dim/50 uppercase tracking-widest mt-1">
              ID: 222222
            </div>
          </div>

          {/* RIGHT SECTION: Avatar + AIV Balance + Credits */}
          <div className="flex items-center justify-end gap-4">
            {/* Total Stats */}
            <div className="flex-1 min-w-0 text-right">
              {/* AIV Balance (Kinetic Reserve renamed to AIV) */}
              <motion.div className="mb-2" animate={balanceControls}>
                <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                  AIV Reserve
                </div>
                <div className="font-display text-xl font-black text-warning-yellow tracking-tight">
                  {totalAIV.toLocaleString()}
                </div>
                <div className="font-mono text-[7px] text-cyan-dim/50 uppercase">
                  AIVANCED
                </div>
              </motion.div>

              {/* Credits */}
              <div>
                <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                  Credits
                </div>
                <div className="font-display text-sm font-black text-warning-yellow tracking-tight">
                  {credits.toLocaleString()} CR
                </div>
              </div>
            </div>

            {/* Avatar Status Orb */}
            <div className="relative">
              <motion.div
                className="w-14 h-14 rounded-full overflow-hidden border-2"
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
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* Avatar placeholder - gradient orb */}
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(circle at center, ${hero.appearance.glowColor}, ${hero.appearance.primaryColor})`
                  }}
                />
              </motion.div>

              {/* Active status indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-neon border-2 border-obsidian"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
          </div>
        </div>

        {/* L-Brackets - Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-neon/50 pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-neon/50 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-neon/50 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-neon/50 pointer-events-none" />

        {/* Metadata Streams - Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden pointer-events-none">
          <motion.div
            className="flex gap-8 font-mono text-[7px] text-cyan-neon/30 tracking-widest whitespace-nowrap"
            animate={{ x: [0, -500] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <span>UPLINK_STATUS: OK</span>
            <span>LATENCY: 8ms</span>
            <span>PKT_LOSS: 0.00%</span>
            <span>BANDWIDTH: 1.2Gb/s</span>
            <span>ENCRYPTION: AES-256</span>
            <span>SESSION_ID: {Math.floor(Math.random() * 999999)}</span>
            <span>SYNC_RATE: 99.8%</span>
            <span>CORE_TEMP: 42°C</span>
            <span>UPLINK_STATUS: OK</span>
            <span>LATENCY: 8ms</span>
            <span>PKT_LOSS: 0.00%</span>
            <span>BANDWIDTH: 1.2Gb/s</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CommandHeader
