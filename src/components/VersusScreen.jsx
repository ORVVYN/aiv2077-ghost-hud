import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import telegram from '../utils/telegram'

/**
 * VersusScreen - Cinematic Pre-Battle Transition
 * "MATCH FOUND" → Agent vs Opponent → Countdown → ENGAGE!
 */
const VersusScreen = ({ hero, opponent, onBattleStart }) => {
  const [stage, setStage] = useState('match-found') // match-found → versus → countdown → engage
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => telegram.impactOccurred('heavy') },
      { delay: 1500, action: () => setStage('versus') },
      { delay: 2500, action: () => setStage('countdown') },
      { delay: 3500, action: () => setCountdown(2) },
      { delay: 3600, action: () => telegram.impactOccurred('medium') },
      { delay: 4500, action: () => setCountdown(1) },
      { delay: 4600, action: () => telegram.impactOccurred('medium') },
      { delay: 5500, action: () => setStage('engage') },
      { delay: 5600, action: () => telegram.impactOccurred('heavy') },
      { delay: 6000, action: () => onBattleStart() }
    ]

    const timers = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [onBattleStart])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Combat Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.15) contrast(1.6) blur(20px) hue-rotate(330deg)',
            opacity: 0.7
          }}
        />
      </div>

      {/* Red Combat Overlay */}
      <motion.div
        className="absolute inset-0 bg-critical-red/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-20" />

      {/* MATCH FOUND Stage */}
      {stage === 'match-found' && (
        <motion.div
          className="text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="font-tactical text-7xl font-black uppercase text-critical-red"
            style={{
              textShadow: '0 0 40px rgba(255, 0, 60, 1), 0 0 80px rgba(255, 0, 60, 0.5)'
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(255, 0, 60, 1), 0 0 80px rgba(255, 0, 60, 0.5)',
                '0 0 60px rgba(255, 0, 60, 1), 0 0 120px rgba(255, 0, 60, 0.8)',
                '0 0 40px rgba(255, 0, 60, 1), 0 0 80px rgba(255, 0, 60, 0.5)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            MATCH FOUND
          </motion.div>
          <div className="font-mono text-sm text-critical-red/60 uppercase tracking-widest mt-4">
            [ INITIALIZING NEURAL LINK ]
          </div>
        </motion.div>
      )}

      {/* VERSUS Stage */}
      {stage === 'versus' && (
        <motion.div
          className="w-full max-w-6xl px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Your Hero */}
            <motion.div
              className="text-right"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <div className="inline-block relative">
                {/* Hero Silhouette */}
                <div
                  className="w-48 h-48 rounded-full mx-auto mb-4"
                  style={{
                    background: `radial-gradient(circle, ${hero.appearance?.glowColor || '#00e5ff'}40, transparent)`,
                    border: `2px solid ${hero.appearance?.primaryColor || '#00e5ff'}`,
                    boxShadow: `0 0 40px ${hero.appearance?.glowColor || '#00e5ff'}80`
                  }}
                />
                <div className="font-tactical text-3xl font-black uppercase text-cyan-neon">
                  {hero.name}
                </div>
                <div className="font-mono text-xs text-cyan-dim/60 uppercase tracking-wider">
                  {hero.codename}
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    STR: {hero.stats.str}
                  </div>
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    AGI: {hero.stats.agi}
                  </div>
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    INT: {hero.stats.int}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* VS */}
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
            >
              <div
                className="font-tactical text-8xl font-black uppercase text-critical-red"
                style={{
                  textShadow: '0 0 60px rgba(255, 0, 60, 1)'
                }}
              >
                VS
              </div>
            </motion.div>

            {/* Opponent */}
            <motion.div
              className="text-left"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <div className="inline-block relative">
                {/* Opponent Silhouette */}
                <div
                  className="w-48 h-48 rounded-full mx-auto mb-4"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)',
                    border: '2px solid rgba(168, 85, 247, 0.8)',
                    boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)'
                  }}
                />
                <div className="font-tactical text-3xl font-black uppercase text-plasma-purple">
                  {opponent.name}
                </div>
                <div className="font-mono text-xs text-plasma-purple/60 uppercase tracking-wider">
                  {opponent.codename}
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    STR: {opponent.stats.str}
                  </div>
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    AGI: {opponent.stats.agi}
                  </div>
                  <div className="font-mono text-[10px] text-warning-yellow/70">
                    INT: {opponent.stats.int}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* COUNTDOWN Stage */}
      {stage === 'countdown' && (
        <motion.div
          className="text-center relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={countdown}
        >
          {/* Targeting Reticle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 0, scale: 2 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Outer Ring */}
            <div
              className="absolute w-80 h-80 rounded-full border-2 border-critical-red/40"
              style={{
                boxShadow: '0 0 30px rgba(255, 0, 60, 0.4)'
              }}
            >
              {/* Corner markers */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-critical-red" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-4 bg-critical-red" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-1 bg-critical-red" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-1 bg-critical-red" />
            </div>

            {/* Inner Ring */}
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-critical-red/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              {/* Scanning line segments */}
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-critical-red to-transparent -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gradient-to-t from-critical-red to-transparent -translate-x-1/2" />
            </motion.div>
          </motion.div>

          {/* Countdown Number with Glitch */}
          <motion.div
            className="relative font-tactical text-[200px] font-black text-critical-red leading-none"
            initial={{ scale: 2, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: [0, -2, 2, -1, 1, 0],
              textShadow: [
                '0 0 80px rgba(255, 0, 60, 1), 0 0 160px rgba(255, 0, 60, 0.8)',
                '2px 0 20px rgba(0, 255, 255, 0.8), -2px 0 20px rgba(255, 0, 60, 0.8)',
                '0 0 80px rgba(255, 0, 60, 1), 0 0 160px rgba(255, 0, 60, 0.8)'
              ]
            }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
              textShadow: {
                duration: 0.15,
                repeat: 2
              }
            }}
          >
            {countdown}

            {/* Glitch layers */}
            <span
              className="absolute top-0 left-0 w-full h-full text-cyan-neon opacity-30"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translateX(-3px)'
              }}
            >
              {countdown}
            </span>
            <span
              className="absolute top-0 left-0 w-full h-full text-warning-yellow opacity-20"
              style={{
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                transform: 'translateX(3px)'
              }}
            >
              {countdown}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* ENGAGE Stage */}
      {stage === 'engage' && (
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="font-tactical text-9xl font-black uppercase text-critical-red"
            style={{
              textShadow: '0 0 100px rgba(255, 0, 60, 1), 0 0 200px rgba(255, 0, 60, 1)'
            }}
          >
            ENGAGE!
          </div>
        </motion.div>
      )}

      {/* Screen Flash Effects */}
      {(stage === 'engage' || countdown === 1) && (
        <motion.div
          className="absolute inset-0 bg-critical-red pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}

export default VersusScreen
