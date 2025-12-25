import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, TrendingUp, Swords, Award, X, BookOpen } from 'lucide-react'
import TierEncyclopedia from './TierEncyclopedia'
import telegram from '../utils/telegram'

/**
 * GlobalLadder - Ultimate Social & Progression System
 * AAA POLISH: League tiers, prestige shields, agent cards, season timer
 */

// League Configuration
const LEAGUES = {
  BRONZE: {
    name: 'BRONZE RECRUIT',
    color: '#CD7F32',
    glowColor: 'rgba(205, 127, 50, 0.6)',
    minLP: 0,
    maxLP: 999,
    icon: '🥉'
  },
  CHROME: {
    name: 'CHROME SOLDIER',
    color: '#C0C0C0',
    glowColor: 'rgba(192, 192, 192, 0.6)',
    minLP: 1000,
    maxLP: 1999,
    icon: '⚡'
  },
  GOLD: {
    name: 'GOLD ELITE',
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    minLP: 2000,
    maxLP: 2999,
    icon: '⭐'
  },
  PLASMA: {
    name: 'PLASMA MASTER',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.8)',
    minLP: 3000,
    maxLP: 3999,
    icon: '💜'
  },
  DIAMOND: {
    name: 'DIAMOND AGENT',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.8)',
    minLP: 4000,
    maxLP: 4999,
    icon: '💎'
  },
  AIVANCED: {
    name: 'AIVANCED',
    color: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 1)',
    minLP: 5000,
    maxLP: 999999,
    icon: '👑'
  }
}

const getLeagueFromLP = (lp) => {
  if (lp >= 5000) return 'AIVANCED'
  if (lp >= 4000) return 'DIAMOND'
  if (lp >= 3000) return 'PLASMA'
  if (lp >= 2000) return 'GOLD'
  if (lp >= 1000) return 'CHROME'
  return 'BRONZE'
}

// Generate mock leaderboard data
const generateLeaderboard = (playerName, playerLP) => {
  const players = [
    { id: 1, name: 'NEXUS-01', lp: 5234, wins: 156, losses: 23, achievements: 12 },
    { id: 2, name: 'CIPHER-X', lp: 5100, wins: 142, losses: 31, achievements: 10 },
    { id: 3, name: 'GHOST-PROTOCOL', lp: 4987, wins: 138, losses: 28, achievements: 11 },
    { id: 4, name: 'QUANTUM-7', lp: 4756, wins: 129, losses: 34, achievements: 9 },
    { id: 5, name: 'VOID-RUNNER', lp: 4623, wins: 121, losses: 41, achievements: 8 },
    { id: 6, name: 'NEON-STRIKE', lp: 4501, wins: 115, losses: 38, achievements: 9 },
    { id: 7, name: 'DELTA-PRIME', lp: 4389, wins: 108, losses: 45, achievements: 7 },
    { id: 8, name: 'SHADOW-OPS', lp: 4256, wins: 102, losses: 48, achievements: 8 },
    { id: 9, name: 'VOLT-KING', lp: 4123, wins: 98, losses: 52, achievements: 7 },
    { id: 10, name: 'BLADE-ZERO', lp: 4012, wins: 91, losses: 56, achievements: 6 }
  ]

  // Insert player into appropriate position
  const playerData = {
    id: 'player',
    name: playerName,
    lp: playerLP,
    wins: Math.floor(playerLP / 50),
    losses: Math.floor(Math.random() * 30),
    achievements: Math.floor(playerLP / 500)
  }

  const allPlayers = [...players, playerData].sort((a, b) => b.lp - a.lp)

  // Add more players below
  for (let i = 11; i <= 50; i++) {
    allPlayers.push({
      id: i,
      name: `AGENT-${String(i).padStart(3, '0')}`,
      lp: Math.max(0, 4000 - (i * 80) + Math.floor(Math.random() * 50)),
      wins: Math.floor(Math.random() * 100),
      losses: Math.floor(Math.random() * 60),
      achievements: Math.floor(Math.random() * 8)
    })
  }

  return allPlayers
}

