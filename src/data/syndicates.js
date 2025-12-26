/**
 * Syndicates Database - Clans and Guild System
 * Phase 6: Neural Syndicates
 */

// Syndicate Emblems
export const SYNDICATE_EMBLEMS = {
  BLADE: 'blade',
  SHIELD: 'shield',
  PHOENIX: 'phoenix',
  SKULL: 'skull',
  DRAGON: 'dragon',
  WOLF: 'wolf',
  CROWN: 'crown',
  LIGHTNING: 'lightning',
  STAR: 'star',
  HEXAGON: 'hexagon',
  INFINITY: 'infinity',
  VORTEX: 'vortex'
}

// Syndicate Member Roles
export const SYNDICATE_ROLES = {
  LEADER: 'leader',
  OFFICER: 'officer',
  MEMBER: 'member'
}

// Syndicate Level Benefits
export const SYNDICATE_LEVELS = [
  { level: 1, stepsRequired: 0, benefits: 'Basic HQ Access', aivBonus: 0 },
  { level: 2, stepsRequired: 100000, benefits: '+5% AIV Bonus for all members', aivBonus: 5 },
  { level: 3, stepsRequired: 300000, benefits: '+10% AIV Bonus', aivBonus: 10 },
  { level: 4, stepsRequired: 600000, benefits: '+15% AIV Bonus + Chat Unlock', aivBonus: 15 },
  { level: 5, stepsRequired: 1000000, benefits: '+20% AIV Bonus + Emblem Glow', aivBonus: 20 },
  { level: 6, stepsRequired: 1500000, benefits: '+25% AIV Bonus + Priority Matchmaking', aivBonus: 25 },
  { level: 7, stepsRequired: 2100000, benefits: '+30% AIV Bonus + Tournament Entry', aivBonus: 30 },
  { level: 8, stepsRequired: 2800000, benefits: '+35% AIV Bonus + Exclusive Items', aivBonus: 35 },
  { level: 9, stepsRequired: 3600000, benefits: '+40% AIV Bonus + Golden Name', aivBonus: 40 },
  { level: 10, stepsRequired: 5000000, benefits: '+50% AIV Bonus + Hall of Fame + War Room Access', aivBonus: 50 }
]

// Mock Syndicates Database
export const syndicates = [
  {
    id: 'syn-001',
    name: 'APEX Predators',
    tag: 'APEX',
    emblem: SYNDICATE_EMBLEMS.BLADE,
    colors: {
      primary: '#00e5ff',
      secondary: '#a855f7'
    },
    level: 5,
    grandReactor: {
      totalSteps: 820000,
      currentLevelSteps: 820000,
      nextLevelSteps: 1000000
    },
    members: [
      {
        id: 'player-001',
        gridId: '123456',
        name: 'CyberQueen',
        role: SYNDICATE_ROLES.LEADER,
        contribution: 145000,
        joinedDate: '2025-12-20',
        lastActive: Date.now() - 3600000 // 1 hour ago
      },
      {
        id: 'player-002',
        gridId: '234567',
        name: 'GridMaster',
        role: SYNDICATE_ROLES.OFFICER,
        contribution: 98500,
        joinedDate: '2025-12-21',
        lastActive: Date.now() - 7200000 // 2 hours ago
      },
      {
        id: 'player-003',
        gridId: '345678',
        name: 'NeuralKing',
        role: SYNDICATE_ROLES.MEMBER,
        contribution: 76200,
        joinedDate: '2025-12-22',
        lastActive: Date.now() - 300000 // 5 minutes ago
      }
    ],
    stats: {
      founded: '2025-12-15',
      totalMembers: 32,
      maxMembers: 50,
      totalContribution: 820000,
      tournamentsWon: 3,
      sectorsControlled: 4,
      ranking: 7 // Global syndicate rank
    },
    chat: {
      enabled: true,
      messages: [
        {
          id: 'msg-001',
          author: 'CyberQueen',
          authorId: 'player-001',
          type: 'user',
          text: "Let's push for level 6 everyone!",
          timestamp: Date.now() - 600000
        },
        {
          id: 'msg-002',
          type: 'system',
          text: 'GridMaster donated 5,000 steps to the Grand Reactor',
          timestamp: Date.now() - 300000
        },
        {
          id: 'msg-003',
          author: 'NeuralKing',
          authorId: 'player-003',
          type: 'user',
          text: "I'm ready for the tournament!",
          timestamp: Date.now() - 120000
        }
      ]
    },
    publicJoin: true, // Anyone can join
    description: 'Elite tactical unit. We dominate the Grid.'
  },
  {
    id: 'syn-002',
    name: 'Ninja Squad',
    tag: 'N1NJ',
    emblem: SYNDICATE_EMBLEMS.SKULL,
    colors: {
      primary: '#ff003c',
      secondary: '#facc15'
    },
    level: 7,
    grandReactor: {
      totalSteps: 2350000,
      currentLevelSteps: 250000,
      nextLevelSteps: 2800000
    },
    members: [],
    stats: {
      founded: '2025-12-10',
      totalMembers: 45,
      maxMembers: 50,
      totalContribution: 2350000,
      tournamentsWon: 8,
      sectorsControlled: 6,
      ranking: 2
    },
    chat: {
      enabled: true,
      messages: []
    },
    publicJoin: false, // Requires approval
    description: 'Stealth. Precision. Victory.'
  },
  {
    id: 'syn-003',
    name: 'Wolf Pack',
    tag: 'WOLF',
    emblem: SYNDICATE_EMBLEMS.WOLF,
    colors: {
      primary: '#a855f7',
      secondary: '#00e5ff'
    },
    level: 4,
    grandReactor: {
      totalSteps: 680000,
      currentLevelSteps: 80000,
      nextLevelSteps: 1000000
    },
    members: [],
    stats: {
      founded: '2025-12-18',
      totalMembers: 28,
      maxMembers: 50,
      totalContribution: 680000,
      tournamentsWon: 1,
      sectorsControlled: 2,
      ranking: 15
    },
    chat: {
      enabled: true,
      messages: []
    },
    publicJoin: true,
    description: 'Strength in numbers. Hunt as a pack.'
  }
]

