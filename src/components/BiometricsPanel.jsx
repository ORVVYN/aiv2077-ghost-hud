import { motion } from 'framer-motion'

/**
 * BiometricsPanel - GHOST HUD VERSION
 * Floating text with ultra-thin progress bars (left-edge)
 */
const BiometricsPanel = ({ stats }) => {
  const statConfig = [
    { key: 'str', label: 'STR', color: '#facc15' },
    { key: 'agi', label: 'AGI', color: '#facc15' },
    { key: 'int', label: 'INT', color: '#facc15' },
    { key: 'sta', label: 'STA', color: '#facc15' }
  ]

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-30"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      {/* L-shaped corner brackets frame */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }} />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r border-t" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }} />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l border-b" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }} />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }} />

        {/* Ultra-minimal stat list */}
        <div className="space-y-6">
        {statConfig.map((stat, index) => {
          const value = stats[stat.key]
          const percentage = value / 100

          return (
            <motion.div
              key={stat.key}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            >
              {/* Label + Value row */}
              <div className="flex items-baseline gap-3 mb-1">
                {/* Label */}
                <div
                  className="font-mono text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 6px ${stat.color}50`
                  }}
                >
                  {stat.label}
                </div>

                {/* Value - JetBrains Mono */}
                <div
                  className="font-mono text-2xl font-bold tabular-nums"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 10px ${stat.color}`
                  }}
                >
                  {value}
                </div>
              </div>

              {/* Ultra-thin progress bar */}
              <div className="relative w-32 h-px bg-cyan-neon/10">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    width: `${percentage * 100}%`,
                    background: stat.color,
                    boxShadow: `0 0 4px ${stat.color}`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage * 100}%` }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

        {/* Floating label (below stats) - WARNING YELLOW */}
        <div className="absolute -bottom-8 left-0">
          <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(250, 204, 21, 0.4)' }}>
            biometrics
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BiometricsPanel
