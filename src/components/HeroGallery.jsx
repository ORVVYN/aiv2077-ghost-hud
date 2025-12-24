import { motion } from 'framer-motion'
import telegram from '../utils/telegram'

/**
 * HeroGallery - GHOST HUD VERSION
 * Minimalist System Dock (bottom) with icon-only hero indicators
 */
const HeroGallery = ({ heroes, selectedHeroId, onHeroChange }) => {
  // Handle hero selection with glitch effect
  const handleHeroSelect = (heroId) => {
    if (heroId === selectedHeroId) return

    const hero = heroes.find(h => h.id === heroId)
    if (!hero.unlocked) return

    telegram.selectionChanged()

    // Screen glitch effect
    const body = document.body
    body.style.animation = 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    setTimeout(() => {
      body.style.animation = ''
      onHeroChange(heroId)
    }, 150)
  }

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      {/* Tactical Data Nodes Container */}
      <div className="flex items-center gap-6 px-8 py-4 ghost-panel">
        {heroes.map((hero, index) => {
          const isSelected = hero.id === selectedHeroId
          const isLocked = !hero.unlocked

          return (
            <motion.button
              key={hero.id}
              className={`
                relative w-4 h-4 transition-all duration-300
                ${isLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => handleHeroSelect(hero.id)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.05 }}
              whileHover={!isLocked ? { scale: 1.15 } : {}}
              whileTap={!isLocked ? { scale: 0.85 } : {}}
            >
              {/* Diamond/Square Data Node - Inner Border */}
              <div
                className="w-full h-full rotate-45"
                style={{
                  backgroundColor: isSelected ? `${hero.appearance.glowColor}20` : 'transparent',
                  border: `1px solid ${hero.appearance.primaryColor}`,
                  boxShadow: isSelected
                    ? `0 0 12px ${hero.appearance.glowColor}, 0 0 24px ${hero.appearance.glowColor}40, inset 0 0 8px ${hero.appearance.glowColor}30`
                    : `0 0 4px ${hero.appearance.primaryColor}40`,
                  opacity: isLocked ? 0.3 : 1
                }}
              />

              {/* Double-Border Effect (active only) - Outer Border */}
              {isSelected && !isLocked && (
                <div
                  className="absolute inset-0 rotate-45"
                  style={{
                    border: `1px solid ${hero.appearance.glowColor}`,
                    transform: 'scale(1.4)',
                    boxShadow: `0 0 8px ${hero.appearance.glowColor}`
                  }}
                />
              )}


              {/* Lock indicator */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                  <div className="text-[8px]">🔒</div>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Floating label */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="font-mono text-[9px] text-cyan-neon/30 uppercase tracking-widest">
          {heroes.find(h => h.id === selectedHeroId)?.name.toLowerCase()}
        </div>
      </div>
    </motion.div>
  )
}

export default HeroGallery
