import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Clock, TrendingUp } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * TrainingDojo - AAA Tactical Hero Training
 * Phase 3: Economy System with ZZO-Style Visual Overhaul + Glass Blur HUD
 *
 * Training Duration: 1 hour (3600 seconds)
 * Step Burn Rate: 1000 steps = -10 minutes (600 seconds)
 * Max Speedup: 6000 steps = -60 minutes (instant complete)
 */
const TrainingDojo = ({ hero, availableSteps, onTrainingComplete, onClose }) => {
  const [isTraining, setIsTraining] = useState(false)
  const [remainingTime, setRemainingTime] = useState(3600) // 1 hour in seconds
  const [stepsBurned, setStepsBurned] = useState(0)
  const [selectedBoost, setSelectedBoost] = useState(0)
  const intervalRef = useRef(null)

  // Training boost options
  const boostOptions = [
    { steps: 0, time: 0, label: 'Standard', duration: '1 Hour' },
    { steps: 1000, time: 600, label: 'Accelerated', duration: '50 Min' },
    { steps: 2000, time: 1200, label: 'Enhanced', duration: '40 Min' },
    { steps: 3000, time: 1800, label: 'Boosted', duration: '30 Min' },
    { steps: 6000, time: 3600, label: 'Neural Sync', duration: 'Instant' }
  ]

  // Start training
  const handleStartTraining = () => {
    const boost = boostOptions[selectedBoost]

    if (availableSteps < boost.steps) {
      telegram.notificationOccurred('error')
      return
    }

    telegram.impactOccurred('heavy')
    setStepsBurned(boost.steps)
    setIsTraining(true)

    const newRemainingTime = 3600 - boost.time
    setRemainingTime(newRemainingTime)

    // Start countdown
    if (newRemainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            completeTraining()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      // Instant complete
      completeTraining()
    }
  }

  // Complete training
  const completeTraining = () => {
    telegram.notificationOccurred('success')

    // Random stat gains (10-15 points distributed)
    const totalGain = 10 + Math.floor(Math.random() * 6) // 10-15 total
    const gains = {
      str: Math.floor(Math.random() * (totalGain / 2)),
      agi: Math.floor(Math.random() * (totalGain / 2)),
      int: Math.floor(Math.random() * (totalGain / 2)),
      sta: Math.floor(Math.random() * (totalGain / 2))
    }

    // Ensure we use all points
    const used = gains.str + gains.agi + gains.int + gains.sta
    if (used < totalGain) {
      gains.sta += (totalGain - used)
    }

    onTrainingComplete({
      stepsBurned,
      gains,
      duration: 3600 - remainingTime
    })
  }

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`
    }
    return `${secs}s`
  }

  // Calculate progress
  const progress = ((3600 - remainingTime) / 3600) * 100

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

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
        onClick={!isTraining ? onClose : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Dojo Panel - Cinematic Slide-in */}
      <motion.div
        className="relative w-full max-w-3xl overflow-hidden"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(250, 204, 21, 0.4)',
          maxHeight: '80vh'
        }}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* SCANLINE REVEAL EFFECT - AAA "WOW" Animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(250, 204, 21, 0.3) 50%, transparent 100%)',
            height: '30px'
          }}
          initial={{ y: '-30px' }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Metadata Garnish - Top Left */}
        <div className="absolute top-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-warning-yellow/30 tracking-widest space-y-0.5">
            <div>SYS_ID: DOJO_v2.7.4</div>
            <div>PROTOCOL: NEURAL_TRAIN</div>
            <div>STATUS: {isTraining ? 'ACTIVE' : 'STANDBY'}</div>
          </div>
        </div>

        {/* Metadata Garnish - Top Right (FAKE NETWORK DATA) */}
        <div className="absolute top-2 right-14 sm:right-20 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-warning-yellow/30 tracking-widest space-y-0.5 text-right">
            <div>LATENCY: 6ms</div>
            <div>ENCRYPTION: AES-256</div>
            <div>SIGNAL: OPTIMAL</div>
          </div>
        </div>

        {/* Metadata Garnish - Bottom Left */}
        <div className="absolute bottom-2 left-3 sm:left-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-warning-yellow/30 tracking-widest">
            SESSION: {isTraining ? 'IN_PROGRESS' : 'READY'}
          </div>
        </div>

        {/* Metadata Garnish - Bottom Right */}
        <div className="absolute bottom-2 right-3 sm:right-6 pointer-events-none z-10">
          <div className="font-mono text-[7px] sm:text-[8px] text-warning-yellow/30 tracking-widest text-right">
            UPTIME: {Math.floor((Date.now() / 1000) % 10000)}s
          </div>
        </div>

        {/* Header - Skewed */}
        <div className="relative p-3 sm:p-6 pb-6 sm:pb-8 border-b border-warning-yellow/30 transform -skew-x-2">
          <div className="transform skew-x-2">
            {/* Close Button - LARGER TOUCH TARGET (44px min), Always Visible */}
            {!isTraining && (
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
            )}

            {/* Title with CHROMATIC ABERRATION */}
            <div className="flex-1 min-w-0 mr-2">
              <div className="relative inline-block">
                {/* Chromatic Aberration - Red channel */}
                <h2 className="absolute font-display text-2xl sm:text-4xl font-black text-critical-red uppercase tracking-tight truncate opacity-30 blur-[1px]" style={{ transform: 'translate(-1px, 0)' }}>
                  Training Dojo
                </h2>
                {/* Chromatic Aberration - Blue channel */}
                <h2 className="absolute font-display text-2xl sm:text-4xl font-black text-cyan-neon uppercase tracking-tight truncate opacity-30 blur-[1px]" style={{ transform: 'translate(1px, 0)' }}>
                  Training Dojo
                </h2>
                {/* Main title */}
                <h2 className="relative font-display text-2xl sm:text-4xl font-black text-warning-yellow uppercase tracking-tight truncate">
                  Training Dojo
                </h2>
              </div>
              <p className="font-mono text-[9px] sm:text-xs text-cyan-dim mt-1 tracking-wider truncate">
                {'>'} NEURAL COMBAT ENHANCEMENT PROTOCOL
              </p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-3 sm:p-6 overflow-y-auto scrollbar-thin" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          {/* Hero Info - Tactical Card */}
          <motion.div
            className="relative p-4 sm:p-5 mb-4 sm:mb-6 overflow-hidden"
            style={{
              clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.6)',
              border: '1px solid rgba(0, 229, 255, 0.3)'
            }}
          >
            {/* Holographic Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(250, 204, 21, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 204, 21, 0.3) 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }}
            />

            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
              {/* Holographic Icon */}
              <div className="relative">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center relative overflow-hidden"
                  style={{
                    clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.2))',
                    border: '2px solid rgba(0, 229, 255, 0.5)'
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))'
                    }}
                  >
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-neon" strokeWidth={1.2} fill="none" />
                  </motion.div>
                </div>

                {/* Hologram scan lines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 229, 255, 0.1) 50%)',
                    backgroundSize: '100% 4px'
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight truncate">
                  {hero.name}
                </div>
                <div className="font-mono text-[9px] sm:text-xs text-cyan-dim tracking-wider truncate">
                  {hero.codename}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest">League</div>
                <div className="font-tactical text-base sm:text-lg font-bold text-warning-yellow uppercase">
                  {hero.league}
                </div>
              </div>
            </div>
          </motion.div>

          {!isTraining ? (
            <>
              {/* Training Info - Tactical Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <motion.div
                  className="relative p-3 sm:p-4 overflow-hidden text-center"
                  style={{
                    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))' }}>
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-cyan-neon" strokeWidth={1.2} fill="none" />
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest">Duration</div>
                  <div className="font-mono text-xs sm:text-sm text-white mt-1">1 Hour</div>
                </motion.div>

                <motion.div
                  className="relative p-3 sm:p-4 overflow-hidden text-center"
                  style={{
                    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(250, 204, 21, 0.3)'
                  }}
                >
                  <div style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))' }}>
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-warning-yellow" strokeWidth={1.2} fill="none" />
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest">Stat Gain</div>
                  <div className="font-mono text-xs sm:text-sm text-warning-yellow mt-1">+10-15</div>
                </motion.div>

                <motion.div
                  className="relative p-3 sm:p-4 overflow-hidden text-center"
                  style={{
                    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <div style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }}>
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-plasma-purple" strokeWidth={1.2} fill="none" />
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-cyan-dim uppercase tracking-widest">Boost Rate</div>
                  <div className="font-mono text-xs sm:text-sm text-cyan-neon mt-1">1K = -10m</div>
                </motion.div>
              </div>

              {/* Boost Options - Tactical Cards */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-tactical text-base sm:text-lg font-bold text-cyan-neon uppercase mb-3 sm:mb-4 tracking-tight">
                  Acceleration Protocol
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {boostOptions.map((option, index) => {
                    const canAfford = availableSteps >= option.steps
                    const isSelected = selectedBoost === index

                    return (
                      <motion.button
                        key={index}
                        className="relative p-3 sm:p-4 flex items-center justify-between overflow-hidden"
                        style={{
                          clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                          background: isSelected
                            ? 'rgba(0, 229, 255, 0.2)'
                            : 'rgba(5, 5, 5, 0.5)',
                          border: isSelected
                            ? '2px solid rgba(0, 229, 255, 1)'
                            : '1px solid rgba(0, 229, 255, 0.3)',
                          opacity: !canAfford ? 0.4 : 1
                        }}
                        onClick={() => canAfford && setSelectedBoost(index)}
                        disabled={!canAfford}
                        whileHover={canAfford ? { scale: 1.01 } : {}}
                        whileTap={canAfford ? { scale: 0.99 } : {}}
                      >
                        <div className="flex items-center gap-2 sm:gap-4">
                          {/* Radio indicator */}
                          <div className={`
                            w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${isSelected ? 'border-cyan-neon bg-cyan-neon' : 'border-cyan-dim/50'}
                          `}>
                            {isSelected && (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-obsidian" />
                            )}
                          </div>

                          <div className="text-left min-w-0">
                            <div className={`font-display text-xs sm:text-sm uppercase tracking-tight truncate ${isSelected ? 'text-cyan-neon' : 'text-white'}`}>
                              {option.label}
                            </div>
                            {option.steps > 0 && (
                              <div className={`font-mono text-[9px] sm:text-xs truncate ${canAfford ? 'text-warning-yellow' : 'text-critical-red'}`}>
                                {option.steps.toLocaleString()} steps
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-dim" strokeWidth={1.2} fill="none" />
                          <div className="font-mono text-xs sm:text-sm text-cyan-dim whitespace-nowrap">
                            {option.duration}
                          </div>
                        </div>

                        {/* Glow effect for selected */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/10 to-cyan-neon/5 pointer-events-none" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Available Steps - Tactical Panel */}
              <motion.div
                className="relative p-4 sm:p-5 mb-4 sm:mb-6 overflow-hidden"
                style={{
                  clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                  background: 'rgba(5, 5, 5, 0.6)',
                  border: '1px solid rgba(250, 204, 21, 0.4)'
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] sm:text-xs text-cyan-dim uppercase tracking-widest">Available Currency:</span>
                  <span className="font-display text-xl sm:text-2xl font-black text-warning-yellow tracking-tight">
                    {availableSteps.toLocaleString()}
                  </span>
                </div>
              </motion.div>

              {/* Start Button - Tactical */}
              <motion.button
                className="w-full py-4 sm:py-5 font-display font-black text-base sm:text-lg uppercase tracking-wider relative overflow-hidden"
                style={{
                  clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
                  background: availableSteps >= boostOptions[selectedBoost].steps
                    ? 'linear-gradient(to right, #00e5ff, #00b8cc)'
                    : 'rgba(5, 5, 5, 0.5)',
                  border: availableSteps >= boostOptions[selectedBoost].steps
                    ? '2px solid #00e5ff'
                    : '1px solid rgba(0, 229, 255, 0.2)',
                  color: availableSteps >= boostOptions[selectedBoost].steps
                    ? '#050505'
                    : 'rgba(0, 229, 255, 0.3)'
                }}
                onClick={handleStartTraining}
                disabled={availableSteps < boostOptions[selectedBoost].steps}
                whileHover={availableSteps >= boostOptions[selectedBoost].steps ? { scale: 1.01 } : {}}
                whileTap={availableSteps >= boostOptions[selectedBoost].steps ? { scale: 0.99 } : {}}
              >
                <Zap className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 mb-1" strokeWidth={1.2} fill="none" />
                Initiate Training
              </motion.button>
            </>
          ) : (
            <>
              {/* Training Progress */}
              <div className="space-y-4 sm:space-y-6">
                {/* Progress Ring */}
                <div className="flex justify-center">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background ring */}
                      <circle
                        cx="88"
                        cy="88"
                        r="80"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="8"
                        fill="none"
                        className="sm:hidden"
                      />
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="10"
                        fill="none"
                        className="hidden sm:block"
                      />
                      {/* Progress ring - Mobile */}
                      <motion.circle
                        cx="88"
                        cy="88"
                        r="80"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="sm:hidden"
                        initial={{ strokeDasharray: '0 502' }}
                        animate={{ strokeDasharray: `${(progress / 100) * 502} 502` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      {/* Progress ring - Desktop */}
                      <motion.circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        className="hidden sm:block"
                        initial={{ strokeDasharray: '0 628' }}
                        animate={{ strokeDasharray: `${(progress / 100) * 628} 628` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00e5ff" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="font-display text-4xl sm:text-5xl font-black text-cyan-neon">
                        {Math.round(progress)}%
                      </div>
                      <div className="font-mono text-[9px] sm:text-xs text-cyan-dim uppercase mt-1 sm:mt-2 tracking-widest">
                        Processing
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Remaining - Tactical Panel */}
                <motion.div
                  className="relative p-5 sm:p-6 text-center overflow-hidden"
                  style={{
                    clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(250, 204, 21, 0.4)'
                  }}
                  animate={{ borderColor: ['rgba(250, 204, 21, 0.4)', 'rgba(250, 204, 21, 0.8)', 'rgba(250, 204, 21, 0.4)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="font-mono text-[9px] sm:text-[10px] text-cyan-dim uppercase mb-2 tracking-widest">
                    Time Remaining
                  </div>
                  <div className="font-display text-3xl sm:text-5xl font-black text-warning-yellow tracking-tight">
                    {formatTime(remainingTime)}
                  </div>
                </motion.div>

                {/* Training Animation - Pulsing Dots */}
                <motion.div
                  className="relative p-5 sm:p-6 overflow-hidden"
                  style={{
                    clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                    background: 'rgba(5, 5, 5, 0.6)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-neon"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-neon"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-neon"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-cyan-dim text-center leading-relaxed">
                    Neural pathways synchronizing... Combat algorithms optimizing...
                  </p>
                </motion.div>

                {/* Info */}
                <div className="text-center">
                  <p className="font-mono text-[9px] sm:text-xs text-cyan-dim/70 tracking-wide">
                    Training protocol locked - Cancellation unavailable
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TrainingDojo
