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

  // Color - WARNING YELLOW for military OS contrast
  const getProgressColor = () => {
    return '#facc15'
  }

  return (
    <motion.div
      className="fixed top-8 left-8 z-30"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Floating arc with soft backdrop blur */}
      <div className="relative w-24 h-24 p-2 rounded" style={{ backdropFilter: 'blur(10px)', background: 'rgba(0, 0, 0, 0.1)' }}>
        {/* SVG Arc - 270° from top-left */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background arc - WARNING YELLOW */}
          <path
            d="M 15 85 A 40 40 0 1 1 85 15"
            stroke="rgba(250, 204, 21, 0.15)"
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
          <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(250, 204, 21, 0.5)' }}>
            steps
          </div>
        </div>
      </div>

      {/* Floating label (below arc) - WARNING YELLOW */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(250, 204, 21, 0.4)' }}>
          bio-reactor
        </div>
      </div>
    </motion.div>
  )
}

export default PlasmaBioReactor
