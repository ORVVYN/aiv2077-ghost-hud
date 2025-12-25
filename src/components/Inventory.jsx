import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Shield, Pill, Zap, Sparkles, Package as PackageIcon, X, Check, Database } from 'lucide-react'
import { getOwnedItems, getEquippedItems, calculateEquippedStats, getRarityColor, ITEM_CATEGORIES } from '../data/items'
import telegram from '../utils/telegram'

/**
 * Inventory - AAA Tactical Item Management
 * Phase 3: Economy System with ZZO-Style Visual Overhaul + Glass Blur HUD
 */
const Inventory = ({ onEquip, onUnequip, onUse, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showItemDetail, setShowItemDetail] = useState(false)

  const ownedItems = getOwnedItems()
  const equippedItems = getEquippedItems()
  const totalStats = calculateEquippedStats()

  // Filter items by tab
  const filteredItems = selectedTab === 'all'
    ? ownedItems
    : selectedTab === 'equipped'
    ? equippedItems
    : ownedItems.filter(item => item.category === selectedTab)

  // Handle item click
  const handleItemClick = (item) => {
    telegram.impactOccurred('medium')
    setSelectedItem(item)
    setShowItemDetail(true)
  }

  // Handle equip/unequip
  const handleToggleEquip = () => {
    if (!selectedItem) return

    telegram.impactOccurred('heavy')

    if (selectedItem.equipped) {
      onUnequip(selectedItem)
    } else {
      onEquip(selectedItem)
    }

    setShowItemDetail(false)
    setSelectedItem(null)
  }

  // Handle use consumable
  const handleUse = () => {
    if (!selectedItem || !selectedItem.consumable) return

    telegram.notificationOccurred('success')
    onUse(selectedItem)
    setShowItemDetail(false)
    setSelectedItem(null)
  }

  // Get category icon - NEON BLUEPRINT STYLE
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case ITEM_CATEGORIES.WEAPON: return <Sword className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.ARMOR: return <Shield className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.CONSUMABLE: return <Pill className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.UPGRADE: return <Zap className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      default: return <Database className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
    }
  }

  // Get item icon - NEON BLUEPRINT STYLE ONLY
  const getItemIcon = (item) => {
    if (item.category === ITEM_CATEGORIES.WEAPON) return <Sword className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.ARMOR) return <Shield className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.CONSUMABLE) return <Pill className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.UPGRADE) return <Zap className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.COSMETIC) return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} fill="none" />
    return <Database className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.2} />
  }

  const tabs = [
    { id: 'all', label: 'All Items', icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} /> },
    { id: 'equipped', label: 'Equipped', icon: <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2} /> },
    { id: ITEM_CATEGORIES.WEAPON, label: 'Weapons', icon: <Sword className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" /> },
    { id: ITEM_CATEGORIES.ARMOR, label: 'Armor', icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" /> },
    { id: ITEM_CATEGORIES.CONSUMABLE, label: 'Consumables', icon: <Pill className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" /> },
    { id: ITEM_CATEGORIES.UPGRADE, label: 'Upgrades', icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" /> }
  ]

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
      {/* Glass Blur Overlay - Hero Hub remains visible */}
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

      {/* Inventory Panel - SCANLINE REVEAL ANIMATION */}
      <motion.div
        className="relative w-full max-w-6xl flex flex-col overflow-hidden"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          maxHeight: '80vh'
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
            background: 'linear-gradient(to bottom, transparent 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)',
            height: '30px'
          }}
          initial={{ y: '-30px' }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Metadata Garnish - Top Left */}
        <div className="absolute top-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-plasma-purple/30 tracking-widest space-y-0.5">
            <div>SYS_ID: INVENTORY_v2.7.4</div>
            <div>MODULE: EQUIPMENT_MGMT</div>
            <div>STATUS: ACTIVE</div>
          </div>
        </div>

        {/* Metadata Garnish - Top Right (FAKE NETWORK DATA) */}
        <div className="absolute top-2 right-14 sm:right-20 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-plasma-purple/30 tracking-widest space-y-0.5 text-right">
            <div>LATENCY: 12ms</div>
            <div>ENCRYPTION: AES-256</div>
            <div>SIGNAL: HIGH</div>
          </div>
        </div>

        {/* Header - Skewed */}
        <div className="relative p-3 sm:p-6 pb-16 sm:pb-20 border-b border-plasma-purple/30 transform -skew-x-2">
          <div className="transform skew-x-2">
            {/* Close Button - LARGER TOUCH TARGET (44px min) */}
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

            {/* Title with CHROMATIC ABERRATION */}
            <div className="flex-1 min-w-0 mr-2">
              <div className="relative inline-block">
                {/* Chromatic Aberration - Red channel */}
                <h2 className="absolute font-display text-2xl sm:text-4xl font-black text-critical-red uppercase tracking-tight truncate opacity-30 blur-[1px]" style={{ transform: 'translate(-1px, 0)' }}>
                  Inventory
                </h2>
                {/* Chromatic Aberration - Blue channel */}
                <h2 className="absolute font-display text-2xl sm:text-4xl font-black text-cyan-neon uppercase tracking-tight truncate opacity-30 blur-[1px]" style={{ transform: 'translate(1px, 0)' }}>
                  Inventory
                </h2>
                {/* Main title */}
                <h2 className="relative font-display text-2xl sm:text-4xl font-black text-plasma-purple uppercase tracking-tight truncate">
                  Inventory
                </h2>
              </div>
              <p className="font-mono text-[9px] sm:text-xs text-cyan-dim mt-1 tracking-wider truncate">
                {'>'} EQUIPMENT MANAGEMENT SYSTEM
              </p>
            </div>

            {/* Total Stats - MOVED BELOW TITLE TO AVOID OVERLAP */}
            <motion.div
              className="relative px-3 sm:px-6 py-2 sm:py-3 overflow-hidden flex-shrink-0 mt-4"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                background: 'rgba(5, 5, 5, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(168, 85, 247, 0.4)'
              }}
            >
              <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest mb-1 sm:mb-2 text-center">
                Equipment Bonus
              </div>
              <div className="flex gap-2 sm:gap-4 justify-center">
                <div className="text-center">
                  <div className="font-mono text-[8px] sm:text-[9px] text-critical-red">STR</div>
                  <div className="font-bold text-xs sm:text-sm text-critical-red">+{totalStats.str}</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[8px] sm:text-[9px] text-cyan-neon">AGI</div>
                  <div className="font-bold text-xs sm:text-sm text-cyan-neon">+{totalStats.agi}</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[8px] sm:text-[9px] text-plasma-purple">INT</div>
                  <div className="font-bold text-xs sm:text-sm text-plasma-purple">+{totalStats.int}</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[8px] sm:text-[9px] text-warning-yellow">STA</div>
                  <div className="font-bold text-xs sm:text-sm text-warning-yellow">+{totalStats.sta}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs - MORE HORIZONTAL PADDING */}
        <div className="flex gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-4 border-b border-plasma-purple/30 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className="relative flex items-center gap-1 sm:gap-2 px-5 sm:px-8 py-2 sm:py-3 font-mono text-[9px] sm:text-xs uppercase tracking-wider whitespace-nowrap overflow-hidden flex-shrink-0"
              style={{
                clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                background: selectedTab === tab.id
                  ? 'rgba(168, 85, 247, 0.2)'
                  : 'rgba(5, 5, 5, 0.4)',
                border: selectedTab === tab.id
                  ? '2px solid rgba(168, 85, 247, 1)'
                  : '1px solid rgba(168, 85, 247, 0.3)',
                color: selectedTab === tab.id
                  ? '#a855f7'
                  : 'rgba(168, 85, 247, 0.6)'
              }}
              onClick={() => setSelectedTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-plasma-purple/0 to-plasma-purple/20 opacity-0 hover:opacity-100 transition-opacity" />
              {tab.icon}
              <span className="relative z-10">{tab.label}</span>
              {tab.id !== 'all' && (
                <span className="text-[8px] sm:text-xs opacity-70 relative z-10">
                  ({tab.id === 'equipped' ? equippedItems.length : ownedItems.filter(i => i.category === tab.id).length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Metadata Garnish - Bottom Left */}
        <div className="absolute bottom-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-plasma-purple/30 tracking-widest">
            CACHE: {filteredItems.length}/{ownedItems.length} ITEMS
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto scrollbar-thin" style={{ maxHeight: 'calc(80vh - 240px)' }}>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredItems.map((item, index) => {
                const rarityColor = getRarityColor(item.rarity)

                return (
                  <motion.div
                    key={item.id}
                    className="relative cursor-pointer overflow-hidden"
                    style={{
                      clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                      background: 'rgba(5, 5, 5, 0.5)',
                      backdropFilter: 'blur(20px)',
                      border: item.equipped
                        ? `2px solid rgba(250, 204, 21, 0.8)`
                        : `1px solid ${rarityColor}40`
                    }}
                    onClick={() => handleItemClick(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.03, borderColor: rarityColor }}
                    whileTap={{ scale: 0.97 }}
                    layout
                  >
                    {/* Holographic Grid Background */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                        backgroundSize: '10px 10px'
                      }}
                    />

                    {/* Item ID Metadata Garnish */}
                    <div className="absolute bottom-1 right-2 pointer-events-none">
                      <div className="font-mono text-[6px] sm:text-[7px] text-plasma-purple/20 tracking-widest text-right">
                        ID:{item.id.split('-')[1]}
                      </div>
                    </div>

                    {/* Equipped Badge */}
                    {item.equipped && (
                      <div className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center z-10"
                        style={{
                          clipPath: 'circle(50%)',
                          background: '#facc15'
                        }}
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-obsidian" strokeWidth={3} />
                      </div>
                    )}

                    <div className="p-3 sm:p-4">
                      {/* Item Icon - NEON BLUEPRINT Holographic Projection */}
                      <div className="relative flex items-center justify-center mb-3 group" style={{ color: rarityColor }}>
                        {/* Hologram base platform */}
                        <div className="absolute bottom-0 w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

                        {/* Icon with hologram glow - NEON OUTLINE ONLY */}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            filter: `drop-shadow(0 0 8px ${rarityColor})`
                          }}
                        >
                          {getItemIcon(item)}
                        </motion.div>

                        {/* Hologram scan lines */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage: 'linear-gradient(transparent 50%, rgba(168, 85, 247, 0.05) 50%)',
                            backgroundSize: '100% 4px'
                          }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>

                      {/* Item Name */}
                      <h3
                        className="font-display text-xs sm:text-sm font-bold uppercase text-center mb-2 line-clamp-2 tracking-tight"
                        style={{ color: rarityColor }}
                      >
                        {item.name}
                      </h3>

                      {/* Rarity */}
                      <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                        <div
                          className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                          style={{ backgroundColor: rarityColor }}
                        />
                        <span
                          className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest"
                          style={{ color: rarityColor }}
                        >
                          {item.rarity}
                        </span>
                      </div>

                      {/* Quick Stats */}
                      {(item.stats.str > 0 || item.stats.agi > 0 || item.stats.int > 0 || item.stats.sta > 0) && (
                        <div className="flex justify-center gap-1 sm:gap-2 text-xs flex-wrap">
                          {item.stats.str > 0 && <span className="text-critical-red font-mono text-[8px] sm:text-[10px]">STR+{item.stats.str}</span>}
                          {item.stats.agi > 0 && <span className="text-cyan-neon font-mono text-[8px] sm:text-[10px]">AGI+{item.stats.agi}</span>}
                          {item.stats.int > 0 && <span className="text-plasma-purple font-mono text-[8px] sm:text-[10px]">INT+{item.stats.int}</span>}
                          {item.stats.sta > 0 && <span className="text-warning-yellow font-mono text-[8px] sm:text-[10px]">STA+{item.stats.sta}</span>}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Database className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-cyan-dim/30" strokeWidth={1} />
                <p className="font-mono text-xs sm:text-sm text-cyan-dim">
                  {selectedTab === 'all' ? 'No items in Neural Cache' : `No ${selectedTab} items`}
                </p>
                <p className="font-mono text-[9px] sm:text-xs text-cyan-dim/50 mt-2">
                  Visit the Neural Market to acquire items
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {showItemDetail && selectedItem && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Glass Blur Overlay for Item Detail */}
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(5, 5, 5, 0.7)'
              }}
              onClick={() => setShowItemDetail(false)}
            />

            <motion.div
              className="relative p-6 sm:p-8 max-w-md w-full overflow-hidden"
              style={{
                clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(40px)',
                border: `2px solid ${getRarityColor(selectedItem.rarity)}`
              }}
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -90 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* SCANLINE REVEAL for Detail Modal */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-50"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${getRarityColor(selectedItem.rarity)}60 50%, transparent 100%)`,
                  height: '20px'
                }}
                initial={{ y: '-20px' }}
                animate={{ y: '100%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Item ID Metadata */}
              <div className="absolute top-2 right-4 pointer-events-none">
                <div className="font-mono text-[7px] sm:text-[8px] text-plasma-purple/30 tracking-widest text-right">
                  ITEM_ID: {selectedItem.id}
                </div>
              </div>

              <div className="text-center mb-6">
                {/* Holographic Item Icon - NEON BLUEPRINT */}
                <div
                  className="flex items-center justify-center mb-4 relative"
                  style={{ color: getRarityColor(selectedItem.rarity) }}
                >
                  {/* Hologram base platform */}
                  <div className="absolute bottom-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: `drop-shadow(0 0 12px ${getRarityColor(selectedItem.rarity)})`
                    }}
                  >
                    {getItemIcon(selectedItem)}
                  </motion.div>

                  {/* Hologram scan lines */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(transparent 50%, ${getRarityColor(selectedItem.rarity)}10 50%)`,
                      backgroundSize: '100% 6px'
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                <h3
                  className="font-display text-2xl sm:text-3xl font-black uppercase mb-2 tracking-tight"
                  style={{ color: getRarityColor(selectedItem.rarity) }}
                >
                  {selectedItem.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: getRarityColor(selectedItem.rarity) }}
                  />
                  <span
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-widest"
                    style={{ color: getRarityColor(selectedItem.rarity) }}
                  >
                    {selectedItem.rarity}
                  </span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-cyan-dim mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Stats Detail */}
                {(selectedItem.stats.str !== 0 || selectedItem.stats.agi !== 0 || selectedItem.stats.int !== 0 || selectedItem.stats.sta !== 0) && (
                  <div
                    className="relative p-4 sm:p-5 mb-4 overflow-hidden"
                    style={{
                      clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                      background: 'rgba(5, 5, 5, 0.7)',
                      border: '1px solid rgba(0, 229, 255, 0.3)'
                    }}
                  >
                    <div className="font-mono text-[9px] sm:text-[10px] text-cyan-dim uppercase mb-3 tracking-widest">Stats</div>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedItem.stats.str !== 0 && (
                        <div className="flex justify-between">
                          <span className="font-mono text-xs sm:text-sm text-critical-red">STR</span>
                          <span className="font-bold text-critical-red">
                            {selectedItem.stats.str > 0 ? '+' : ''}{selectedItem.stats.str}
                          </span>
                        </div>
                      )}
                      {selectedItem.stats.agi !== 0 && (
                        <div className="flex justify-between">
                          <span className="font-mono text-xs sm:text-sm text-cyan-neon">AGI</span>
                          <span className="font-bold text-cyan-neon">
                            {selectedItem.stats.agi > 0 ? '+' : ''}{selectedItem.stats.agi}
                          </span>
                        </div>
                      )}
                      {selectedItem.stats.int !== 0 && (
                        <div className="flex justify-between">
                          <span className="font-mono text-xs sm:text-sm text-plasma-purple">INT</span>
                          <span className="font-bold text-plasma-purple">
                            {selectedItem.stats.int > 0 ? '+' : ''}{selectedItem.stats.int}
                          </span>
                        </div>
                      )}
                      {selectedItem.stats.sta !== 0 && (
                        <div className="flex justify-between">
                          <span className="font-mono text-xs sm:text-sm text-warning-yellow">STA</span>
                          <span className="font-bold text-warning-yellow">
                            {selectedItem.stats.sta > 0 ? '+' : ''}{selectedItem.stats.sta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <motion.button
                  className="flex-1 py-3 sm:py-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: 'rgba(0, 229, 255, 0.7)'
                  }}
                  onClick={() => setShowItemDetail(false)}
                  whileHover={{ borderColor: 'rgba(0, 229, 255, 1)', color: '#00e5ff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>

                {selectedItem.consumable ? (
                  <motion.button
                    className="flex-1 py-3 sm:py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider"
                    style={{
                      clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                      background: 'linear-gradient(to right, #a855f7, #d946ef)',
                      color: '#ffffff'
                    }}
                    onClick={handleUse}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use
                  </motion.button>
                ) : selectedItem.slot ? (
                  <motion.button
                    className="flex-1 py-3 sm:py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider"
                    style={{
                      clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                      background: selectedItem.equipped
                        ? 'linear-gradient(to right, #ff003c, #cc0030)'
                        : 'linear-gradient(to right, #00e5ff, #00b8cc)',
                      color: '#ffffff'
                    }}
                    onClick={handleToggleEquip}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedItem.equipped ? 'Unequip' : 'Equip'}
                  </motion.button>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Inventory
