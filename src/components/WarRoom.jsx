import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Crosshair, Lock, Unlock, TrendingUp, AlertTriangle } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * WarRoom - Sector Control Map for Syndicate Wars
 * Phase 6: Neural Syndicates - Grid Invasions
 */
const WarRoom = ({ playerSyndicate, allSyndicates, onChallenge, onClose }) => {
  const [selectedSector, setSelectedSector] = useState(null)
  const [showChallengeModal, setShowChallengeModal] = useState(false)

  // Generate 12 sector grid (4x3)
  const sectors = generateSectors(allSyndicates)

  const handleSectorClick = (sector) => {
    setSelectedSector(sector)
    telegram.impactOccurred('light')
  }

  const handleChallengeClick = () => {
    if (!canChallenge(playerSyndicate, selectedSector)) {
      telegram.notificationOccurred('error')
      return
    }
    setShowChallengeModal(true)
    telegram.impactOccurred('medium')
  }

  const handleConfirmChallenge = () => {
    onChallenge(selectedSector.id)
    setShowChallengeModal(false)
    setSelectedSector(null)
    telegram.impactOccurred('heavy')
  }

  // Calculate syndicate stats
  const playerSectorsControlled = sectors.filter(s => s.ownerId === playerSyndicate?.id).length
  const passiveAIVPerDay = playerSectorsControlled * 10000

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

      {/* War Room Panel */}
      <motion.div
        className="relative w-full max-w-6xl flex flex-col"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 0, 60, 0.6)',
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
        <div className="p-4 sm:p-6 border-b border-critical-red/30">
          <div className="flex items-center gap-3 mb-4">
            <Crosshair className="w-6 h-6 sm:w-8 sm:h-8 text-critical-red" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-critical-red">
                WAR ROOM
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                Sector Control • Syndicate Wars
              </p>
            </div>
          </div>

          {/* Control Stats */}
          {playerSyndicate && (
            <div className="grid grid-cols-3 gap-3">
              <div
                className="p-3 rounded"
                style={{
                  background: 'rgba(5, 5, 5, 0.5)',
                  border: `1px solid ${playerSyndicate.colors.primary}40`
                }}
              >
                <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                  Sectors Controlled
                </div>
                <div className="font-display text-xl font-black" style={{ color: playerSyndicate.colors.primary }}>
                  {playerSectorsControlled}/12
                </div>
              </div>

              <div
                className="p-3 rounded"
                style={{
                  background: 'rgba(5, 5, 5, 0.5)',
                  border: '1px solid rgba(250, 204, 21, 0.4)'
                }}
              >
                <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                  Daily Passive AIV
                </div>
                <div className="font-display text-xl font-black text-warning-yellow">
                  {passiveAIVPerDay.toLocaleString()}
                </div>
              </div>

              <div
                className="p-3 rounded"
                style={{
                  background: 'rgba(5, 5, 5, 0.5)',
                  border: '1px solid rgba(0, 229, 255, 0.4)'
                }}
              >
                <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                  Syndicate Level
                </div>
                <div className="font-display text-xl font-black text-cyan-neon">
                  {playerSyndicate.level}/10
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sector Grid */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sectors.map((sector, index) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                isSelected={selectedSector?.id === sector.id}
                playerSyndicate={playerSyndicate}
                onClick={() => handleSectorClick(sector)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Sector Details & Challenge */}
        {selectedSector && (
          <div className="p-4 sm:p-6 border-t border-cyan-neon/30">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-cyan-neon mb-1">
                  {selectedSector.name}
                </h3>
                <p className="font-mono text-xs text-cyan-dim mb-2">
                  {selectedSector.ownerId ? (
                    <>
                      Controlled by{' '}
                      <span style={{ color: selectedSector.ownerColors?.primary }}>
                        [{selectedSector.ownerTag}]
                      </span>
                    </>
                  ) : (
                    <span className="text-warning-yellow">UNCLAIMED TERRITORY</span>
                  )}
                </p>
                <div className="font-mono text-sm text-cyan-dim">
                  Passive AIV: <span className="text-warning-yellow font-bold">10,000/day</span>
                </div>
              </div>

              {playerSyndicate && (
                <motion.button
                  className="px-6 py-3 font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    background: canChallenge(playerSyndicate, selectedSector)
                      ? 'linear-gradient(to right, #ff003c, #facc15)'
                      : 'rgba(100, 100, 100, 0.3)',
                    color: canChallenge(playerSyndicate, selectedSector) ? '#050505' : '#666',
                    cursor: canChallenge(playerSyndicate, selectedSector) ? 'pointer' : 'not-allowed'
                  }}
                  onClick={handleChallengeClick}
                  disabled={!canChallenge(playerSyndicate, selectedSector)}
                  whileHover={canChallenge(playerSyndicate, selectedSector) ? { scale: 1.02 } : {}}
                  whileTap={canChallenge(playerSyndicate, selectedSector) ? { scale: 0.98 } : {}}
                >
                  {canChallenge(playerSyndicate, selectedSector) ? (
                    <>
                      <Crosshair className="w-4 h-4" />
                      CHALLENGE
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      {playerSyndicate.level < 7 ? 'LEVEL 7 REQUIRED' : 'ALREADY OWNED'}
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Challenge Confirmation Modal */}
      <AnimatePresence>
        {showChallengeModal && selectedSector && (
          <ChallengeModal
            sector={selectedSector}
            playerSyndicate={playerSyndicate}
            onConfirm={handleConfirmChallenge}
            onCancel={() => setShowChallengeModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * SectorCard - Individual sector display
 */
const SectorCard = ({ sector, isSelected, playerSyndicate, onClick, delay }) => {
  const isOwned = sector.ownerId === playerSyndicate?.id
  const isFree = !sector.ownerId

  return (
    <motion.div
      className="relative aspect-square cursor-pointer"
      style={{
        clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
        background: isFree
          ? 'rgba(5, 5, 5, 0.6)'
          : isOwned
          ? `linear-gradient(135deg, ${sector.ownerColors?.primary}20, transparent)`
          : 'rgba(5, 5, 5, 0.4)',
        border: isSelected
          ? '2px solid #00e5ff'
          : isFree
          ? '1px solid rgba(250, 204, 21, 0.4)'
          : `1px solid ${sector.ownerColors?.primary}60`,
        boxShadow: isSelected ? '0 0 20px rgba(0, 229, 255, 0.6)' : 'none'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onClick={onClick}
      whileHover={{ scale: 1.05, borderColor: '#00e5ff' }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sector Icon */}
      <div className="absolute top-3 right-3">
        {isFree ? (
          <Unlock className="w-4 h-4 text-warning-yellow" />
        ) : isOwned ? (
          <TrendingUp className="w-4 h-4" style={{ color: sector.ownerColors?.primary }} />
        ) : (
          <Lock className="w-4 h-4 text-critical-red" />
        )}
      </div>

      {/* Sector Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
        <div className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-cyan-neon mb-1">
          {sector.name}
        </div>
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-2" style={{ color: sector.ownerColors?.primary || '#facc15' }}>
          {sector.ownerId ? `[${sector.ownerTag}]` : 'FREE'}
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-cyan-dim">
          +10K AIV/day
        </div>
      </div>

      {/* Owned Badge */}
      {isOwned && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${sector.ownerColors?.primary}20, transparent)`,
            opacity: 0.5
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}

/**
 * ChallengeModal - Confirmation dialog for sector challenge
 */
const ChallengeModal = ({ sector, playerSyndicate, onConfirm, onCancel }) => {
  const challengeCost = 50000 // AIV cost to challenge

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-obsidian/80"
        onClick={onCancel}
      />

      <motion.div
        className="relative w-full max-w-md p-6 rounded"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 0, 60, 0.6)'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-critical-red" />
          <h3 className="font-display text-xl font-black uppercase text-critical-red">
            CHALLENGE SECTOR
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          <p className="font-mono text-sm text-cyan-dim">
            You are about to challenge{' '}
            <span className="text-cyan-neon font-bold">{sector.name}</span>
            {sector.ownerId && (
              <>
                {' '}currently controlled by{' '}
                <span style={{ color: sector.ownerColors?.primary }} className="font-bold">
                  [{sector.ownerTag}]
                </span>
              </>
            )}
          </p>

          <div
            className="p-4 rounded"
            style={{
              background: 'rgba(255, 0, 60, 0.1)',
              border: '1px solid rgba(255, 0, 60, 0.3)'
            }}
          >
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2">
              Challenge Requirements:
            </div>
            <ul className="space-y-1 font-mono text-sm text-cyan-neon">
              <li>• Entry Fee: <span className="text-warning-yellow">{challengeCost.toLocaleString()} AIV</span></li>
              <li>• Format: Best of 3 (3v3)</li>
              <li>• Scheduled: 24h notice</li>
              <li>• Rewards: Sector control + daily passive AIV</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            className="flex-1 py-3 font-mono text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.6)',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              color: '#00e5ff'
            }}
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CANCEL
          </motion.button>

          <motion.button
            className="flex-1 py-3 font-display font-bold text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: 'linear-gradient(to right, #ff003c, #facc15)',
              color: '#050505'
            }}
            onClick={onConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CONFIRM CHALLENGE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Generate 12 sectors
 */
const generateSectors = (syndicates) => {
  const sectorNames = [
    'SEC-ALPHA', 'SEC-BETA', 'SEC-GAMMA', 'SEC-DELTA',
    'SEC-EPSILON', 'SEC-ZETA', 'SEC-ETA', 'SEC-THETA',
    'SEC-IOTA', 'SEC-KAPPA', 'SEC-LAMBDA', 'SEC-MU'
  ]

  return sectorNames.map((name, index) => {
    const owner = index < 3 ? syndicates[index % syndicates.length] : null
    return {
      id: `sector-${index + 1}`,
      name,
      ownerId: owner?.id || null,
      ownerTag: owner?.tag || null,
      ownerColors: owner?.colors || null
    }
  })
}

/**
 * Check if syndicate can challenge sector
 */
const canChallenge = (syndicate, sector) => {
  if (!syndicate) return false
  if (syndicate.level < 7) return false // Requires level 7+
  if (sector.ownerId === syndicate.id) return false // Can't challenge own sector
  return true
}

export default WarRoom
