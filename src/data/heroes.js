/**
 * Hero Database
 * Each hero has stats, appearance, and metadata
 */

export const heroes = [
  {
    id: 'zephyr-01',
    name: 'Zephyr-01',
    codename: 'NEURAL STRIKER',
    league: 'chrome',
    rarity: 'legendary',
    stats: {
      str: 42,  // Strength (0-100)
      agi: 67,  // Agility (0-100)
      int: 55,  // Intelligence (0-100)
      sta: 50   // Stamina (0-100)
    },
    appearance: {
      primaryColor: '#00e5ff',    // Cyan
      secondaryColor: '#0077ff',  // Blue
      glowColor: '#00ffff',       // Bright cyan
      rimLightColor: '#0099ff'    // Rim light
    },
    dailySteps: 5240,
    targetSteps: 10000,
    description: 'Elite neural combat specialist with enhanced reflexes',
    unlocked: true
  },
  {
    id: 'nova-02',
    name: 'Nova-02',
    codename: 'PLASMA GUARDIAN',
    league: 'gold',
    rarity: 'epic',
    stats: {
      str: 78,
      agi: 34,
      int: 62,
      sta: 85
    },
    appearance: {
      primaryColor: '#a855f7',    // Purple
      secondaryColor: '#d946ef',  // Magenta
      glowColor: '#e879f9',       // Light purple
      rimLightColor: '#c084fc'    // Rim light
    },
    dailySteps: 3420,
    targetSteps: 10000,
    description: 'Heavy armor specialist with plasma shield technology',
    unlocked: true
  },
  {
    id: 'phoenix-03',
    name: 'Phoenix-03',
    codename: 'TACTICAL RECON',
    league: 'bronze',
    rarity: 'rare',
    stats: {
      str: 35,
      agi: 88,
      int: 71,
      sta: 45
    },
    appearance: {
      primaryColor: '#facc15',    // Yellow
      secondaryColor: '#fbbf24',  // Amber
      glowColor: '#fde047',       // Bright yellow
      rimLightColor: '#fcd34d'    // Rim light
    },
    dailySteps: 7890,
    targetSteps: 10000,
    description: 'Stealth operative with advanced tactical vision',
    unlocked: true
  },
  {
    id: 'crimson-04',
    name: 'Crimson-04',
    codename: 'BERSERKER CORE',
    league: 'plasma',
    rarity: 'legendary',
    stats: {
      str: 95,
      agi: 52,
      int: 38,
      sta: 92
    },
    appearance: {
      primaryColor: '#ff003c',    // Red
      secondaryColor: '#dc2626',  // Crimson
      glowColor: '#ff1744',       // Bright red
      rimLightColor: '#ef4444'    // Rim light
    },
    dailySteps: 12340,
    targetSteps: 10000,
    description: 'Aggressive frontline fighter with destructive power',
    unlocked: false  // Locked hero
  },
  {
    id: 'void-05',
    name: 'Void-05',
    codename: 'SHADOW PROTOCOL',
    league: 'aivanced',
    rarity: 'mythic',
    stats: {
      str: 82,
      agi: 91,
      int: 94,
      sta: 87
    },
    appearance: {
      primaryColor: '#6366f1',    // Indigo
      secondaryColor: '#4f46e5',  // Deep indigo
      glowColor: '#818cf8',       // Light indigo
      rimLightColor: '#7c3aed'    // Rim light
    },
    dailySteps: 15600,
    targetSteps: 10000,
    description: 'Legendary AI agent with reality manipulation abilities',
    unlocked: false  // Premium locked hero
  }
]

export const getHeroById = (id) => {
  return heroes.find(hero => hero.id === id)
}

export const getUnlockedHeroes = () => {
  return heroes.filter(hero => hero.unlocked)
}

export const getLeagueColor = (league) => {
  const colors = {
    bronze: '#cd7f32',
    chrome: '#c0c0c0',
    gold: '#ffd700',
    plasma: '#a855f7',
    aivanced: '#00e5ff'
  }
  return colors[league] || '#00e5ff'
}

export const getRarityColor = (rarity) => {
  const colors = {
    common: '#9ca3af',
    rare: '#3b82f6',
    epic: '#a855f7',
    legendary: '#facc15',
    mythic: '#ff003c'
  }
  return colors[rarity] || '#9ca3af'
}
