import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * TierEncyclopedia - League Overview Carousel
 * AAA ASPIRATIONAL SHOWCASE: Swipeable tier journey preview
 */

// Extended League Data with Perks
const LEAGUE_TIERS = [
  {
    id: 'BRONZE',
    name: 'BRONZE RECRUIT',
    color: '#CD7F32',
    glowColor: 'rgba(205, 127, 50, 0.6)',
    bgWash: 'rgba(205, 127, 50, 0.15)',
    minLP: 0,
    maxLP: 999,
    icon: '🥉',
    perks: [
      'Basic Arena Access',
      '+0% AIV Extraction Bonus',
      'Standard Combat Rewards'
    ],
    description: 'Entry-level operatives. Prove your worth in the Neural Arena.'
  },
  {
    id: 'CHROME',
    name: 'CHROME SOLDIER',
    color: '#C0C0C0',
    glowColor: 'rgba(192, 192, 192, 0.6)',
    bgWash: 'rgba(192, 192, 192, 0.15)',
    minLP: 1000,
    maxLP: 1999,
    icon: '⚡',
    perks: [
      'Ranked Matchmaking Priority',
      '+3% AIV Extraction Bonus',
      'Chrome Avatar Frame'
    ],
    description: 'Seasoned combatants with proven tactical prowess.'
  },
  {
    id: 'GOLD',
    name: 'GOLD ELITE',
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    bgWash: 'rgba(255, 215, 0, 0.15)',
    minLP: 2000,
    maxLP: 2999,
    icon: '⭐',
    perks: [
      'Elite Tournament Access',
      '+5% AIV Extraction Bonus',
      'Gold Prestige Shield',
      'Exclusive Victory Emotes'
    ],
    description: 'Top-tier agents recognized across the Neural Network.'
  },
  {
    id: 'PLASMA',
    name: 'PLASMA MASTER',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.8)',
    bgWash: 'rgba(168, 85, 247, 0.2)',
    minLP: 3000,
    maxLP: 3999,
    icon: '💜',
    perks: [
      'Master League Privileges',
      '+10% AIV Extraction Bonus',
      'Plasma Aura Effect',
      'Priority Market Access',
      'Custom Combat Ribbons'
    ],
    description: 'Elite warriors who bend reality through Neural Superiority.'
  },
  {
    id: 'DIAMOND',
    name: 'DIAMOND AGENT',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.8)',
    bgWash: 'rgba(0, 229, 255, 0.2)',
    minLP: 4000,
    maxLP: 4999,
    icon: '💎',
    perks: [
      'Diamond Tier Exclusivity',
      '+15% AIV Extraction Bonus',
      'Diamond Neon Aura',
      'VIP Dojo Training Access',
      'Legendary Item Drops',
      'Global Broadcast Rights'
    ],
    description: 'Legendary operatives at the pinnacle of combat excellence.'
  },
  {
    id: 'AIVANCED',
    name: 'AIVANCED',
    color: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 1)',
    bgWash: 'rgba(250, 204, 21, 0.25)',
    minLP: 5000,
    maxLP: 999999,
    icon: '👑',
    perks: [
      'MAXIMUM NEURAL AUTHORITY',
      '+25% AIV EXTRACTION BONUS',
      'CHROMATIC GLITCH AURA',
      'MYTHIC HERO UNLOCKS',
      'EXCLUSIVE AIVANCED FRAME',
      'GLOBAL LEADERBOARD CROWN',
      'SEASON REWARD PRIORITY',
      'UNLIMITED TOURNAMENT ENTRIES'
    ],
    description: 'TRANSCENDENT. The absolute apex of Neural Combat Mastery. Reserved for the elite few who have conquered all.'
  }
]

