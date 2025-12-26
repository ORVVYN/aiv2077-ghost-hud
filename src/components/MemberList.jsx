import { motion } from 'framer-motion'
import { Crown, Shield, User } from 'lucide-react'
import { getRoleColor, formatContribution, SYNDICATE_ROLES } from '../data/syndicates'

/**
 * MemberList - Syndicate Member Roster
 * Phase 6: Neural Syndicates
 */
const MemberList = ({ members, currentPlayerId, syndicateColors }) => {
  // Sort by contribution (descending)
  const sortedMembers = [...members].sort((a, b) => b.contribution - a.contribution)

  const getRoleIcon = (role) => {
    switch (role) {
      case SYNDICATE_ROLES.LEADER:
        return <Crown className="w-4 h-4" style={{ color: getRoleColor(role) }} />
      case SYNDICATE_ROLES.OFFICER:
        return <Shield className="w-4 h-4" style={{ color: getRoleColor(role) }} />
      default:
        return <User className="w-4 h-4" style={{ color: getRoleColor(role) }} />
    }
  }

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-cyan-neon mb-1">
          MEMBERS
        </h3>
        <p className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
          {sortedMembers.length} Active Operatives
        </p>
      </div>

      {/* Member List */}
      <div className="space-y-2">
        {sortedMembers.map((member, index) => {
          const isCurrentPlayer = member.id === currentPlayerId
          const rankColor = index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : syndicateColors.primary

          return (
            <motion.div
              key={member.id}
              className="relative p-3 sm:p-4"
              style={{
                clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
                background: isCurrentPlayer
                  ? `linear-gradient(135deg, ${syndicateColors.primary}20, transparent)`
                  : 'rgba(5, 5, 5, 0.5)',
                border: isCurrentPlayer
                  ? `1px solid ${syndicateColors.primary}`
                  : `1px solid ${syndicateColors.primary}30`
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                borderColor: syndicateColors.primary,
                scale: 1.01
              }}
            >
              <div className="flex items-center gap-3">
                {/* Rank Number */}
                <div
                  className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-display font-black text-sm sm:text-base"
                  style={{
                    background: `${rankColor}20`,
                    border: `2px solid ${rankColor}`,
                    color: rankColor,
                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                  }}
                >
                  {index + 1}
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Role Icon */}
                    <div className="flex-shrink-0">
                      {getRoleIcon(member.role)}
                    </div>

                    {/* Name */}
                    <div
                      className="font-display font-bold text-sm sm:text-base truncate"
                      style={{ color: getRoleColor(member.role) }}
                    >
                      {member.name}
                    </div>

                    {/* Current Player Badge */}
                    {isCurrentPlayer && (
                      <span
                        className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: `${syndicateColors.secondary}30`,
                          color: syndicateColors.secondary,
                          border: `1px solid ${syndicateColors.secondary}`
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-cyan-dim">
                    <div className="flex items-center gap-1">
                      <span className="text-cyan-dim/60">ID:</span>
                      <span>{member.gridId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-cyan-dim/60">Active:</span>
                      <span>{getTimeAgo(member.lastActive)}</span>
                    </div>
                  </div>
                </div>

                {/* Contribution */}
                <div className="flex-shrink-0 text-right">
                  <div className="font-mono text-[9px] sm:text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                    Contribution
                  </div>
                  <div
                    className="font-display text-base sm:text-lg font-black"
                    style={{ color: syndicateColors.primary }}
                  >
                    {formatContribution(member.contribution)}
                  </div>
                </div>
              </div>

              {/* Leader Badge Effect */}
              {member.role === SYNDICATE_ROLES.LEADER && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${getRoleColor(SYNDICATE_ROLES.LEADER)}10, transparent)`,
                    opacity: 0.5
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {sortedMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-cyan-dim/30 mx-auto mb-3" />
          <p className="font-mono text-sm text-cyan-dim/50">
            No members found
          </p>
        </div>
      )}
    </div>
  )
}

export default MemberList
