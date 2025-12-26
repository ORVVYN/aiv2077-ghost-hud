import { motion } from 'framer-motion'
import { SYNDICATE_LEVELS } from '../data/syndicates'

/**
 * GrandReactor - Shared Step Pool Visualization
 * Phase 6: Neural Syndicates
 */
const GrandReactor = ({ syndicate, reactorColor, levelProgress }) => {
  const currentLevel = SYNDICATE_LEVELS[syndicate.level - 1]
  const nextLevel = SYNDICATE_LEVELS[syndicate.level]
  const isMaxLevel = syndicate.level === 10

  // Particle count based on progress
  const particleCount = Math.floor(levelProgress / 10) + 3

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-cyan-neon">
          GRAND REACTOR
        </h3>
        <p className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
          Shared Step Pool • Level {syndicate.level}/10
        </p>
      </div>

      {/* Hexagonal Reactor Core */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Background glow */}
        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${reactorColor}60, transparent)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* SVG Reactor */}
        <svg
          viewBox="0 0 200 200"
          className="relative w-48 h-48 sm:w-64 sm:h-64"
        >
          <defs>
            {/* Gradient for progress */}
            <linearGradient id="reactorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: reactorColor, stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: reactorColor, stopOpacity: 0.3 }} />
            </linearGradient>

            {/* Glow filter */}
            <filter id="reactorGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer hexagon (background) */}
          <motion.path
            d="M 100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z"
            fill="none"
            stroke={`${reactorColor}30`}
            strokeWidth="2"
          />

          {/* Progress hexagon */}
          <motion.path
            d="M 100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z"
            fill="url(#reactorGradient)"
            stroke={reactorColor}
            strokeWidth="3"
            filter="url(#reactorGlow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: 1
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Inner hexagon rings */}
          {[0.7, 0.5, 0.3].map((scale, i) => (
            <motion.path
              key={i}
              d="M 100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z"
              fill="none"
              stroke={reactorColor}
              strokeWidth="1.5"
              opacity={0.4 - i * 0.1}
              transform={`scale(${scale}) translate(${50 * (1 - scale)}, ${50 * (1 - scale)})`}
              animate={{
                opacity: [0.4 - i * 0.1, 0.6 - i * 0.1, 0.4 - i * 0.1]
              }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}

          {/* Center core */}
          <motion.circle
            cx="100"
            cy="100"
            r="20"
            fill={reactorColor}
            opacity="0.6"
            animate={{
              r: [18, 22, 18],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Level number in center */}
          <text
            x="100"
            y="108"
            textAnchor="middle"
            className="font-display font-black"
            style={{ fontSize: '32px', fill: '#050505' }}
          >
            {syndicate.level}
          </text>
        </svg>

        {/* Floating particles */}
        {Array.from({ length: particleCount }).map((_, i) => {
          const angle = (i / particleCount) * Math.PI * 2
          const radius = 80 + Math.random() * 40
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: reactorColor,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 4px ${reactorColor}`
              }}
              animate={{
                x: [x, x + 10, x],
                y: [y, y - 10, y],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-mono text-cyan-dim mb-2">
          <span>CURRENT</span>
          <span className="font-bold" style={{ color: reactorColor }}>
            {levelProgress.toFixed(1)}%
          </span>
          <span>NEXT LEVEL</span>
        </div>

        <div
          className="relative h-3 rounded-full overflow-hidden"
          style={{
            background: 'rgba(5, 5, 5, 0.6)',
            border: `1px solid ${reactorColor}40`
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              background: `linear-gradient(to right, ${reactorColor}, ${reactorColor}80)`,
              boxShadow: `0 0 10px ${reactorColor}60`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute inset-y-0 w-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${reactorColor}, transparent)`,
              boxShadow: `0 0 8px ${reactorColor}`
            }}
            animate={{
              left: ['0%', '100%']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Steps Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="p-3 rounded"
          style={{
            background: 'rgba(5, 5, 5, 0.5)',
            border: `1px solid ${reactorColor}30`
          }}
        >
          <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
            Total Donated
          </div>
          <div className="font-display text-lg sm:text-xl font-black" style={{ color: reactorColor }}>
            {syndicate.grandReactor.totalSteps.toLocaleString()}
          </div>
        </div>

        <div
          className="p-3 rounded"
          style={{
            background: 'rgba(5, 5, 5, 0.5)',
            border: `1px solid ${reactorColor}30`
          }}
        >
          <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
            {isMaxLevel ? 'Max Level!' : 'To Next Level'}
          </div>
          <div className="font-display text-lg sm:text-xl font-black" style={{ color: reactorColor }}>
            {isMaxLevel ? '∞' : (nextLevel.stepsRequired - syndicate.grandReactor.totalSteps).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Current Benefits */}
      <div
        className="p-4 rounded"
        style={{
          background: `linear-gradient(135deg, ${reactorColor}10, transparent)`,
          border: `1px solid ${reactorColor}40`
        }}
      >
        <div className="font-mono text-xs text-cyan-neon uppercase tracking-wider mb-2">
          Level {syndicate.level} Benefits:
        </div>
        <div className="font-mono text-sm text-cyan-dim">
          {currentLevel.benefits}
        </div>
        {!isMaxLevel && (
          <div className="font-mono text-xs text-cyan-dim/50 mt-2">
            Next: {nextLevel.benefits}
          </div>
        )}
      </div>
    </div>
  )
}

export default GrandReactor
