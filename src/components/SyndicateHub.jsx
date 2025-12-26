import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, MessageSquare, TrendingUp, Shield } from 'lucide-react'
import { getSyndicateById, getLevelProgress, getReactorColor, formatContribution, SYNDICATE_LEVELS } from '../data/syndicates'
import GrandReactor from './GrandReactor'
import MemberList from './MemberList'
import SyndicateChat from './SyndicateChat'
import DonateStepsModal from './DonateStepsModal'
import telegram from '../utils/telegram'

/**
 * SyndicateHub - Elite Syndicate HQ
 * Phase 6: Neural Syndicates
 */
const SyndicateHub = ({ syndicateId, playerId, playerSteps, onClose, onDonate, onLeave }) => {
  const [showChat, setShowChat] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [syndicate, setSyndicate] = useState(getSyndicateById(syndicateId))

  if (!syndicate) {
    return (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="text-cyan-dim">Syndicate not found</div>
      </motion.div>
    )
  }

  const levelProgress = getLevelProgress(syndicate)
  const reactorColor = getReactorColor(levelProgress)
  const currentLevel = SYNDICATE_LEVELS[syndicate.level - 1]
  const nextLevel = SYNDICATE_LEVELS[syndicate.level]

  const handleDonateClick = () => {
    telegram.impactOccurred('medium')
    setShowDonateModal(true)
  }

  const handleDonateConfirm = (amount) => {
    onDonate(syndicateId, amount)
    setShowDonateModal(false)

    // Update local syndicate state
    const updated = getSyndicateById(syndicateId)
    setSyndicate(updated)

    telegram.notificationOccurred('success')
  }

  const handleLeave = () => {
    if (confirm('Are you sure you want to leave this syndicate?')) {
      telegram.impactOccurred('heavy')
      onLeave(syndicateId)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
      style={{
        paddingTop: 'env(safe-area-inset-top, 1rem)',
        paddingBottom: 'env(safe-area-inset-bottom, 1rem)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Glass Blur Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(25px)',
          backgroundColor: 'rgba(5, 5, 5, 0.6)'
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Syndicate HQ Panel */}
      <motion.div
        className="relative w-full max-w-6xl flex flex-col overflow-hidden"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: `1px solid ${syndicate.colors.primary}60`,
          maxHeight: '85vh'
        }}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* SCANLINE REVEAL EFFECT */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${syndicate.colors.primary}40 50%, transparent 100%)`,
            height: '30px'
          }}
          initial={{ y: '-30px' }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Close Button */}
        <motion.button
          className="absolute top-3 sm:top-6 right-3 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 z-20"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 0, 60, 1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-critical-red" strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <div className="relative p-4 sm:p-6 border-b" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <div className="flex items-start gap-4">
            {/* Syndicate Emblem */}
            <motion.div
              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${syndicate.colors.primary}20, ${syndicate.colors.secondary}20)`,
                border: `2px solid ${syndicate.colors.primary}`,
                boxShadow: `0 0 20px ${syndicate.colors.primary}60`
              }}
              animate={{
                boxShadow: [
                  `0 0 20px ${syndicate.colors.primary}60`,
                  `0 0 30px ${syndicate.colors.primary}80`,
                  `0 0 20px ${syndicate.colors.primary}60`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: syndicate.colors.primary }} />
            </motion.div>

            {/* Syndicate Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2
                  className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight truncate"
                  style={{ color: syndicate.colors.primary }}
                >
                  {syndicate.name}
                </h2>
                <span
                  className="font-mono text-xs sm:text-sm font-bold px-2 py-0.5 rounded"
                  style={{
                    background: `${syndicate.colors.secondary}30`,
                    color: syndicate.colors.secondary,
                    border: `1px solid ${syndicate.colors.secondary}60`
                  }}
                >
                  [{syndicate.tag}]
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-cyan-dim">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Level {syndicate.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{syndicate.stats.totalMembers}/{syndicate.stats.maxMembers} Members</span>
                </div>
                <div>Rank #{syndicate.stats.ranking}</div>
              </div>

              <p className="text-xs sm:text-sm text-cyan-dim/70 mt-2 line-clamp-2">
                {syndicate.description}
              </p>
            </div>
          </div>
        </div>

        {/* Grand Reactor Section */}
        <div className="p-4 sm:p-6 border-b" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <GrandReactor
            syndicate={syndicate}
            reactorColor={reactorColor}
            levelProgress={levelProgress}
          />
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <MemberList
            members={syndicate.members}
            currentPlayerId={playerId}
            syndicateColors={syndicate.colors}
          />
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 border-t flex gap-3" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <motion.button
            className="flex-1 py-3 font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: `linear-gradient(to right, ${syndicate.colors.primary}, ${syndicate.colors.secondary})`,
              color: '#050505'
            }}
            onClick={handleDonateClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-4 h-4" />
            DONATE STEPS
          </motion.button>

          <motion.button
            className="flex-1 py-3 font-mono text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${syndicate.colors.primary}40`,
              color: syndicate.colors.primary
            }}
            onClick={() => setShowChat(!showChat)}
            whileHover={{ scale: 1.02, borderColor: syndicate.colors.primary }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            {showChat ? 'CLOSE CHAT' : 'OPEN CHAT'}
          </motion.button>

          <motion.button
            className="py-3 px-4 font-mono text-xs uppercase tracking-wider"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.6)',
              border: '1px solid rgba(255, 0, 60, 0.4)',
              color: '#ff003c'
            }}
            onClick={handleLeave}
            whileHover={{ scale: 1.02, borderColor: '#ff003c' }}
            whileTap={{ scale: 0.98 }}
          >
            LEAVE
          </motion.button>
        </div>
      </motion.div>

      {/* Donate Steps Modal */}
      <AnimatePresence>
        {showDonateModal && (
          <DonateStepsModal
            syndicate={syndicate}
            playerSteps={playerSteps}
            onConfirm={handleDonateConfirm}
            onClose={() => setShowDonateModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Syndicate Chat */}
      <AnimatePresence>
        {showChat && (
          <SyndicateChat
            syndicate={syndicate}
            playerId={playerId}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SyndicateHub
