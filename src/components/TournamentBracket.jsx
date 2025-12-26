import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Trophy, Swords, Crown } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * TournamentBracket - LoL Worlds Style Bracket Visualization
 * Phase 6: Neural Syndicates - Grid Invasions
 */
const TournamentBracket = ({ tournament, currentPlayerId, onClose }) => {
  const scrollRef = useRef(null)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Mock tournament data structure
  const bracketData = tournament.bracket || generateMockBracket(tournament.size)

  // Auto-scroll to current player's match
  useEffect(() => {
    const playerMatch = findPlayerMatch(bracketData, currentPlayerId)
    if (playerMatch && scrollRef.current) {
      // Scroll logic here
    }
  }, [bracketData, currentPlayerId])

  const handleMatchClick = (match) => {
    setSelectedMatch(match)
    telegram.impactOccurred('light')
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
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Bracket Panel */}
      <motion.div
        className="relative w-full max-w-7xl flex flex-col"
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
        <div className="p-4 sm:p-6 border-b border-cyan-neon/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-warning-yellow" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-cyan-neon">
                {tournament.name}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                {tournament.type} • {tournament.size} Players • Best of {tournament.bestOf}
              </p>
            </div>
          </div>
        </div>

        {/* Bracket Visualization */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto p-4 sm:p-6"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05), transparent)'
          }}
        >
          <div className="flex gap-8 min-w-max">
            {bracketData.rounds.map((round, roundIndex) => (
              <BracketRound
                key={roundIndex}
                round={round}
                roundIndex={roundIndex}
                totalRounds={bracketData.rounds.length}
                currentPlayerId={currentPlayerId}
                onMatchClick={handleMatchClick}
              />
            ))}
          </div>
        </div>

        {/* Match Details Popup */}
        {selectedMatch && (
          <MatchDetailsPopup
            match={selectedMatch}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * BracketRound - Single round column
 */
const BracketRound = ({ round, roundIndex, totalRounds, currentPlayerId, onMatchClick }) => {
  const isFinalsRound = roundIndex === totalRounds - 1

  return (
    <div className="flex flex-col justify-around min-w-[280px]">
      {/* Round Header */}
      <div className="mb-4 text-center">
        <h3 className="font-display text-lg font-black uppercase tracking-tight text-cyan-neon">
          {round.name}
        </h3>
        <p className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
          Best of {round.bestOf}
        </p>
      </div>

      {/* Matches */}
      <div className="space-y-8 flex-1 flex flex-col justify-around">
        {round.matches.map((match, matchIndex) => (
          <MatchCard
            key={match.id}
            match={match}
            isFinalsRound={isFinalsRound}
            currentPlayerId={currentPlayerId}
            onClick={() => onMatchClick(match)}
            delay={matchIndex * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * MatchCard - Individual match display
 */
const MatchCard = ({ match, isFinalsRound, currentPlayerId, onClick, delay }) => {
  const isPlayerInMatch = match.player1?.id === currentPlayerId || match.player2?.id === currentPlayerId
  const winner = match.winner
  const isCompleted = match.status === 'completed'
  const isActive = match.status === 'active'

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
        background: isPlayerInMatch
          ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), transparent)'
          : 'rgba(5, 5, 5, 0.6)',
        border: isPlayerInMatch
          ? '2px solid #00e5ff'
          : isActive
          ? '1px solid rgba(250, 204, 21, 0.6)'
          : '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: isActive ? '0 0 20px rgba(250, 204, 21, 0.4)' : 'none'
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      whileHover={{ scale: 1.02, borderColor: '#00e5ff' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active Match Pulse */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.1), transparent)',
            pointerEvents: 'none'
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Player 1 */}
      <div
        className="p-3 border-b"
        style={{
          borderColor: 'rgba(0, 229, 255, 0.2)',
          background: winner === 'player1' ? 'rgba(250, 204, 21, 0.1)' : 'transparent'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {winner === 'player1' && <Crown className="w-4 h-4 text-warning-yellow flex-shrink-0" />}
            <span
              className={`font-display font-bold text-sm truncate ${
                winner === 'player1' ? 'text-warning-yellow' : 'text-cyan-neon'
              }`}
            >
              {match.player1?.name || 'TBD'}
            </span>
          </div>
          <span
            className={`font-display text-lg font-black ml-2 ${
              winner === 'player1' ? 'text-warning-yellow' : 'text-cyan-dim'
            }`}
          >
            {match.player1?.score ?? '-'}
          </span>
        </div>
      </div>

      {/* VS Separator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{
            background: 'rgba(5, 5, 5, 0.9)',
            border: '1px solid rgba(0, 229, 255, 0.4)'
          }}
        >
          <Swords className="w-4 h-4 text-cyan-neon" />
        </div>
      </div>

      {/* Player 2 */}
      <div
        className="p-3"
        style={{
          background: winner === 'player2' ? 'rgba(250, 204, 21, 0.1)' : 'transparent'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {winner === 'player2' && <Crown className="w-4 h-4 text-warning-yellow flex-shrink-0" />}
            <span
              className={`font-display font-bold text-sm truncate ${
                winner === 'player2' ? 'text-warning-yellow' : 'text-cyan-neon'
              }`}
            >
              {match.player2?.name || 'TBD'}
            </span>
          </div>
          <span
            className={`font-display text-lg font-black ml-2 ${
              winner === 'player2' ? 'text-warning-yellow' : 'text-cyan-dim'
            }`}
          >
            {match.player2?.score ?? '-'}
          </span>
        </div>
      </div>

      {/* Finals Badge */}
      {isFinalsRound && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div
            className="px-3 py-1 rounded font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: 'linear-gradient(to right, #facc15, #ff003c)',
              color: '#050505'
            }}
          >
            FINALS
          </div>
        </div>
      )}
    </motion.div>
  )
}

/**
 * MatchDetailsPopup - Detailed match information
 */
const MatchDetailsPopup = ({ match, onClose }) => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t"
      style={{
        background: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(0, 229, 255, 0.4)'
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-display text-xl font-black uppercase text-cyan-neon mb-1">
            Match Details
          </h4>
          <p className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
            {match.status === 'completed' ? 'COMPLETED' : match.status === 'active' ? 'IN PROGRESS' : 'PENDING'}
          </p>
        </div>
        <motion.button
          className="w-8 h-8 flex items-center justify-center rounded"
          style={{
            background: 'rgba(255, 0, 60, 0.2)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4 text-critical-red" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="p-4 rounded"
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}
        >
          <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2">
            Player 1
          </div>
          <div className="font-display text-lg font-black text-cyan-neon">
            {match.player1?.name || 'TBD'}
          </div>
          {match.player1 && (
            <div className="font-mono text-sm text-cyan-dim mt-1">
              Score: {match.player1.score ?? 0}
            </div>
          )}
        </div>

        <div
          className="p-4 rounded"
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}
        >
          <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2">
            Player 2
          </div>
          <div className="font-display text-lg font-black text-cyan-neon">
            {match.player2?.name || 'TBD'}
          </div>
          {match.player2 && (
            <div className="font-mono text-sm text-cyan-dim mt-1">
              Score: {match.player2.score ?? 0}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Generate mock bracket data
 */
const generateMockBracket = (size) => {
  const rounds = Math.log2(size)
  const bracketRounds = []

  for (let i = 0; i < rounds; i++) {
    const matchesInRound = size / Math.pow(2, i + 1)
    const roundName = i === rounds - 1 ? 'FINALS' : i === rounds - 2 ? 'SEMIFINALS' : i === rounds - 3 ? 'QUARTERFINALS' : `ROUND ${i + 1}`

    const matches = []
    for (let j = 0; j < matchesInRound; j++) {
      matches.push({
        id: `r${i}-m${j}`,
        player1: i === 0 ? { id: `p${j * 2}`, name: `Player ${j * 2 + 1}`, score: Math.floor(Math.random() * 3) } : null,
        player2: i === 0 ? { id: `p${j * 2 + 1}`, name: `Player ${j * 2 + 2}`, score: Math.floor(Math.random() * 3) } : null,
        winner: i === 0 && Math.random() > 0.5 ? 'player1' : i === 0 ? 'player2' : null,
        status: i === 0 ? 'completed' : i === 1 ? 'active' : 'pending'
      })
    }

    bracketRounds.push({
      name: roundName,
      bestOf: i === rounds - 1 ? 5 : 3,
      matches
    })
  }

  return { rounds: bracketRounds }
}

/**
 * Find player's match in bracket
 */
const findPlayerMatch = (bracket, playerId) => {
  for (const round of bracket.rounds) {
    for (const match of round.matches) {
      if (match.player1?.id === playerId || match.player2?.id === playerId) {
        return match
      }
    }
  }
  return null
}

export default TournamentBracket
