import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Users, Clock, Zap, Shield } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * TournamentLobby - Tournament Registration & Queue System
 * Phase 6: Neural Syndicates - Grid Invasions
 */
const TournamentLobby = ({ onClose, onEnterTournament }) => {
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [isQueuing, setIsQueuing] = useState(false)

  const tournaments = [
    {
      id: 'daily-invasion',
      name: 'DAILY INVASION',
      type: 'Daily',
      size: 16,
      bestOf: 3,
      duration: '2 hours',
      entryFee: { type: 'aiv', amount: 10000 },
      rewards: [
        { type: 'aiv', amount: 80000, place: '1st' },
        { type: 'aiv', amount: 40000, place: '2nd' },
        { type: 'aiv', amount: 20000, place: '3rd-4th' }
      ],
      participants: 12,
      maxParticipants: 16,
      startsIn: 3600000, // 1 hour in ms
      color: '#00e5ff'
    },
    {
      id: 'weekly-invasion',
      name: 'WEEKLY INVASION',
      type: 'Weekly',
      size: 64,
      bestOf: 5,
      duration: '6 hours',
      entryFee: { type: 'keys', amount: 2 },
      rewards: [
        { type: 'aiv', amount: 500000, place: '1st' },
        { type: 'aiv', amount: 250000, place: '2nd' },
        { type: 'aiv', amount: 125000, place: '3rd-4th' }
      ],
      participants: 48,
      maxParticipants: 64,
      startsIn: 86400000, // 24 hours in ms
      color: '#facc15'
    },
    {
      id: 'syndicate-wars',
      name: 'SYNDICATE WARS',
      type: 'Monthly',
      size: 32,
      bestOf: 5,
      duration: '1 day',
      entryFee: { type: 'level', amount: 7 },
      rewards: [
        { type: 'sector', amount: 3, place: '1st' },
        { type: 'sector', amount: 2, place: '2nd' },
        { type: 'sector', amount: 1, place: '3rd-4th' }
      ],
      participants: 24,
      maxParticipants: 32,
      startsIn: 604800000, // 7 days in ms
      color: '#ff003c'
    }
  ]

  const formatTimeRemaining = (ms) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const handleEnterQueue = (tournament) => {
    setSelectedTournament(tournament)
    setIsQueuing(true)
    telegram.impactOccurred('heavy')

    // Simulate matchmaking
    setTimeout(() => {
      telegram.notificationOccurred('success')
      onEnterTournament(tournament)
    }, 3000)
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
          backgroundColor: 'rgba(5, 5, 5, 0.7)'
        }}
        onClick={!isQueuing ? onClose : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Lobby Panel */}
      <motion.div
        className="relative w-full max-w-5xl flex flex-col"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 229, 255, 0.6)',
          maxHeight: '90vh'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close Button */}
        {!isQueuing && (
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
        )}

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-cyan-neon/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-warning-yellow" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-cyan-neon">
                TOURNAMENT LOBBY
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                Grid Invasions • Compete for Glory
              </p>
            </div>
          </div>
        </div>

        {/* Tournament List */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="space-y-4">
            {tournaments.map((tournament, index) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onEnterQueue={handleEnterQueue}
                delay={index * 0.1}
                disabled={isQueuing}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Queue Modal */}
      <AnimatePresence>
        {isQueuing && selectedTournament && (
          <QueueModal tournament={selectedTournament} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * TournamentCard - Individual tournament display
 */
const TournamentCard = ({ tournament, onEnterQueue, delay, disabled }) => {
  const isFull = tournament.participants >= tournament.maxParticipants

  return (
    <motion.div
      className="relative p-4 sm:p-6"
      style={{
        clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
        background: 'rgba(5, 5, 5, 0.6)',
        border: `1px solid ${tournament.color}60`
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ borderColor: tournament.color }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tournament.color}, transparent)`
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tournament Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3
                className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight mb-1"
                style={{ color: tournament.color }}
              >
                {tournament.name}
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono text-cyan-dim">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{tournament.size} Players</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{tournament.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Best of {tournament.bestOf}</span>
                </div>
              </div>
            </div>

            {/* Type Badge */}
            <div
              className="px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-wider"
              style={{
                background: `${tournament.color}20`,
                color: tournament.color,
                border: `1px solid ${tournament.color}60`
              }}
            >
              {tournament.type}
            </div>
          </div>

          {/* Rewards */}
          <div
            className="p-3 rounded mb-3"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${tournament.color}30`
            }}
          >
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2">
              Rewards:
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {tournament.rewards.map((reward, i) => (
                <div key={i}>
                  <div className="text-cyan-dim">{reward.place}</div>
                  <div className="font-bold" style={{ color: tournament.color }}>
                    {reward.type === 'aiv' && `${(reward.amount / 1000).toFixed(0)}K AIV`}
                    {reward.type === 'sector' && `${reward.amount} Sector${reward.amount > 1 ? 's' : ''}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entry Fee & Participants */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-cyan-dim">Entry: </span>
              <span className="text-warning-yellow font-bold">
                {tournament.entryFee.type === 'aiv' && `${(tournament.entryFee.amount / 1000).toFixed(0)}K AIV`}
                {tournament.entryFee.type === 'keys' && `${tournament.entryFee.amount} Neural Keys`}
                {tournament.entryFee.type === 'level' && `Level ${tournament.entryFee.amount}+ Syndicate`}
              </span>
            </div>
            <div>
              <span className="text-cyan-dim">Starts in: </span>
              <span className="text-cyan-neon font-bold">
                {formatTimeRemaining(tournament.startsIn)}
              </span>
            </div>
          </div>
        </div>

        {/* Queue Status & Button */}
        <div className="flex flex-col justify-between items-end">
          {/* Participant Count */}
          <div
            className="p-3 rounded text-center mb-3"
            style={{
              background: `${tournament.color}10`,
              border: `1px solid ${tournament.color}40`
            }}
          >
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-1">
              Queue
            </div>
            <div className="font-display text-2xl font-black" style={{ color: tournament.color }}>
              {tournament.participants}/{tournament.maxParticipants}
            </div>
          </div>

          {/* Enter Queue Button */}
          <motion.button
            className="w-full py-3 px-6 font-display font-bold text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              background: disabled || isFull
                ? 'rgba(100, 100, 100, 0.3)'
                : `linear-gradient(to right, ${tournament.color}, ${tournament.color}80)`,
              color: disabled || isFull ? '#666' : '#050505',
              cursor: disabled || isFull ? 'not-allowed' : 'pointer'
            }}
            onClick={() => !disabled && !isFull && onEnterQueue(tournament)}
            disabled={disabled || isFull}
            whileHover={!disabled && !isFull ? { scale: 1.02 } : {}}
            whileTap={!disabled && !isFull ? { scale: 0.98 } : {}}
          >
            {isFull ? 'QUEUE FULL' : 'ENTER QUEUE'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * QueueModal - Searching for match animation
 */
const QueueModal = ({ tournament }) => {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="p-8 rounded text-center"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(40px)',
          border: `2px solid ${tournament.color}`
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="w-full h-full" style={{ color: tournament.color }} />
        </motion.div>

        <h3
          className="font-display text-2xl font-black uppercase tracking-tight mb-2"
          style={{ color: tournament.color }}
        >
          ENTERING QUEUE
        </h3>
        <p className="font-mono text-sm text-cyan-dim">
          Searching for opponents...
        </p>

        <motion.div
          className="mt-4 flex justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: tournament.color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const formatTimeRemaining = (ms) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export default TournamentLobby