/**
 * Get syndicate by ID
 */
export const getSyndicateById = (id) => {
  return syndicates.find(syn => syn.id === id)
}

/**
 * Get player's syndicate
 */
export const getPlayerSyndicate = (playerId) => {
  return syndicates.find(syn =>
    syn.members.some(member => member.id === playerId)
  )
}

/**
 * Get public syndicates (can join without approval)
 */
export const getPublicSyndicates = () => {
  return syndicates.filter(syn => syn.publicJoin && syn.stats.totalMembers < syn.stats.maxMembers)
}

/**
 * Get top syndicates by ranking
 */
export const getTopSyndicates = (limit = 10) => {
  return [...syndicates].sort((a, b) => a.stats.ranking - b.stats.ranking).slice(0, limit)
}

/**
 * Calculate level progress percentage
 */
export const getLevelProgress = (syndicate) => {
  const currentLevel = SYNDICATE_LEVELS[syndicate.level - 1]
  const nextLevel = SYNDICATE_LEVELS[syndicate.level]

  if (!nextLevel) return 100 // Max level

  const progress = syndicate.grandReactor.totalSteps - currentLevel.stepsRequired
  const required = nextLevel.stepsRequired - currentLevel.stepsRequired

  return (progress / required) * 100
}

/**
 * Get reactor color based on progress
 */
export const getReactorColor = (progress) => {
  if (progress < 33) return '#00e5ff' // Cyan
  if (progress < 67) return '#a855f7' // Purple
  if (progress < 100) return '#facc15' // Yellow
  return '#ff003c' // Critical Red (ready to level up!)
}

/**
 * Get member role color
 */
export const getRoleColor = (role) => {
  switch (role) {
    case SYNDICATE_ROLES.LEADER:
      return '#ffd700' // Gold
    case SYNDICATE_ROLES.OFFICER:
      return '#00e5ff' // Cyan
    case SYNDICATE_ROLES.MEMBER:
      return '#94a3b8' // Slate
    default:
      return '#94a3b8'
  }
}

/**
 * Format contribution number
 */
export const formatContribution = (steps) => {
  if (steps >= 1000000) return `${(steps / 1000000).toFixed(1)}M`
  if (steps >= 1000) return `${(steps / 1000).toFixed(1)}K`
  return steps.toString()
}

/**
 * Check if player can donate
 */
export const canDonate = (playerSteps, minDonation = 1000) => {
  return playerSteps >= minDonation
}

/**
 * Calculate donation impact on level progress
 */
export const calculateDonationImpact = (syndicate, donationAmount) => {
  const newTotal = syndicate.grandReactor.totalSteps + donationAmount
  const currentLevel = syndicate.level
  let newLevel = currentLevel

  // Check if donation triggers level up
  for (let i = currentLevel; i < SYNDICATE_LEVELS.length; i++) {
    if (newTotal >= SYNDICATE_LEVELS[i].stepsRequired) {
      newLevel = SYNDICATE_LEVELS[i].level
    } else {
      break
    }
  }

  return {
    newTotal,
    newLevel,
    leveledUp: newLevel > currentLevel,
    levelsGained: newLevel - currentLevel
  }
}

export default syndicates
