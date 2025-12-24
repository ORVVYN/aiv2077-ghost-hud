import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * PlasmaBioReactor - GHOST HUD VERSION
 * Thin arc progress indicator (top-left) with terminal aesthetics
 */
const PlasmaBioReactor = ({ dailySteps, targetSteps }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((dailySteps / targetSteps) * 100)
    }, 500)
    return () => clearTimeout(timer)
  }, [dailySteps, targetSteps])

  // Arc path calculation (270° arc, top-left)
  const radius = 40
  const circumference = 2 * Math.PI * radius * 0.75 // 270° arc
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Color based on progress
  const getProgressColor = () => {
    if (progress >= 100) return '#00ff00'
    if (progress >= 75) return '#00e5ff'
    if (progress >= 50) return '#facc15'
    return '#a855f7'
  }

  return (
    <motion.div
      className="fixed top-8 left-8 z-30"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Ultra-thin arc container */}
      <div className="relative w-24 h-24">
        {/* L-shaped corner brackets */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cyan-neon/30" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-cyan-neon/30" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-cyan-neon/30" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-cyan-neon/30" />
        {/* SVG Arc - 270° from top-left */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background arc */}
          <path
            d="M 15 85 A 40 40 0 1 1 85 15"
            stroke="rgba(0, 229, 255, 0.1)"
            strokeWidth="0.5"
            fill="none"
          />

          {/* Progress arc */}
          <motion.path
            d="M 15 85 A 40 40 0 1 1 85 15"
            stroke={getProgressColor()}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 3px ${getProgressColor()})`
            }}
          />
        </svg>

        {/* Center data - JetBrains Mono */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-mono text-xl font-bold tracking-tight"
            style={{
              color: getProgressColor(),
              textShadow: `0 0 8px ${getProgressColor()}`
            }}
          >
            {(dailySteps / 1000).toFixed(1)}k
          </div>
          <div className="font-mono text-[9px] text-cyan-neon/40 uppercase tracking-wider mt-0.5">
            steps
          </div>
        </div>
      </div>

      {/* Floating label (below arc) */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="font-mono text-[10px] text-cyan-neon/30 uppercase tracking-widest">
          bio-reactor
        </div>
      </div>
    </motion.div>
  )
}

export default PlasmaBioReactor
