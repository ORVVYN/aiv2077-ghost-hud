import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, TrendingUp, Package, Coins, Award } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * RewardsScreen - Victory/Defeat Summary
 * Cinematic rewards reveal with glitch-in animations
 */
const RewardsScreen = ({ result, rewards, onClose }) => {
  const [stage, setStage] = useState('result') // result → rewards → complete
  const [revealedRewards, setRevealedRewards] = useState([])

  const isVictory = result === 'victory'

  useEffect(() => {
    // Haptic feedback
    if (isVictory) {
      telegram.notificationOccurred('success')
    } else {
      telegram.notificationOccurred('error')
    }

    // Stage progression
    setTimeout(() => setStage('rewards'), 2000)

    // Reveal rewards one by one
    if (isVictory && rewards) {
      rewards.forEach((reward, index) => {
        setTimeout(() => {
          setRevealedRewards(prev => [...prev, reward])
          telegram.impactOccurred('light')
        }, 2500 + index * 400)
      })
    }

    setTimeout(() => setStage('complete'), 2000 + (rewards?.length || 0) * 400 + 1500)
  }, [isVictory, rewards])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: isVictory
              ? 'brightness(0.25) contrast(1.3) blur(20px)'
              : 'brightness(0.15) contrast(1.5) blur(20px) hue-rotate(330deg)',
            opacity: 0.7
          }}
        />
      </div>

      {/* Colored Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isVictory
            ? 'linear-gradient(180deg, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.05))'
            : 'linear-gradient(180deg, rgba(255, 0, 60, 0.2), rgba(255, 0, 60, 0.1))'
        }}
      />

      {/* Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-15" />

      {/* Main Content */}
      <div className="relative w-full max-w-3xl mx-6">
        {/* Result Stage */}
        <AnimatePresence mode="wait">
          {stage === 'result' && (
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
            >
              {/* Result Icon */}
              <motion.div
                className="mb-8"
                animate={isVictory ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                {isVictory ? (
                  <Trophy
                    className="w-32 h-32 mx-auto text-warning-yellow"
                    strokeWidth={1.5}
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(250, 204, 21, 0.8))'
                    }}
                  />
                ) : (
                  <div
                    className="w-32 h-32 mx-auto rounded-full border-8 border-critical-red/50 flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 40px rgba(255, 0, 60, 0.6)'
                    }}
                  >
                    <div className="text-8xl text-critical-red font-black">×</div>
                  </div>
                )}
              </motion.div>

              {/* Result Text with Chromatic Aberration */}
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Main Text */}
                <motion.div
                  className={`relative font-tactical text-8xl font-black uppercase ${
                    isVictory ? 'text-warning-yellow' : 'text-critical-red'
                  }`}
                  style={{
                    textShadow: isVictory
                      ? '0 0 60px rgba(250, 204, 21, 1), 0 0 120px rgba(250, 204, 21, 0.6)'
                      : '0 0 60px rgba(255, 0, 60, 1), 0 0 120px rgba(255, 0, 60, 0.6)'
                  }}
                  animate={isVictory ? {
                    textShadow: [
                      '0 0 60px rgba(250, 204, 21, 1), 0 0 120px rgba(250, 204, 21, 0.6)',
                      '2px 0 30px rgba(255, 0, 60, 0.8), -2px 0 30px rgba(0, 229, 255, 0.8)',
                      '0 0 60px rgba(250, 204, 21, 1), 0 0 120px rgba(250, 204, 21, 0.6)'
                    ]
                  } : {}}
                  transition={{
                    duration: 0.15,
                    repeat: 4,
                    repeatDelay: 0.3
                  }}
                >
                  {isVictory ? 'VICTORY' : 'DEFEAT'}

                  {/* Chromatic Aberration Layers - Only for Victory */}
                  {isVictory && (
                    <>
                      <motion.span
                        className="absolute top-0 left-0 text-critical-red opacity-40 blur-sm"
                        animate={{
                          x: [0, 2, -1, 2, 0],
                          opacity: [0.4, 0.6, 0.3, 0.5, 0.4]
                        }}
                        transition={{
                          duration: 0.15,
                          repeat: 4,
                          repeatDelay: 0.3
                        }}
                      >
                        VICTORY
                      </motion.span>
                      <motion.span
                        className="absolute top-0 left-0 text-cyan-neon opacity-40 blur-sm"
                        animate={{
                          x: [0, -2, 1, -2, 0],
                          opacity: [0.4, 0.6, 0.3, 0.5, 0.4]
                        }}
                        transition={{
                          duration: 0.15,
                          repeat: 4,
                          repeatDelay: 0.3
                        }}
                      >
                        VICTORY
                      </motion.span>
                    </>
                  )}
                </motion.div>

                {/* Particle Burst - Only for Victory */}
                {isVictory && (
                  <>
                    {Array.from({ length: 30 }).map((_, i) => {
                      const angle = (360 / 30) * i
                      const distance = 150 + Math.random() * 100
                      const endX = Math.cos(angle * Math.PI / 180) * distance
                      const endY = Math.sin(angle * Math.PI / 180) * distance

                      return (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                          style={{
                            background: i % 3 === 0
                              ? 'rgba(250, 204, 21, 0.9)'
                              : i % 3 === 1
                                ? 'rgba(0, 229, 255, 0.9)'
                                : 'rgba(255, 0, 60, 0.9)',
                            boxShadow: `0 0 10px currentColor`
                          }}
                          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                          animate={{
                            x: endX,
                            y: endY,
                            scale: [0, 2, 1, 0],
                            opacity: [0, 1, 0.8, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.3 + (i * 0.02),
                            ease: 'easeOut'
                          }}
                        />
                      )
                    })}
                  </>
                )}
              </motion.div>

              <motion.div
                className="font-mono text-sm text-cyan-dim/60 uppercase tracking-widest mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isVictory ? '[ NEURAL SUPERIORITY ACHIEVED ]' : '[ COMBAT SYSTEMS COMPROMISED ]'}
              </motion.div>
            </motion.div>
          )}

          {/* Rewards Stage */}
          {(stage === 'rewards' || stage === 'complete') && isVictory && (
            <motion.div
              className="ghost-panel p-8"
              style={{
                background: 'linear-gradient(180deg, rgba(10, 15, 20, 0.9), rgba(5, 10, 15, 0.9))',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                backdropFilter: 'blur(60px)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyan-neon/40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-cyan-neon/40" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-cyan-neon/40" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-cyan-neon/40" />

              <div className="text-center mb-6">
                <div className="font-mono text-xs text-cyan-dim/50 uppercase tracking-widest mb-2">
                  [ MISSION REWARDS ]
                </div>
                <div className="font-tactical text-3xl font-black text-cyan-neon uppercase">
                  Battle Spoils
                </div>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {rewards?.map((reward, index) => (
                  <AnimatePresence key={index}>
                    {revealedRewards.includes(reward) && (
                      <motion.div
                        className="relative p-4 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(0, 229, 255, 0.05))',
                          border: '1px solid rgba(0, 229, 255, 0.3)'
                        }}
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        {/* Glitch effect overlay */}
                        <motion.div
                          className="absolute inset-0 bg-cyan-neon/20"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />

                        <div className="flex items-center gap-3">
                          {/* Icon based on reward type */}
                          {reward.type === 'xp' && <TrendingUp className="w-6 h-6 text-cyan-neon" />}
                          {reward.type === 'aiv' && <Coins className="w-6 h-6 text-warning-yellow" />}
                          {reward.type === 'lp' && <Award className="w-6 h-6 text-warning-yellow" />}
                          {reward.type === 'item' && <Package className="w-6 h-6 text-plasma-purple" />}

                          <div className="flex-1">
                            <div className="font-mono text-xs text-cyan-dim/60 uppercase">
                              {reward.type === 'xp' && 'Experience'}
                              {reward.type === 'aiv' && 'AIV Credits'}
                              {reward.type === 'lp' && 'League Points'}
                              {reward.type === 'item' && 'Item Drop'}
                            </div>
                            <div className="font-tactical text-xl font-black text-warning-yellow">
                              {reward.type === 'xp' && `+${reward.amount} XP`}
                              {reward.type === 'aiv' && `+${reward.amount.toLocaleString()}`}
                              {reward.type === 'lp' && `+${reward.amount} LP`}
                              {reward.type === 'item' && reward.name}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {/* Continue Button */}
              {stage === 'complete' && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.button
                    className="px-8 py-3"
                    style={{
                      clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                      background: 'rgba(0, 229, 255, 0.2)',
                      border: '1px solid rgba(0, 229, 255, 0.5)'
                    }}
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="font-tactical text-sm font-black text-cyan-neon uppercase">
                      Return to Hub
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Defeat - Quick Exit */}
          {(stage === 'rewards' || stage === 'complete') && !isVictory && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                className="px-10 py-4 mt-8"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                  background: 'rgba(255, 0, 60, 0.15)',
                  border: '1px solid rgba(255, 0, 60, 0.4)'
                }}
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-tactical text-lg font-black text-critical-red uppercase">
                  Return to Hub
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default RewardsScreen
