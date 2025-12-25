/**
 * Items Database - Equipment, Consumables, and Upgrades
 * Phase 3: Economy System
 */

// Item Categories
export const ITEM_CATEGORIES = {
  WEAPON: 'weapon',
  ARMOR: 'armor',
  CONSUMABLE: 'consumable',
  UPGRADE: 'upgrade',
  COSMETIC: 'cosmetic'
}

// Item Rarities (matches hero rarity system)
export const ITEM_RARITIES = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic'
}

// Rarity Colors
export const RARITY_COLORS = {
  common: '#94a3b8',      // Slate
  rare: '#3b82f6',        // Blue
  epic: '#a855f7',        // Purple
  legendary: '#facc15',   // Yellow
  mythic: '#ff003c'       // Red
}

/**
 * Items Database
 */
export const items = [
  // ==================== WEAPONS ====================
  {
    id: 'weapon-001',
    name: 'Neural Blade',
    category: ITEM_CATEGORIES.WEAPON,
    rarity: ITEM_RARITIES.RARE,
    price: 5000,
    description: 'High-frequency plasma sword. Increases STR by 15.',
    stats: { str: 15, agi: 0, int: 0, sta: 0 },
    icon: '⚔️',
    equipped: false,
    owned: false,
    slot: 'weapon'
  },
  {
    id: 'weapon-002',
    name: 'Quantum Rifle',
    category: ITEM_CATEGORIES.WEAPON,
    rarity: ITEM_RARITIES.EPIC,
    price: 12000,
    description: 'Long-range particle accelerator. Increases AGI by 20, INT by 10.',
    stats: { str: 0, agi: 20, int: 10, sta: 0 },
    icon: '🔫',
    equipped: false,
    owned: false,
    slot: 'weapon'
  },
  {
    id: 'weapon-003',
    name: 'Void Hammer',
    category: ITEM_CATEGORIES.WEAPON,
    rarity: ITEM_RARITIES.LEGENDARY,
    price: 25000,
    description: 'Graviton-powered war hammer. Massive STR boost (+35).',
    stats: { str: 35, agi: -5, int: 0, sta: 10 },
    icon: '🔨',
    equipped: false,
    owned: false,
    slot: 'weapon'
  },

  // ==================== ARMOR ====================
  {
    id: 'armor-001',
    name: 'Tactical Vest',
    category: ITEM_CATEGORIES.ARMOR,
    rarity: ITEM_RARITIES.COMMON,
    price: 2000,
    description: 'Basic protection. Increases STA by 8.',
    stats: { str: 0, agi: 0, int: 0, sta: 8 },
    icon: '🛡️',
    equipped: false,
    owned: false,
    slot: 'armor'
  },
  {
    id: 'armor-002',
    name: 'Cyber Exo-Suit',
    category: ITEM_CATEGORIES.ARMOR,
    rarity: ITEM_RARITIES.EPIC,
    price: 15000,
    description: 'Advanced nano-fiber suit. Balanced stat boost.',
    stats: { str: 10, agi: 10, int: 5, sta: 20 },
    icon: '🦾',
    equipped: false,
    owned: false,
    slot: 'armor'
  },
  {
    id: 'armor-003',
    name: 'Void Plate',
    category: ITEM_CATEGORIES.ARMOR,
    rarity: ITEM_RARITIES.LEGENDARY,
    price: 30000,
    description: 'Impenetrable energy shield. Maximum STA (+40).',
    stats: { str: 5, agi: -10, int: 0, sta: 40 },
    icon: '⚡',
    equipped: false,
    owned: false,
    slot: 'armor'
  },

  // ==================== CONSUMABLES ====================
  {
    id: 'consumable-001',
    name: 'Neural Boost',
    category: ITEM_CATEGORIES.CONSUMABLE,
    rarity: ITEM_RARITIES.COMMON,
    price: 500,
    description: 'Temporary INT boost for 1 hour. +10 INT.',
    stats: { str: 0, agi: 0, int: 10, sta: 0 },
    duration: 3600, // 1 hour in seconds
    icon: '💊',
    equipped: false,
    owned: false,
    consumable: true
  },
  {
    id: 'consumable-002',
    name: 'Adrenaline Shot',
    category: ITEM_CATEGORIES.CONSUMABLE,
    rarity: ITEM_RARITIES.RARE,
    price: 1500,
    description: 'Combat stimulant. +15 AGI, +10 STR for 30 minutes.',
    stats: { str: 10, agi: 15, int: 0, sta: 0 },
    duration: 1800, // 30 minutes
    icon: '💉',
    equipped: false,
    owned: false,
    consumable: true
  },
  {
    id: 'consumable-003',
    name: 'Repair Nano-Kit',
    category: ITEM_CATEGORIES.CONSUMABLE,
    rarity: ITEM_RARITIES.EPIC,
    price: 3000,
    description: 'Full restoration. Recovers all stats to 100%.',
    stats: { str: 0, agi: 0, int: 0, sta: 50 },
    duration: 0, // Instant effect
    icon: '🔧',
    equipped: false,
    owned: false,
    consumable: true
  },

  // ==================== UPGRADES ====================
  {
    id: 'upgrade-001',
    name: 'Neural Processor',
    category: ITEM_CATEGORIES.UPGRADE,
    rarity: ITEM_RARITIES.RARE,
    price: 8000,
    description: 'Permanent INT upgrade. +5 INT (stacks).',
    stats: { str: 0, agi: 0, int: 5, sta: 0 },
    icon: '🧠',
    equipped: false,
    owned: false,
    permanent: true,
    stackable: true
  },
  {
    id: 'upgrade-002',
    name: 'Muscle Augment',
    category: ITEM_CATEGORIES.UPGRADE,
    rarity: ITEM_RARITIES.RARE,
    price: 8000,
    description: 'Permanent STR upgrade. +5 STR (stacks).',
    stats: { str: 5, agi: 0, int: 0, sta: 0 },
    icon: '💪',
    equipped: false,
    owned: false,
    permanent: true,
    stackable: true
  },
  {
    id: 'upgrade-003',
    name: 'Reflex Chip',
    category: ITEM_CATEGORIES.UPGRADE,
    rarity: ITEM_RARITIES.EPIC,
    price: 12000,
    description: 'Permanent AGI upgrade. +8 AGI (stacks).',
    stats: { str: 0, agi: 8, int: 0, sta: 0 },
    icon: '⚡',
    equipped: false,
    owned: false,
    permanent: true,
    stackable: true
  },

  // ==================== COSMETICS ====================
  {
    id: 'cosmetic-001',
    name: 'Neon Visor',
    category: ITEM_CATEGORIES.COSMETIC,
    rarity: ITEM_RARITIES.RARE,
    price: 3000,
    description: 'Cyan glowing visor. Pure style, no stats.',
    stats: { str: 0, agi: 0, int: 0, sta: 0 },
    icon: '🕶️',
    equipped: false,
    owned: false,
    slot: 'cosmetic'
  },
  {
    id: 'cosmetic-002',
    name: 'Plasma Wings',
    category: ITEM_CATEGORIES.COSMETIC,
    rarity: ITEM_RARITIES.LEGENDARY,
    price: 50000,
    description: 'Holographic wings effect. Ultimate flex.',
    stats: { str: 0, agi: 0, int: 0, sta: 0 },
    icon: '🦋',
    equipped: false,
    owned: false,
    slot: 'cosmetic'
  }
]

