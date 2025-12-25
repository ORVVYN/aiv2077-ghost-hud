import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Zap, Trophy } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * ArenaLobby - Matchmaking Hub
 * Circular Radar Scanner + League Badge + Combat Mode Palette
 */
const ArenaLobby = ({ hero, availableAIV, credits, onClose, onMatchFound }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [matchProgress, setMatchProgress] = useState(0)
  const [currentLeague, setCurrentLeague] = useState('BRONZE_RECRUIT')

  // League system
  const leagues = {
    BRONZE_RECRUIT: { name: 'Bronze Recruit', color: '#cd7f32', icon: '🥉' },
    SILVER_OPERATIVE: { name: 'Silver Operative', color: '#c0c0c0', icon: '🥈' },
    GOLD_COMMANDER: { name: 'Gold Commander', color: '#ffd700', icon: '🥇' },
    DIAMOND_ELITE: { name: 'Diamond Elite', color: '#00e5ff', icon: '💎' }
  }

  const league = leagues[currentLeague]

  // Matchmaking simulation
  useEffect(() => {
    if (!isSearching) return

    const interval = setInterval(() => {
      setMatchProgress(prev => {
        const next = prev + 2
        if (next >= 100) {
          setIsSearching(false)
          telegram.notificationOccurred('success')
          // Trigger match found
          setTimeout(() => {
            onMatchFound({
              opponent: {
                id: 'shadow-07',
                name: 'SHADOW',
                codename: 'SHADOW-07',
                stats: { str: 45, agi: 62, int: 38, sta: 55 }
              }
            })
          }, 500)
          return 100
        }
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isSearching, onMatchFound])

  const handleStartSearch = (mode) => {
    if (mode === 'ranked' && availableAIV < 5000) {
      telegram.notificationOccurred('error')
      return
    }

    telegram.impactOccurred('heavy')
    setIsSearching(true)
    setMatchProgress(0)
  }

  const handleCancelSearch = () => {
    setIsSearching(false)
    setMatchProgress(0)
    telegram.impactOccurred('light')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Combat Mode Background - Red-tinted Monolith */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.2) contrast(1.4) blur(16px) hue-rotate(330deg)',
            opacity: 0.6
          }}
        />
      </div>

      {/* Red combat overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-critical-red/20 via-transparent to-critical-red/10 pointer-events-none" />

      {/* Grid Background */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-15" />

      {/* Ghost Panel Container */}
      <motion.div
        className="relative w-full max-w-4xl mx-6"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        {/* Main Panel */}
        <div
          className="relative ghost-panel p-8"
          style={{
            background: 'linear-gradient(180deg, rgba(20, 5, 10, 0.8) 0%, rgba(10, 5, 5, 0.8) 100%)',
            backdropFilter: 'blur(60px)',
            border: '1px solid rgba(255, 0, 60, 0.3)'
          }}
        >
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-critical-red/40 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-critical-red/40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-critical-red/40 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-critical-red/40 pointer-events-none" />

          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-critical-red/60 hover:text-critical-red transition-colors z-20"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-2xl font-bold">×</div>
          </motion.button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="font-mono text-xs text-critical-red/50 uppercase tracking-widest mb-2">
              [ NEURAL COMBAT ARENA ]
            </div>
            <h1 className="font-tactical text-4xl font-black uppercase tracking-tight text-critical-red drop-shadow-[0_0_20px_rgba(255,0,60,0.8)]">
              MATCHMAKING
            </h1>
          </div>

          {/* Central Radar Scanner */}
          <div className="flex justify-center mb-12">
            <div className="relative w-80 h-80">
              {/* Radar Rings */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-critical-red/20"
                  style={{
                    width: `${100 - i * 20}%`,
                    height: `${100 - i * 20}%`,
                    top: `${i * 10}%`,
                    left: `${i * 10}%`
                  }}
                  animate={isSearching ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.5, 0.2]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Scanning Line */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-critical-red via-critical-red/50 to-transparent origin-left" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Center Status */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="text-center"
                  animate={isSearching ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Target className="w-16 h-16 text-critical-red mx-auto mb-4" strokeWidth={1.5} />
                  <div className="font-mono text-sm text-critical-red/80 uppercase tracking-wider">
                    {isSearching ? 'SCANNING...' : 'READY'}
                  </div>
                  {isSearching && (
                    <div className="mt-2 font-mono text-xs text-critical-red/50">
                      {matchProgress}%
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Frequency Pulses */}
              {isSearching && [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-critical-red/60"
                  style={{
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [0, 3, 0],
                    opacity: [0.8, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6
                  }}
                />
              ))}
            </div>
          </div>

          {/* League Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="px-6 py-3 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${league.color}20, ${league.color}10)`,
                  border: `1px solid ${league.color}60`,
                  boxShadow: `0 0 20px ${league.color}30`
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{league.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-cyan-dim/60 uppercase tracking-wider">
                      Current League
                    </div>
                    <div
                      className="font-tactical text-lg font-black uppercase tracking-tight"
                      style={{ color: league.color }}
                    >
                      {league.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {/* Free Practice */}
            <motion.button
              className="relative px-8 py-4 overflow-hidden group"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                background: 'rgba(0, 229, 255, 0.1)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(0, 229, 255, 0.4)'
              }}
              onClick={() => handleStartSearch('practice')}
              disabled={isSearching}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/0 to-cyan-neon/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-neon" strokeWidth={2} />
                <div>
                  <div className="font-tactical text-sm font-black text-cyan-neon uppercase tracking-tight">
                    Free Practice
                  </div>
                  <div className="font-mono text-[9px] text-cyan-dim/50 uppercase">
                    No cost
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Ranked Bout */}
            <motion.button
              className="relative px-8 py-4 overflow-hidden group"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                background: 'rgba(255, 0, 60, 0.15)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 0, 60, 0.5)'
              }}
              onClick={() => handleStartSearch('ranked')}
              disabled={isSearching || availableAIV < 5000}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-critical-red/0 to-critical-red/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2">
                <Trophy className="w-5 h-5 text-critical-red" strokeWidth={2} />
                <div>
                  <div className="font-tactical text-sm font-black text-critical-red uppercase tracking-tight">
                    Ranked Bout
                  </div>
                  <div className="font-mono text-[9px] text-warning-yellow/70 uppercase">
                    5,000 AIV
                  </div>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Cancel Search Button */}
          {isSearching && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                className="font-mono text-xs text-critical-red/60 hover:text-critical-red uppercase tracking-wider underline"
                onClick={handleCancelSearch}
              >
                [ Cancel Search ]
              </button>
            </motion.div>
          )}

          {/* Stats Info */}
          <div className="mt-8 pt-6 border-t border-critical-red/20">
            <div className="flex justify-between items-center text-xs">
              <div className="font-mono text-cyan-dim/50 uppercase tracking-wider">
                Your Agent: <span className="text-cyan-neon">{hero.name}</span>
              </div>
              <div className="font-mono text-cyan-dim/50 uppercase tracking-wider">
                Available: <span className="text-warning-yellow">{availableAIV.toLocaleString()} AIV</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ArenaLobby
