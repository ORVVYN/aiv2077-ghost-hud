import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Shield, Pill, Zap, Sparkles, Database, X } from 'lucide-react'
import { items, ITEM_CATEGORIES, getRarityColor, formatPrice } from '../data/items'
import telegram from '../utils/telegram'

/**
 * NeuralMarket - Holographic Glass HUD Shopping Interface
 * Phase 3: Final Visual Polish - Glass Overlay + Neon Blueprints + Scanline Reveal
 */
const NeuralMarket = ({ availableSteps, onPurchase, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  // Filter items by category
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory)

  // Handle item selection
  const handleSelectItem = (item) => {
    telegram.impactOccurred('medium')
    setSelectedItem(item)
    setShowConfirm(true)
  }

  // Handle purchase confirmation
  const handleConfirmPurchase = () => {
    if (!selectedItem) return

    if (availableSteps >= selectedItem.price) {
      telegram.notificationOccurred('success')
      onPurchase(selectedItem)
      setShowConfirm(false)
      setSelectedItem(null)
    } else {
      telegram.notificationOccurred('error')
    }
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    telegram.selectionChanged()
    setSelectedCategory(category)
  }

  // Category icon mapping - NEON BLUEPRINT STYLE
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case ITEM_CATEGORIES.WEAPON: return <Sword className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.ARMOR: return <Shield className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.CONSUMABLE: return <Pill className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.UPGRADE: return <Zap className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      case ITEM_CATEGORIES.COSMETIC: return <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} fill="none" />
      default: return <Database className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
    }
  }

  // Get item icon (holographic projection) - NEON BLUEPRINT STYLE ONLY
  const getItemIcon = (item, size = 'w-10 h-10 sm:w-12 sm:h-12') => {
    if (item.category === ITEM_CATEGORIES.WEAPON) return <Sword className={size} strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.ARMOR) return <Shield className={size} strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.CONSUMABLE) return <Pill className={size} strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.UPGRADE) return <Zap className={size} strokeWidth={1.2} fill="none" />
    if (item.category === ITEM_CATEGORIES.COSMETIC) return <Sparkles className={size} strokeWidth={1.2} fill="none" />
    return <Database className={size} strokeWidth={1.2} />
  }

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: ITEM_CATEGORIES.WEAPON, label: 'Weapons' },
    { id: ITEM_CATEGORIES.ARMOR, label: 'Armor' },
    { id: ITEM_CATEGORIES.CONSUMABLE, label: 'Consumables' },
    { id: ITEM_CATEGORIES.UPGRADE, label: 'Upgrades' },
    { id: ITEM_CATEGORIES.COSMETIC, label: 'Cosmetics' }
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
      {/* Glass Blur Overlay - Hero remains visible */}
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

      {/* Market Panel - SCANLINE REVEAL ANIMATION */}
      <motion.div
        className="relative w-full max-w-6xl overflow-hidden"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 229, 255, 0.4)',
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
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 229, 255, 0.3) 50%, transparent 100%)',
            height: '30px'
          }}
          initial={{ y: '-30px' }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Metadata Garnish - Top Left */}
        <div className="absolute top-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-cyan-neon/30 tracking-widest space-y-0.5">
            <div>SYS_ID: MARKET_v2.7.4</div>
            <div>MODEL_REF: 0x992A</div>
            <div>CONN: STABLE</div>
          </div>
        </div>

        {/* Metadata Garnish - Top Right (FAKE NETWORK DATA) */}
        <div className="absolute top-2 right-14 sm:right-20 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-cyan-neon/30 tracking-widest space-y-0.5 text-right">
            <div>LATENCY: 8ms</div>
            <div>ENCRYPTION: AES-256</div>
            <div>SIGNAL: OPTIMAL</div>
          </div>
        </div>

        {/* Header - Skewed Container */}
        <div className="relative p-3 sm:p-6 pb-16 sm:pb-20 border-b border-cyan-neon/30 transform -skew-x-2">
          <div className="transform skew-x-2">
            {/* Close Button - LARGER TOUCH TARGET (44px min), Always Visible */}
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
                  Neural Market
                </h2>
                {/* Chromatic Aberration - Blue channel */}
                <h2 className="absolute font-display text-2xl sm:text-4xl font-black text-plasma-purple uppercase tracking-tight truncate opacity-30 blur-[1px]" style={{ transform: 'translate(1px, 0)' }}>
                  Neural Market
                </h2>
                {/* Main title */}
                <h2 className="relative font-display text-2xl sm:text-4xl font-black text-cyan-neon uppercase tracking-tight truncate">
                  Neural Market
                </h2>
              </div>
              <p className="font-mono text-[9px] sm:text-xs text-cyan-dim mt-1 tracking-wider truncate">
                {'>'} TACTICAL EQUIPMENT REQUISITION
              </p>
            </div>

            {/* Available Steps - MOVED BELOW TITLE (ЛЕВЕЕ) */}
            <motion.div
              className="relative px-3 sm:px-6 py-2 sm:py-3 overflow-hidden flex-shrink-0 mt-4 inline-block"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                background: 'rgba(5, 5, 5, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(250, 204, 21, 0.4)'
              }}
              animate={{ borderColor: ['rgba(250, 204, 21, 0.4)', 'rgba(250, 204, 21, 0.8)', 'rgba(250, 204, 21, 0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="font-mono text-[7px] sm:text-[9px] text-cyan-dim uppercase tracking-widest text-center">Available</div>
              <div className="font-display text-xl sm:text-2xl font-black text-warning-yellow tracking-tight text-center">
                {formatPrice(availableSteps)}
              </div>
              <div className="font-mono text-[6px] sm:text-[8px] text-cyan-dim/50 uppercase text-center">STEPS</div>
            </motion.div>
          </div>
        </div>

        {/* Category Tabs - MORE HORIZONTAL PADDING */}
        <div className="flex gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-4 border-b border-cyan-neon/30 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className="relative flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-2 sm:py-3 font-mono text-[9px] sm:text-xs uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-200 flex-shrink-0"
              style={{
                clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                background: selectedCategory === category.id
                  ? 'rgba(0, 229, 255, 0.2)'
                  : 'rgba(5, 5, 5, 0.4)',
                border: selectedCategory === category.id
                  ? '2px solid rgba(0, 229, 255, 1)'
                  : '1px solid rgba(0, 229, 255, 0.3)',
                color: selectedCategory === category.id
                  ? '#00e5ff'
                  : 'rgba(0, 229, 255, 0.6)'
              }}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/0 to-cyan-neon/20 opacity-0 hover:opacity-100 transition-opacity" />
              {getCategoryIcon(category.id)}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Metadata Garnish - Bottom Left */}
        <div className="absolute bottom-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-cyan-neon/30 tracking-widest">
            INVENTORY: {filteredItems.length}/{items.length} ITEMS
          </div>
        </div>

        {/* Items Grid - Scrollable */}
        <div className="p-3 sm:p-6 overflow-y-auto scrollbar-thin" style={{ maxHeight: 'calc(80vh - 240px)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredItems.map((item, index) => {
              const rarityColor = getRarityColor(item.rarity)
              const canAfford = availableSteps >= item.price

              return (
                <motion.div
                  key={item.id}
                  className="relative cursor-pointer overflow-hidden"
                  style={{
                    clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${rarityColor}40`,
                    opacity: canAfford ? 1 : 0.5
                  }}
                  onClick={() => handleSelectItem(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: canAfford ? 1 : 0.5, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={canAfford ? { scale: 1.02, borderColor: rarityColor } : {}}
                  whileTap={canAfford ? { scale: 0.98 } : {}}
                  layout
                >
                  {/* Holographic Grid Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)',
                      backgroundSize: '10px 10px'
                    }}
                  />

                  {/* Item ID Metadata Garnish */}
                  <div className="absolute bottom-1 right-2 pointer-events-none">
                    <div className="font-mono text-[6px] sm:text-[7px] text-cyan-neon/20 tracking-widest text-right">
                      ID:{item.id.split('-')[1]}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    {/* Item Icon - NEON BLUEPRINT Holographic Projection */}
                    <div className="relative flex items-center justify-center mb-4 group" style={{ color: rarityColor }}>
                      {/* Hologram base platform */}
                      <div className="absolute bottom-0 w-16 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

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
                          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 229, 255, 0.05) 50%)',
                          backgroundSize: '100% 4px'
                        }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>

                    {/* Item Name */}
                    <h3
                      className="font-display text-sm sm:text-base font-bold uppercase text-center mb-2 line-clamp-2 tracking-tight"
                      style={{ color: rarityColor }}
                    >
                      {item.name}
                    </h3>

                    {/* Rarity */}
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: rarityColor }}
                      />
                      <span
                        className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest"
                        style={{ color: rarityColor }}
                      >
                        {item.rarity}
                      </span>
                    </div>

                    {/* Price - Tactical Panel */}
                    <div
                      className="relative p-2 sm:p-3 mb-3 overflow-hidden"
                      style={{
                        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                        background: 'rgba(5, 5, 5, 0.6)',
                        border: canAfford
                          ? '1px solid rgba(250, 204, 21, 0.4)'
                          : '1px solid rgba(255, 0, 60, 0.4)'
                      }}
                    >
                      <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest text-center mb-1">Price</div>
                      <div className={`font-display text-base sm:text-lg font-black tracking-tight text-center ${canAfford ? 'text-warning-yellow' : 'text-critical-red'}`}>
                        {formatPrice(item.price)}
                      </div>
                      <div className="font-mono text-[7px] sm:text-[8px] text-cyan-dim/50 uppercase text-center">STEPS</div>
                    </div>

                    {/* Quick Stats Preview */}
                    {(item.stats.str > 0 || item.stats.agi > 0 || item.stats.int > 0 || item.stats.sta > 0) && (
                      <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                        {item.stats.str > 0 && <span className="text-critical-red font-mono text-[8px] sm:text-[9px]">STR+{item.stats.str}</span>}
                        {item.stats.agi > 0 && <span className="text-cyan-neon font-mono text-[8px] sm:text-[9px]">AGI+{item.stats.agi}</span>}
                        {item.stats.int > 0 && <span className="text-plasma-purple font-mono text-[8px] sm:text-[9px]">INT+{item.stats.int}</span>}
                        {item.stats.sta > 0 && <span className="text-warning-yellow font-mono text-[8px] sm:text-[9px]">STA+{item.stats.sta}</span>}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && selectedItem && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Glass Blur for Confirmation */}
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(5, 5, 5, 0.7)'
              }}
              onClick={() => setShowConfirm(false)}
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
              {/* SCANLINE REVEAL for Confirm Modal */}
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

              <div className="text-center mb-6">
                {/* Holographic Item Icon - NEON BLUEPRINT */}
                <div
                  className="flex items-center justify-center mb-4 relative"
                  style={{ color: getRarityColor(selectedItem.rarity) }}
                >
                  {/* Hologram base platform */}
                  <div className="absolute bottom-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: `drop-shadow(0 0 12px ${getRarityColor(selectedItem.rarity)})`
                    }}
                  >
                    {getItemIcon(selectedItem, 'w-16 h-16 sm:w-20 sm:h-20')}
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
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getRarityColor(selectedItem.rarity) }}
                  />
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: getRarityColor(selectedItem.rarity) }}
                  >
                    {selectedItem.rarity}
                  </span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-cyan-dim mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Price Confirmation */}
                <div
                  className="relative p-4 sm:p-5 mb-4 overflow-hidden"
                  style={{
                    clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.7)',
                    border: '1px solid rgba(250, 204, 21, 0.4)'
                  }}
                >
                  <div className="font-mono text-[9px] sm:text-[10px] text-cyan-dim uppercase mb-3 tracking-widest text-center">Purchase Price</div>
                  <div className="font-display text-3xl sm:text-4xl font-black text-warning-yellow text-center">
                    {formatPrice(selectedItem.price)}
                  </div>
                  <div className="font-mono text-xs text-cyan-dim/50 uppercase text-center mt-1">STEPS</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <motion.button
                  className="flex-1 py-3 sm:py-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(255, 0, 60, 0.3)',
                    color: 'rgba(255, 0, 60, 0.7)'
                  }}
                  onClick={() => setShowConfirm(false)}
                  whileHover={{ borderColor: 'rgba(255, 0, 60, 1)', color: '#ff003c' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  className="flex-1 py-3 sm:py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    background: availableSteps >= selectedItem.price
                      ? 'linear-gradient(to right, #00e5ff, #00b8cc)'
                      : 'rgba(5, 5, 5, 0.5)',
                    border: availableSteps >= selectedItem.price
                      ? '2px solid #00e5ff'
                      : '1px solid rgba(255, 0, 60, 0.3)',
                    color: availableSteps >= selectedItem.price ? '#050505' : 'rgba(255, 0, 60, 0.7)'
                  }}
                  onClick={handleConfirmPurchase}
                  disabled={availableSteps < selectedItem.price}
                  whileHover={availableSteps >= selectedItem.price ? { scale: 1.02 } : {}}
                  whileTap={availableSteps >= selectedItem.price ? { scale: 0.95 } : {}}
                >
                  {availableSteps >= selectedItem.price ? 'Confirm Purchase' : 'Insufficient Steps'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default NeuralMarket
