import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Crown, Zap, Target } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * HallOfFame - Golden Ghost Gallery for Tournament Champions
 * Phase 6: Neural Syndicates - Grid Invasions
 */
const HallOfFame = ({ onClose }) => {
  const [selectedLegend, setSelectedLegend] = useState(null)

  // Mock legendary players
  const legends = [
    {
      id: 'legend-001',
      gridId: '000001',
      name: 'CyberQueen',
      title: 'THE IMMORTAL',
      heroId: 'zephyr-01',
      achievements: [
        'Weekly Invasion Champion x12',
        'Syndicate Wars Victor x8',
        'Peak LP: 9,850',
        'First AIVANCED League Member'
      ],
      stats: {
        totalBattles: 1247,
        victories: 1089,
        winRate: 87.3,
        tournamentsWon: 20,
        peakLP: 9850
      },
      color: '#ffd700',
      inductionDate: '2025-11-15'
    },
    {
      id: 'legend-002',
      gridId: '000002',
      name: 'GridMaster',
      title: 'THE ARCHITECT',
      heroId: 'vortex-02',
      achievements: [
        'Daily Invasion Perfect Record',
        'Sector Control Master',
        'Grand Reactor Level 10',
        'Syndicate Founder: APEX'
      ],
      stats: {
        totalBattles: 892,
        victories: 756,
        winRate: 84.8,
        tournamentsWon: 15,
        peakLP: 8920
      },
      color: '#c0c0c0',
      inductionDate: '2025-11-20'
    },
    {
      id: 'legend-003',
      gridId: '000003',
      name: 'NeuralKing',
      title: 'THE LIGHTNING',
      heroId: 'spectre-03',
      achievements: [
        'Fastest Victory Record: 32s',
        '50-Win Streak',
        'Top 10 Ladder Holder',
        'Golden Combat Badge'
      ],
      stats: {
        totalBattles: 643,
        victories: 521,
        winRate: 81.0,
        tournamentsWon: 10,
        peakLP: 7650
      },
      color: '#cd7f32',
      inductionDate: '2025-11-25'
    }
  ]

  const handleGhostClick = (legend) => {
    setSelectedLegend(legend)
    telegram.impactOccurred('medium')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(25px)',
          backgroundColor: 'rgba(5, 5, 5, 0.8)'
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Hall Panel */}
      <motion.div
        className="relative w-full max-w-7xl flex flex-col"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 215, 0, 0.6)',
          maxHeight: '90vh'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center z-10"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6 text-critical-red" strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-warning-yellow/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-warning-yellow" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-warning-yellow">
                HALL OF FAME
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                Immortalized Champions • Golden Ghosts
              </p>
            </div>
          </div>
        </div>

        {/* Scanline Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.03) 2px, rgba(255, 215, 0, 0.03) 4px)'
          }}
        />

        {/* Golden Ghosts Gallery */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legends.map((legend, index) => (
              <GoldenGhost
                key={legend.id}
                legend={legend}
                onClick={() => handleGhostClick(legend)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Legendary Card Modal */}
      <AnimatePresence>
        {selectedLegend && (
          <LegendaryCard
            legend={selectedLegend}
            onClose={() => setSelectedLegend(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * GoldenGhost - Individual legend hologram
 */
const GoldenGhost = ({ legend, onClick, delay }) => {
  return (
    <motion.div
      className="relative cursor-pointer aspect-[3/4]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hologram Platform */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
        {/* Platform Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-full border-2 rounded-full"
            style={{
              height: `${20 + i * 15}px`,
              borderColor: legend.color,
              opacity: 0.3 - i * 0.1
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3 - i * 0.1, 0.5 - i * 0.1, 0.3 - i * 0.1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity
            }}
          />
        ))}

        {/* Hero Hologram (Placeholder - would be 3D model) */}
        <motion.div
          className="relative w-32 h-48 mb-4 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${legend.color}40, transparent)`,
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-16 h-16" style={{ color: legend.color }} />
        </motion.div>

        {/* Floating Particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 60
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: legend.color,
                left: '50%',
                top: '40%',
                boxShadow: `0 0 6px ${legend.color}`
              }}
              animate={{
                x: [x, x + 10, x],
                y: [y, y - 20, y],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 4 + i * 0.5,
                delay: i * 0.3,
                repeat: Infinity
              }}
            />
          )
        })}
      </div>

      {/* Info Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 text-center"
        style={{
          background: 'rgba(5, 5, 5, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${legend.color}60`
        }}
      >
        <div
          className="font-display text-xl font-black uppercase tracking-tight mb-1"
          style={{
            color: legend.color,
            textShadow: `0 0 10px ${legend.color}`
          }}
        >
          {legend.name}
        </div>
        <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2">
          {legend.title}
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-warning-yellow">
          <Trophy className="w-3 h-3" />
          <span>{legend.stats.tournamentsWon} Championships</span>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * LegendaryCard - Detailed legend profile
 */
const LegendaryCard = ({ legend, onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-obsidian/90"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-2xl p-6 sm:p-8"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(40px)',
          border: `2px solid ${legend.color}`,
          boxShadow: `0 0 40px ${legend.color}60`,
          clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-critical-red" />
        </motion.button>

        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            className="font-display text-4xl font-black uppercase tracking-tight mb-2"
            style={{
              color: legend.color,
              textShadow: `0 0 20px ${legend.color}, 0 2px 0 #ff003c, -2px 0 0 #00e5ff`
            }}
            animate={{
              textShadow: [
                `0 0 20px ${legend.color}, 0 2px 0 #ff003c, -2px 0 0 #00e5ff`,
                `0 0 30px ${legend.color}, 0 3px 0 #ff003c, -3px 0 0 #00e5ff`,
                `0 0 20px ${legend.color}, 0 2px 0 #ff003c, -2px 0 0 #00e5ff`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {legend.name}
          </motion.div>
          <div className="font-mono text-lg text-warning-yellow uppercase tracking-wider mb-1">
            {legend.title}
          </div>
          <div className="font-mono text-xs text-cyan-dim">
            GRID_ID: {legend.gridId} • Inducted {legend.inductionDate}
          </div>
        </div>

        {/* Achievements */}
        <div
          className="p-4 rounded mb-6"
          style={{
            background: `${legend.color}10`,
            border: `1px solid ${legend.color}40`
          }}
        >
          <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: legend.color }}>
            LEGENDARY ACHIEVEMENTS:
          </div>
          <div className="space-y-2">
            {legend.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2 font-mono text-sm text-cyan-neon"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: legend.color }} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${legend.color}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Total Battles
            </div>
            <div className="font-display text-2xl font-black" style={{ color: legend.color }}>
              {legend.stats.totalBattles}
            </div>
          </div>

          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${legend.color}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Win Rate
            </div>
            <div className="font-display text-2xl font-black text-warning-yellow">
              {legend.stats.winRate}%
            </div>
          </div>

          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${legend.color}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Peak LP
            </div>
            <div className="font-display text-2xl font-black text-cyan-neon">
              {legend.stats.peakLP.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HallOfFame