const GlobalLadder = ({ hero, currentLP = 2340, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([])
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showEncyclopedia, setShowEncyclopedia] = useState(false)
  const [seasonTimeLeft, setSeasonTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 30,
    seconds: 45
  })
  const scrollRef = useRef(null)
  const playerRowRef = useRef(null)

  const currentLeague = getLeagueFromLP(currentLP)
  const nextLeague = getLeagueFromLP(currentLP + 1)
  const leagueData = LEAGUES[currentLeague]
  const nextLeagueData = LEAGUES[nextLeague]

  const lpProgress = currentLeague === nextLeague
    ? 100
    : ((currentLP - leagueData.minLP) / (leagueData.maxLP - leagueData.minLP)) * 100

  const lpToNext = currentLeague === nextLeague ? 0 : nextLeagueData.minLP - currentLP

  useEffect(() => {
    const data = generateLeaderboard(hero.name, currentLP)
    setLeaderboard(data)

    // Scroll to player position after a short delay
    setTimeout(() => {
      if (playerRowRef.current && scrollRef.current) {
        const container = scrollRef.current
        const playerRow = playerRowRef.current
        const containerHeight = container.clientHeight
        const rowTop = playerRow.offsetTop
        const rowHeight = playerRow.clientHeight

        container.scrollTo({
          top: rowTop - (containerHeight / 2) + (rowHeight / 2),
          behavior: 'smooth'
        })
      }
    }, 500)
  }, [hero.name, currentLP])

  // Season countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeasonTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Prestige Shield Component
  const PrestigeShield = ({ league, size = 'md' }) => {
    const data = LEAGUES[league]
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-12 h-12 text-sm',
      lg: 'w-20 h-20 text-2xl'
    }

    // Special effects for top leagues
    const isAivanced = league === 'AIVANCED'
    const isPlasma = league === 'PLASMA'

    return (
      <motion.div
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: isAivanced
            ? 'linear-gradient(135deg, #FACC15, #FF003C, #00E5FF)'
            : isPlasma
              ? `radial-gradient(circle, ${data.color}, ${data.color}80)`
              : data.color,
          boxShadow: `0 0 20px ${data.glowColor}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
          border: `2px solid ${data.color}`
        }}
        animate={isAivanced ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        } : isPlasma ? {
          boxShadow: [
            `0 0 20px ${data.glowColor}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
            `0 0 40px ${data.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.4)`,
            `0 0 20px ${data.glowColor}, inset 0 0 10px rgba(255, 255, 255, 0.2)`
          ]
        } : {}}
        transition={isAivanced ? {
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        } : isPlasma ? {
          duration: 2,
          repeat: Infinity
        } : {}}
      >
        <div className="font-bold text-obsidian relative z-10">{data.icon}</div>

        {/* Chromatic Aberration for AIVANCED */}
        {isAivanced && (
          <>
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'linear-gradient(135deg, #FF003C, transparent)'
              }}
              animate={{
                x: [0, 2, -1, 2, 0],
                opacity: [0.3, 0.5, 0.2, 0.4, 0.3]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'linear-gradient(135deg, #00E5FF, transparent)'
              }}
              animate={{
                x: [0, -2, 1, -2, 0],
                opacity: [0.3, 0.5, 0.2, 0.4, 0.3]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </>
        )}
      </motion.div>
    )
  }

  const playerRank = leaderboard.findIndex(p => p.id === 'player') + 1

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.3) contrast(1.4) blur(12px)',
            opacity: 0.7
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.1), rgba(168, 85, 247, 0.1))'
        }}
      />

      {/* Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-10" />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div
          className="relative p-6 mb-4"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 15, 20, 0.95), rgba(5, 10, 15, 0.95))',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            backdropFilter: 'blur(60px)',
            clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'
          }}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-20"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(0, 229, 255, 0.3)'
            }}
            onClick={() => {
              telegram.impactOccurred('light')
              onClose()
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-cyan-neon" />
          </motion.button>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="font-mono text-[10px] text-cyan-dim/50 uppercase tracking-widest mb-2">
              [ GLOBAL_RANKING_SYSTEM ]
            </div>
            <div className="font-tactical text-4xl font-black text-cyan-neon uppercase mb-2">
              Global Ladder
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-warning-yellow/70">
              <Trophy className="w-4 h-4" />
              <span>SEASON ENDS IN: {String(seasonTimeLeft.days).padStart(2, '0')}d {String(seasonTimeLeft.hours).padStart(2, '0')}h {String(seasonTimeLeft.minutes).padStart(2, '0')}m</span>
            </div>
          </div>

          {/* Current League & Progress */}
          <div className="space-y-4">
            {/* League Badge & Info */}
            <div className="flex items-center gap-4">
              <PrestigeShield league={currentLeague} size="lg" />

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-tactical text-2xl font-black uppercase" style={{ color: leagueData.color }}>
                      {leagueData.name}
                    </div>
                    <div className="font-mono text-xs text-cyan-dim/60">
                      RANK #{playerRank} • {currentLP.toLocaleString()} LP
                    </div>
                  </div>
                  {currentLeague !== 'AIVANCED' && (
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-cyan-dim/50 uppercase">Next Tier</div>
                      <div className="font-mono text-sm text-warning-yellow font-bold">
                        +{lpToNext} LP
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {currentLeague !== 'AIVANCED' && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="font-mono text-[9px] text-cyan-dim/40 uppercase">Progression</div>
                      <div className="font-mono text-[9px] text-cyan-neon font-bold">{lpProgress.toFixed(1)}%</div>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-neon via-plasma-purple to-warning-yellow"
                        style={{
                          width: `${lpProgress}%`,
                          boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lpProgress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* VIEW_TIERS Button */}
              <motion.button
                className="px-4 py-2 flex items-center gap-2"
                style={{
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.5)',
                  clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                }}
                onClick={() => {
                  telegram.impactOccurred('medium')
                  setShowEncyclopedia(true)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-4 h-4 text-cyan-neon" />
                <span className="font-mono text-xs text-cyan-neon font-bold uppercase tracking-wider">
                  VIEW_TIERS
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-neon/30 scrollbar-track-transparent"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 15, 20, 0.9), rgba(5, 10, 15, 0.9))',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            backdropFilter: 'blur(60px)',
            padding: '1rem'
          }}
        >
          <div className="space-y-2">
            {leaderboard.map((player, index) => {
              const isPlayer = player.id === 'player'
              const league = getLeagueFromLP(player.lp)
              const leagueColor = LEAGUES[league].color

              return (
                <motion.div
                  key={player.id}
                  ref={isPlayer ? playerRowRef : null}
                  className="relative p-4 cursor-pointer"
                  style={{
                    background: isPlayer
                      ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.05))'
                      : 'rgba(10, 15, 20, 0.6)',
                    border: isPlayer
                      ? '2px solid rgba(0, 229, 255, 0.6)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    boxShadow: isPlayer
                      ? [
                          '0 0 20px rgba(0, 229, 255, 0.4)',
                          '0 0 40px rgba(0, 229, 255, 0.6)',
                          '0 0 20px rgba(0, 229, 255, 0.4)'
                        ]
                      : '0 0 0px transparent'
                  }}
                  transition={{
                    delay: index * 0.03,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity
                    }
                  }}
                  onClick={() => {
                    telegram.impactOccurred('light')
                    setSelectedAgent(player)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Current Rank Label */}
                  {isPlayer && (
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-cyan-neon/90 font-mono text-[9px] font-black text-obsidian uppercase tracking-wider">
                      ← YOU ARE HERE
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* Rank Number */}
                    <div className="w-12 text-center">
                      <div
                        className="font-tactical text-2xl font-black"
                        style={{
                          color: index < 3 ? '#FFD700' : isPlayer ? '#00E5FF' : '#666'
                        }}
                      >
                        #{index + 1}
                      </div>
                    </div>

                    {/* League Shield */}
                    <PrestigeShield league={league} size="sm" />

                    {/* Player Info */}
                    <div className="flex-1">
                      <div className={`font-tactical text-lg font-bold uppercase ${isPlayer ? 'text-cyan-neon' : 'text-white'}`}>
                        {player.name}
                      </div>
                      <div className="flex items-center gap-4 font-mono text-[10px] text-cyan-dim/60">
                        <span>{player.wins}W / {player.losses}L</span>
                        <span>•</span>
                        <span>{player.achievements} Ribbons</span>
                      </div>
                    </div>

                    {/* LP */}
                    <div className="text-right">
                      <div
                        className="font-tactical text-xl font-black"
                        style={{ color: leagueColor }}
                      >
                        {player.lp.toLocaleString()}
                      </div>
                      <div className="font-mono text-[9px] text-cyan-dim/40 uppercase">LP</div>
                    </div>

                    {/* Trend Arrow */}
                    <div>
                      {Math.random() > 0.5 ? (
                        <TrendingUp className="w-5 h-5 text-warning-yellow" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-critical-red rotate-180" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Agent Card Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="absolute inset-0 z-60 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAgent(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Agent Card */}
            <motion.div
              className="relative w-full max-w-md p-8"
              style={{
                background: 'linear-gradient(180deg, rgba(10, 15, 20, 0.98), rgba(5, 10, 15, 0.98))',
                border: '2px solid rgba(250, 204, 21, 0.5)',
                backdropFilter: 'blur(80px)',
                boxShadow: '0 0 60px rgba(250, 204, 21, 0.3)'
              }}
              initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner Brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-warning-yellow/60" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-warning-yellow/60" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-warning-yellow/60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-warning-yellow/60" />

              {/* Header */}
              <div className="text-center mb-6">
                <div className="font-mono text-[9px] text-warning-yellow/50 uppercase tracking-widest mb-2">
                  [ CLASSIFIED_DOSSIER ]
                </div>
                <div className="font-tactical text-3xl font-black text-warning-yellow uppercase">
                  {selectedAgent.name}
                </div>
                <div className="font-mono text-xs text-cyan-dim/60 mt-1">
                  AGENT_ID: {String(selectedAgent.id).padStart(6, '0')}
                </div>
              </div>

              {/* League Badge */}
              <div className="flex justify-center mb-6">
                <PrestigeShield league={getLeagueFromLP(selectedAgent.lp)} size="lg" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div className="font-mono text-[10px] text-cyan-dim/50 uppercase mb-1">League Points</div>
                  <div className="font-tactical text-2xl font-black text-warning-yellow">
                    {selectedAgent.lp.toLocaleString()}
                  </div>
                </div>

                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div className="font-mono text-[10px] text-cyan-dim/50 uppercase mb-1">Win Rate</div>
                  <div className="font-tactical text-2xl font-black text-cyan-neon">
                    {((selectedAgent.wins / (selectedAgent.wins + selectedAgent.losses)) * 100).toFixed(1)}%
                  </div>
                </div>

                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div className="font-mono text-[10px] text-cyan-dim/50 uppercase mb-1">Victories</div>
                  <div className="font-tactical text-2xl font-black text-cyan-neon">
                    {selectedAgent.wins}
                  </div>
                </div>

                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div className="font-mono text-[10px] text-cyan-dim/50 uppercase mb-1">Combat Ribbons</div>
                  <div className="font-tactical text-2xl font-black text-warning-yellow flex items-center justify-center gap-1">
                    <Award className="w-5 h-5" />
                    {selectedAgent.achievements}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-warning-yellow/20 pt-4 space-y-1 font-mono text-[9px] text-warning-yellow/40 uppercase tracking-widest">
                <div>CLASSIFICATION: TOP_SECRET</div>
                <div>CLEARANCE_LEVEL: {LEAGUES[getLeagueFromLP(selectedAgent.lp)].name}</div>
                <div>COMBAT_STATUS: ACTIVE</div>
                <div>NEURAL_COMPATIBILITY: 99.{Math.floor(Math.random() * 9)}%</div>
              </div>

              {/* Close Button */}
              <motion.button
                className="w-full mt-6 py-3 font-tactical text-sm font-black uppercase"
                style={{
                  clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                  background: 'rgba(250, 204, 21, 0.2)',
                  border: '1px solid rgba(250, 204, 21, 0.5)'
                }}
                onClick={() => {
                  telegram.impactOccurred('light')
                  setSelectedAgent(null)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-warning-yellow">Close Dossier</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tier Encyclopedia Modal */}
      <AnimatePresence>
        {showEncyclopedia && (
          <TierEncyclopedia
            currentLeague={currentLeague}
            onClose={() => setShowEncyclopedia(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default GlobalLadder
