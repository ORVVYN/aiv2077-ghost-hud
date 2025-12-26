import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Search, Users, TrendingUp, Shield, Lock, Unlock } from 'lucide-react'
import { getPublicSyndicates, getTopSyndicates } from '../data/syndicates'
import telegram from '../utils/telegram'

/**
 * SyndicateBrowser - Browse and Join Syndicates
 * Phase 6: Neural Syndicates
 */
const SyndicateBrowser = ({ onClose, onJoin }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('public') // public | top | all
  const [selectedSyndicate, setSelectedSyndicate] = useState(null)

  const publicSyndicates = getPublicSyndicates()
  const topSyndicates = getTopSyndicates()

  const getSyndicates = () => {
    let syndicates = filterType === 'public' ? publicSyndicates : filterType === 'top' ? topSyndicates : [...publicSyndicates, ...topSyndicates]

    if (searchQuery) {
      syndicates = syndicates.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return syndicates
  }

  const handleJoinClick = (syndicate) => {
    telegram.impactOccurred('heavy')
    onJoin(syndicate.id)
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

      {/* Browser Panel */}
      <motion.div
        className="relative w-full max-w-6xl flex flex-col"
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
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-neon" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-cyan-neon">
                SYNDICATE BROWSER
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                Discover Elite Organizations
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-dim" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or tag..."
                className="w-full pl-10 pr-4 py-2 font-mono text-sm text-cyan-neon bg-obsidian rounded outline-none"
                style={{ border: '1px solid rgba(0, 229, 255, 0.3)' }}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['public', 'top', 'all'].map((type) => (
                <motion.button
                  key={type}
                  className="px-4 py-2 font-mono text-xs uppercase tracking-wider rounded"
                  style={{
                    background: filterType === type ? 'rgba(0, 229, 255, 0.2)' : 'rgba(5, 5, 5, 0.6)',
                    border: filterType === type ? '1px solid #00e5ff' : '1px solid rgba(0, 229, 255, 0.3)',
                    color: filterType === type ? '#00e5ff' : '#94a3b8'
                  }}
                  onClick={() => setFilterType(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Syndicate Grid */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSyndicates().map((syndicate, index) => (
              <SyndicateCard
                key={syndicate.id}
                syndicate={syndicate}
                onJoin={handleJoinClick}
                delay={index * 0.05}
              />
            ))}
          </div>

          {/* Empty State */}
          {getSyndicates().length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-cyan-dim/30 mx-auto mb-4" />
              <p className="font-mono text-sm text-cyan-dim/50">
                No syndicates found
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * SyndicateCard - Preview card for syndicate
 */
const SyndicateCard = ({ syndicate, onJoin, delay }) => {
  const isFull = syndicate.stats.totalMembers >= syndicate.stats.maxMembers
  const canJoin = syndicate.publicJoin && !isFull

  return (
    <motion.div
      className="relative p-4 flex flex-col"
      style={{
        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
        background: 'rgba(5, 5, 5, 0.6)',
        border: `1px solid ${syndicate.colors.primary}60`,
        minHeight: '280px'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ borderColor: syndicate.colors.primary, scale: 1.02 }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${syndicate.colors.primary}, transparent)`
        }}
      />

      <div className="relative flex-1 flex flex-col">
        {/* Emblem & Info */}
        <div className="flex items-start gap-3 mb-3">
          {/* Emblem */}
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${syndicate.colors.primary}20, ${syndicate.colors.secondary}20)`,
              border: `2px solid ${syndicate.colors.primary}`,
              boxShadow: `0 0 15px ${syndicate.colors.primary}40`
            }}
            animate={{
              boxShadow: [
                `0 0 15px ${syndicate.colors.primary}40`,
                `0 0 25px ${syndicate.colors.primary}60`,
                `0 0 15px ${syndicate.colors.primary}40`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-6 h-6" style={{ color: syndicate.colors.primary }} />
          </motion.div>

          {/* Name & Tag */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-display text-lg font-black uppercase tracking-tight truncate mb-1"
              style={{ color: syndicate.colors.primary }}
            >
              {syndicate.name}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                style={{
                  background: `${syndicate.colors.secondary}30`,
                  color: syndicate.colors.secondary,
                  border: `1px solid ${syndicate.colors.secondary}60`
                }}
              >
                [{syndicate.tag}]
              </span>
              {!syndicate.publicJoin && (
                <Lock className="w-3 h-3 text-warning-yellow" />
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div
            className="p-2 rounded"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${syndicate.colors.primary}30`
            }}
          >
            <div className="font-mono text-[9px] text-cyan-dim uppercase tracking-wider mb-1">
              Level
            </div>
            <div className="font-display text-base font-black" style={{ color: syndicate.colors.primary }}>
              {syndicate.level}/10
            </div>
          </div>

          <div
            className="p-2 rounded"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${syndicate.colors.primary}30`
            }}
          >
            <div className="font-mono text-[9px] text-cyan-dim uppercase tracking-wider mb-1">
              Rank
            </div>
            <div className="font-display text-base font-black text-warning-yellow">
              #{syndicate.stats.ranking}
            </div>
          </div>

          <div
            className="p-2 rounded"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${syndicate.colors.primary}30`
            }}
          >
            <div className="font-mono text-[9px] text-cyan-dim uppercase tracking-wider mb-1">
              Members
            </div>
            <div className="font-display text-base font-black text-cyan-neon">
              {syndicate.stats.totalMembers}/{syndicate.stats.maxMembers}
            </div>
          </div>

          <div
            className="p-2 rounded"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${syndicate.colors.primary}30`
            }}
          >
            <div className="font-mono text-[9px] text-cyan-dim uppercase tracking-wider mb-1">
              Victories
            </div>
            <div className="font-display text-base font-black" style={{ color: syndicate.colors.secondary }}>
              {syndicate.stats.tournamentsWon}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-cyan-dim font-mono mb-3 line-clamp-2 flex-1">
          {syndicate.description}
        </p>

        {/* Join Button */}
        <motion.button
          className="w-full py-2 font-display font-bold text-sm uppercase tracking-wider"
          style={{
            clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
            background: canJoin
              ? `linear-gradient(to right, ${syndicate.colors.primary}, ${syndicate.colors.secondary})`
              : 'rgba(100, 100, 100, 0.3)',
            color: canJoin ? '#050505' : '#666',
            cursor: canJoin ? 'pointer' : 'not-allowed'
          }}
          onClick={() => canJoin && onJoin(syndicate)}
          disabled={!canJoin}
          whileHover={canJoin ? { scale: 1.02 } : {}}
          whileTap={canJoin ? { scale: 0.98 } : {}}
        >
          {isFull ? 'FULL' : !syndicate.publicJoin ? 'PRIVATE' : 'JOIN'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default SyndicateBrowser