const TierEncyclopedia = ({ currentLeague = 'BRONZE', onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    LEAGUE_TIERS.findIndex(tier => tier.id === currentLeague)
  )
  const [direction, setDirection] = useState(0)

  const currentTier = LEAGUE_TIERS[selectedIndex]

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setDirection(-1)
      setSelectedIndex(prev => prev - 1)
      telegram.impactOccurred('light')
    }
  }

  const handleNext = () => {
    if (selectedIndex < LEAGUE_TIERS.length - 1) {
      setDirection(1)
      setSelectedIndex(prev => prev + 1)
      telegram.impactOccurred('light')
    }
  }

  // Swipe detection
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      handleNext()
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      handlePrevious()
    }
  }

  // Massive Prestige Shield Component
  const MassivePrestigeShield = ({ tier }) => {
    const isAivanced = tier.id === 'AIVANCED'
    const isPlasma = tier.id === 'PLASMA'

    return (
      <div className="relative flex items-center justify-center mb-8">
        {/* Particle Aura for AIVANCED */}
        {isAivanced && (
          <>
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (360 / 40) * i
              const radius = 140

              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 3 === 0
                      ? 'rgba(250, 204, 21, 0.8)'
                      : i % 3 === 1
                        ? 'rgba(0, 229, 255, 0.8)'
                        : 'rgba(255, 0, 60, 0.8)',
                    boxShadow: '0 0 10px currentColor',
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    x: Math.cos(angle * Math.PI / 180) * radius,
                    y: Math.sin(angle * Math.PI / 180) * radius,
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: 'easeInOut'
                  }}
                />
              )
            })}
          </>
        )}

        {/* Main Shield */}
        <motion.div
          className="relative w-64 h-64 flex items-center justify-center"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: isAivanced
              ? 'linear-gradient(135deg, #FACC15, #FF003C, #00E5FF, #FACC15)'
              : isPlasma
                ? `radial-gradient(circle, ${tier.color}, ${tier.color}80)`
                : tier.color,
            boxShadow: `0 0 80px ${tier.glowColor}, inset 0 0 40px rgba(255, 255, 255, 0.3)`,
            border: `4px solid ${tier.color}`,
            backgroundSize: isAivanced ? '200% 200%' : '100% 100%'
          }}
          animate={isAivanced ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          } : isPlasma ? {
            boxShadow: [
              `0 0 80px ${tier.glowColor}, inset 0 0 40px rgba(255, 255, 255, 0.3)`,
              `0 0 120px ${tier.glowColor}, inset 0 0 60px rgba(255, 255, 255, 0.5)`,
              `0 0 80px ${tier.glowColor}, inset 0 0 40px rgba(255, 255, 255, 0.3)`
            ]
          } : {}}
          transition={isAivanced ? {
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          } : isPlasma ? {
            duration: 2,
            repeat: Infinity
          } : {}}
        >
          <div className="font-bold text-9xl text-obsidian relative z-10">{tier.icon}</div>

          {/* Chromatic Aberration for AIVANCED */}
          {isAivanced && (
            <>
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, #FF003C, transparent)',
                  filter: 'blur(2px)'
                }}
                animate={{
                  x: [0, 4, -2, 4, 0],
                  opacity: [0.4, 0.6, 0.3, 0.5, 0.4]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, #00E5FF, transparent)',
                  filter: 'blur(2px)'
                }}
                animate={{
                  x: [0, -4, 2, -4, 0],
                  opacity: [0.4, 0.6, 0.3, 0.5, 0.4]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </>
          )}
        </motion.div>

        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 w-80 h-80 -translate-x-8 -translate-y-8 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${tier.glowColor}, transparent)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    )
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with Color Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.2) contrast(1.5) blur(100px)',
            opacity: 0.5
          }}
        />
      </div>

      {/* Animated Color Wash */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTier.id}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${currentTier.bgWash}, transparent 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-10" />

      {/* Close Button */}
      <motion.button
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center z-50"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(0, 229, 255, 0.5)',
          backdropFilter: 'blur(20px)'
        }}
        onClick={() => {
          telegram.impactOccurred('light')
          onClose()
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-cyan-neon" />
      </motion.button>

      {/* Navigation Arrows */}
      {selectedIndex > 0 && (
        <motion.button
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center z-50"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(0, 229, 255, 0.5)',
            backdropFilter: 'blur(20px)',
            clipPath: 'polygon(0% 50%, 30% 0%, 100% 0%, 100% 100%, 30% 100%)'
          }}
          onClick={handlePrevious}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-8 h-8 text-cyan-neon" strokeWidth={3} />
        </motion.button>
      )}

      {selectedIndex < LEAGUE_TIERS.length - 1 && (
        <motion.button
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center z-50"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(0, 229, 255, 0.5)',
            backdropFilter: 'blur(20px)',
            clipPath: 'polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%)'
          }}
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-8 h-8 text-cyan-neon" strokeWidth={3} />
        </motion.button>
      )}

      {/* Main Carousel */}
      <div className="relative w-full max-w-2xl h-[85vh] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentTier.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* League Card */}
            <div
              className="w-full h-full p-8 overflow-y-auto scrollbar-hide"
              style={{
                background: 'linear-gradient(180deg, rgba(10, 15, 20, 0.95), rgba(5, 10, 15, 0.95))',
                border: `2px solid ${currentTier.color}`,
                backdropFilter: 'blur(80px)',
                boxShadow: `0 0 60px ${currentTier.glowColor}`
              }}
            >
              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: currentTier.color }} />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: currentTier.color }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: currentTier.color }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: currentTier.color }} />

              {/* Header */}
              <div className="text-center mb-6">
                <div className="font-mono text-[10px] text-cyan-dim/50 uppercase tracking-widest mb-2">
                  [ LEAGUE_TIER_ARCHIVE ]
                </div>
                <motion.div
                  className="font-tactical text-5xl font-black uppercase mb-2"
                  style={{
                    color: currentTier.color,
                    textShadow: `0 0 40px ${currentTier.glowColor}`
                  }}
                  animate={currentTier.id === 'AIVANCED' ? {
                    textShadow: [
                      `0 0 40px ${currentTier.glowColor}`,
                      `2px 0 20px rgba(255, 0, 60, 0.8), -2px 0 20px rgba(0, 229, 255, 0.8)`,
                      `0 0 40px ${currentTier.glowColor}`
                    ]
                  } : {}}
                  transition={{
                    duration: 0.2,
                    repeat: currentTier.id === 'AIVANCED' ? Infinity : 0,
                    repeatDelay: 1
                  }}
                >
                  {currentTier.name}
                </motion.div>
                <div className="font-mono text-sm text-warning-yellow/70">
                  {currentTier.minLP.toLocaleString()} - {currentTier.maxLP === 999999 ? '∞' : currentTier.maxLP.toLocaleString()} LP
                </div>
              </div>

              {/* Massive Shield */}
              <MassivePrestigeShield tier={currentTier} />

              {/* Description */}
              <div className="mb-6 p-4" style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(0, 229, 255, 0.2)'
              }}>
                <div className="font-mono text-sm text-cyan-dim/80 text-center leading-relaxed">
                  {currentTier.description}
                </div>
              </div>

              {/* Neural Perks */}
              <div>
                <div className="font-tactical text-xl font-black text-cyan-neon uppercase mb-4 text-center">
                  NEURAL PERKS
                </div>
                <div className="space-y-2">
                  {currentTier.perks.map((perk, index) => (
                    <motion.div
                      key={index}
                      className="p-3 flex items-center gap-3"
                      style={{
                        background: `linear-gradient(90deg, ${currentTier.color}20, transparent)`,
                        border: `1px solid ${currentTier.color}40`,
                        clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: currentTier.color,
                          boxShadow: `0 0 10px ${currentTier.glowColor}`
                        }}
                      />
                      <div
                        className={`font-mono text-sm ${currentTier.id === 'AIVANCED' ? 'font-black' : 'font-medium'} uppercase`}
                        style={{ color: currentTier.id === 'AIVANCED' ? currentTier.color : '#fff' }}
                      >
                        {perk}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 flex justify-center gap-2">
                {LEAGUE_TIERS.map((tier, index) => (
                  <div
                    key={tier.id}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      background: index === selectedIndex ? currentTier.color : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: index === selectedIndex ? `0 0 10px ${currentTier.glowColor}` : 'none',
                      scale: index === selectedIndex ? 1.5 : 1
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default TierEncyclopedia
