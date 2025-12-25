import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

/**
 * CommandHeader - Unified Command Tower HUD
 * Full-width tactical header with symmetrical layout:
 * - Left: Bio-Reactor (Daily Steps Ring)
 * - Center: Neural Waveform
 * - Right: Avatar + Total Steps + Credits
 */
const CommandHeader = ({ dailySteps, totalSteps, credits, hero }) => {
  const canvasRef = useRef(null)

  // Daily steps progress (max 10,000 steps per day)
  const dailyGoal = 10000
  const dailyProgress = Math.min((dailySteps / dailyGoal) * 100, 100)

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

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      {/* Main Header Container - Trapezoid Shape */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          borderTop: 'none'
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

        {/* Main Content Grid */}
        <div className="relative grid grid-cols-3 gap-4 px-6 py-4">
          {/* LEFT SECTION: Bio-Reactor (Daily Steps Ring) */}
          <div className="flex items-center gap-4">
            {/* Daily Steps Ring */}
            <div className="relative">
              <svg width="60" height="60" className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="rgba(0, 229, 255, 0.2)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="url(#dailyGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 150' }}
                  animate={{ strokeDasharray: `${(dailyProgress / 100) * 150} 150` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="dailyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xs font-black text-cyan-neon">
                  {Math.round(dailyProgress)}%
                </span>
              </div>
            </div>

            {/* Daily Stats */}
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                Daily Progress
              </div>
              <div className="font-display text-lg font-black text-white tracking-tight">
                {dailySteps.toLocaleString()}
              </div>
              <div className="font-mono text-[7px] text-cyan-dim/50 uppercase">
                / {dailyGoal.toLocaleString()} steps
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

          {/* RIGHT SECTION: Avatar + Total Steps + Credits */}
          <div className="flex items-center justify-end gap-4">
            {/* Total Stats */}
            <div className="flex-1 min-w-0 text-right">
              {/* Total Kinetic Reserve */}
              <div className="mb-2">
                <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                  Kinetic Reserve
                </div>
                <div className="font-display text-lg font-black text-warning-yellow tracking-tight">
                  {totalSteps.toLocaleString()}
                </div>
                <div className="font-mono text-[7px] text-cyan-dim/50 uppercase">
                  STEPS
                </div>
              </div>

              {/* Credits */}
              <div>
                <div className="font-mono text-[8px] text-cyan-dim uppercase tracking-widest">
                  Credits
                </div>
                <div className="font-display text-base font-black text-warning-yellow tracking-tight">
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