/**
 * Get item by ID
 */
export const getItemById = (id) => {
  return items.find(item => item.id === id)
}

/**
 * Get items by category
 */
export const getItemsByCategory = (category) => {
  return items.filter(item => item.category === category)
}

/**
 * Get items by rarity
 */
export const getItemsByRarity = (rarity) => {
  return items.filter(item => item.rarity === rarity)
}

/**
 * Get owned items
 */
export const getOwnedItems = () => {
  return items.filter(item => item.owned)
}

/**
 * Get equipped items
 */
export const getEquippedItems = () => {
  return items.filter(item => item.equipped)
}

/**
 * Calculate total stats from equipped items
 */
export const calculateEquippedStats = () => {
  const equipped = getEquippedItems()
  return equipped.reduce((total, item) => ({
    str: total.str + item.stats.str,
    agi: total.agi + item.stats.agi,
    int: total.int + item.stats.int,
    sta: total.sta + item.stats.sta
  }), { str: 0, agi: 0, int: 0, sta: 0 })
}

/**
 * Get rarity color
 */
export const getRarityColor = (rarity) => {
  return RARITY_COLORS[rarity] || RARITY_COLORS.common
}

/**
 * Format price with commas
 */
export const formatPrice = (price) => {
  return price.toLocaleString()
}

export default items
