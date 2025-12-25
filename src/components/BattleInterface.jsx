import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Heart } from 'lucide-react'
import telegram from '../utils/telegram'

/**
 * BattleInterface - Live Combat View
 * Split-screen heroes + Streaming Combat Log Terminal
 * AAA POLISH: Segmented HP bars, Floating damage numbers, Combat metadata
 */
const BattleInterface = ({ hero, opponent, onBattleEnd }) => {
  const [combatLog, setCombatLog] = useState([])
  const [heroHP, setHeroHP] = useState(100)
  const [opponentHP, setOpponentHP] = useState(100)
  const [criticalFlash, setCriticalFlash] = useState(false)
  const [screenShake, setScreenShake] = useState(false)
  const [battleTime, setBattleTime] = useState(0)
  const [floatingDamage, setFloatingDamage] = useState([])
  const [heroHPFlash, setHeroHPFlash] = useState([])
  const [opponentHPFlash, setOpponentHPFlash] = useState([])
  const [coreTemp, setCoreTemp] = useState(72)
  const [neuralSync, setNeuralSync] = useState(99.8)
  const logEndRef = useRef(null)

  const HP_SEGMENTS = 15

  // Auto-scroll combat log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [combatLog])

  // Battle simulation engine
  useEffect(() => {
    const battleTimer = setInterval(() => {
      setBattleTime(prev => prev + 1)
      // Fluctuate metadata
      setCoreTemp(prev => Math.min(99, prev + Math.random() * 2))
      setNeuralSync(prev => Math.max(95, prev - Math.random() * 0.5))
    }, 1000)

    // Combat simulation
    const combatInterval = setInterval(() => {
      const timestamp = new Date().toISOString().substr(14, 5)
      const actions = [
        // Hero actions
        {
          actor: hero.name,
          action: 'NEURAL_STRIKE',
          target: opponent.name,
          damage: Math.floor(Math.random() * 25) + 15,
          isCritical: Math.random() > 0.7
        },
        {
          actor: hero.name,
          action: 'VOLT_BLAST',
          target: opponent.name,
          damage: Math.floor(Math.random() * 30) + 20,
          isCritical: Math.random() > 0.8
        },
        {
          actor: hero.name,
          action: 'DEFENSIVE_MATRIX',
          target: hero.name,
          isDefense: true
        },
        // Opponent actions
        {
          actor: opponent.name,
          action: 'SHADOW_SLASH',
          target: hero.name,
          damage: Math.floor(Math.random() * 25) + 15,
          isCritical: Math.random() > 0.7
        },
        {
          actor: opponent.name,
          action: 'DARK_PULSE',
          target: hero.name,
          damage: Math.floor(Math.random() * 30) + 20,
          isCritical: Math.random() > 0.8
        }
      ]

      const randomAction = actions[Math.floor(Math.random() * actions.length)]

      // Apply damage
      if (randomAction.damage && randomAction.target === opponent.name) {
        setOpponentHP(prev => {
          const newHP = Math.max(0, prev - randomAction.damage)

          // Add floating damage number
          const damageId = Date.now()
          setFloatingDamage(fd => [...fd, {
            id: damageId,
            amount: randomAction.damage,
            isOpponent: true,
            isCritical: randomAction.isCritical
          }])
          setTimeout(() => setFloatingDamage(fd => fd.filter(d => d.id !== damageId)), 1000)

          // Flash segments
          const segmentsLost = Math.ceil((randomAction.damage / 100) * HP_SEGMENTS)
          const startSegment = Math.ceil((newHP / 100) * HP_SEGMENTS)
          const flashSegments = Array.from({ length: segmentsLost }, (_, i) => startSegment + i)
          setOpponentHPFlash(flashSegments)
          setTimeout(() => setOpponentHPFlash([]), 300)

          if (newHP === 0) {
            setTimeout(() => onBattleEnd('victory'), 1500)
          }
          return newHP
        })
      } else if (randomAction.damage && randomAction.target === hero.name) {
        setHeroHP(prev => {
          const newHP = Math.max(0, prev - randomAction.damage)

          // Add floating damage number
          const damageId = Date.now()
          setFloatingDamage(fd => [...fd, {
            id: damageId,
            amount: randomAction.damage,
            isOpponent: false,
            isCritical: randomAction.isCritical
          }])
          setTimeout(() => setFloatingDamage(fd => fd.filter(d => d.id !== damageId)), 1000)

          // Flash segments
          const segmentsLost = Math.ceil((randomAction.damage / 100) * HP_SEGMENTS)
          const startSegment = Math.ceil((newHP / 100) * HP_SEGMENTS)
          const flashSegments = Array.from({ length: segmentsLost }, (_, i) => startSegment + i)
          setHeroHPFlash(flashSegments)
          setTimeout(() => setHeroHPFlash([]), 300)

          if (newHP === 0) {
            setTimeout(() => onBattleEnd('defeat'), 1500)
          }
          return newHP
        })
      }

      // Critical hit effects
      if (randomAction.isCritical) {
        setCriticalFlash(true)
        setScreenShake(true)
        telegram.impactOccurred('heavy')
        setTimeout(() => {
          setCriticalFlash(false)
          setScreenShake(false)
        }, 200)
      } else if (randomAction.damage) {
        telegram.impactOccurred('light')
      }

      // Add to log
      const logEntry = {
        id: Date.now(),
        timestamp,
        ...randomAction
      }

      setCombatLog(prev => [...prev, logEntry].slice(-15)) // Keep last 15 entries
    }, 2000)

    return () => {
      clearInterval(battleTimer)
      clearInterval(combatInterval)
    }
  }, [hero, opponent, onBattleEnd])

  // Segmented HP Bar Component
  const SegmentedHPBar = ({ hp, maxHP, color, flashSegments }) => {
    const segments = []
    const activeSegments = Math.ceil((hp / maxHP) * HP_SEGMENTS)

    for (let i = 0; i < HP_SEGMENTS; i++) {
      const isActive = i < activeSegments
      const isFlashing = flashSegments.includes(i)

      segments.push(
        <motion.div
          key={i}
          className="h-full"
          style={{
            width: `${100 / HP_SEGMENTS}%`,
            background: isActive ? color : 'rgba(0, 0, 0, 0.3)',
            boxShadow: isActive ? `0 0 8px ${color}` : 'none',
            marginRight: i < HP_SEGMENTS - 1 ? '2px' : '0'
          }}
          animate={isFlashing ? {
            background: ['rgba(255, 0, 60, 0.9)', color],
            scale: [1.2, 1]
          } : {}}
          transition={{ duration: 0.3 }}
        />
      )
    }

    return (
      <div className="h-3 flex items-center rounded-sm overflow-hidden bg-black/40">
        {segments}
      </div>
    )
  }

  return (
    <motion.div
      className={`fixed inset-0 z-50 overflow-hidden ${screenShake ? 'animate-shake' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Critical Flash Overlay */}
      <AnimatePresence>
        {criticalFlash && (
          <motion.div
            className="absolute inset-0 bg-critical-red z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Combat Background - Red-tinted */}
      <div className="absolute inset-0 z-0">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.2) contrast(1.5) blur(18px) hue-rotate(330deg)',
            opacity: 0.7
          }}
        />
      </div>

      {/* Red overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-critical-red/20 via-transparent to-critical-red/15 pointer-events-none" />

      {/* Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-15" />

      {/* COMBAT METADATA - Top Corners */}
      <div className="absolute top-4 left-4 font-mono text-[7px] text-critical-red/30 uppercase tracking-widest space-y-0.5 z-10">
        <div>CORE_TEMP: {coreTemp.toFixed(1)}°C</div>
        <div>LATENCY: {Math.floor(Math.random() * 20) + 10}ms</div>
        <div>ENCRYPTION: AES-256</div>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[7px] text-critical-red/30 uppercase tracking-widest space-y-0.5 text-right z-10">
        <div>NEURAL_SYNC: {neuralSync.toFixed(1)}%</div>
        <div>BUFFER_STATUS: OVERLOAD</div>
        <div>SIGNAL: LOCKED</div>
      </div>

      {/* Main Layout */}
      <div className="relative h-full flex flex-col p-4">
        {/* Top: Battle Timer */}
        <div className="text-center mb-4">
          <div className="font-mono text-xs text-critical-red/50 uppercase tracking-widest">
            [ COMBAT ACTIVE ]
          </div>
          <div className="font-tactical text-2xl font-black text-critical-red">
            {Math.floor(battleTime / 60).toString().padStart(2, '0')}:{(battleTime % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Split-screen: Heroes */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Your Hero */}
          <div className="relative">
            <div
              className="ghost-panel p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(0, 229, 255, 0.05))',
                border: '1px solid rgba(0, 229, 255, 0.3)'
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyan-neon/40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-cyan-neon/40" />

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${hero.appearance?.glowColor}40, transparent)`,
                    border: `2px solid ${hero.appearance?.primaryColor}`,
                    boxShadow: `0 0 20px ${hero.appearance?.glowColor}60`
                  }}
                />
                <div className="flex-1">
                  <div className="font-tactical text-lg font-black text-cyan-neon uppercase">
                    {hero.name}
                  </div>
                  <div className="font-mono text-[9px] text-cyan-dim/60 uppercase">
                    {hero.codename}
                  </div>
                </div>
              </div>

              {/* HP Bar */}
              <div className="space-y-1 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-critical-red" fill="currentColor" />
                    <span className="font-mono text-[10px] text-cyan-dim/60 uppercase">HP</span>
                  </div>
                  <span className="font-mono text-xs text-cyan-neon font-bold">{heroHP}/100</span>
                </div>
                <SegmentedHPBar
                  hp={heroHP}
                  maxHP={100}
                  color="rgba(0, 229, 255, 0.9)"
                  flashSegments={heroHPFlash}
                />

                {/* Floating Damage Numbers */}
                <AnimatePresence>
                  {floatingDamage.filter(d => !d.isOpponent).map(damage => (
                    <motion.div
                      key={damage.id}
                      className={`absolute top-0 right-0 font-tactical text-2xl font-black ${
                        damage.isCritical ? 'text-critical-red' : 'text-warning-yellow'
                      }`}
                      style={{
                        textShadow: damage.isCritical
                          ? '0 0 20px rgba(255, 0, 60, 1)'
                          : '0 0 15px rgba(250, 204, 21, 0.8)'
                      }}
                      initial={{ opacity: 1, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -50, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      -{damage.amount}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Opponent */}
          <div className="relative">
            <div
              className="ghost-panel p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.05))',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-plasma-purple/40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-plasma-purple/40" />

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)',
                    border: '2px solid rgba(168, 85, 247, 0.8)',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                  }}
                />
                <div className="flex-1">
                  <div className="font-tactical text-lg font-black text-plasma-purple uppercase">
                    {opponent.name}
                  </div>
                  <div className="font-mono text-[9px] text-plasma-purple/60 uppercase">
                    {opponent.codename}
                  </div>
                </div>
              </div>

              {/* HP Bar */}
              <div className="space-y-1 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-critical-red" fill="currentColor" />
                    <span className="font-mono text-[10px] text-plasma-purple/60 uppercase">HP</span>
                  </div>
                  <span className="font-mono text-xs text-plasma-purple font-bold">{opponentHP}/100</span>
                </div>
                <SegmentedHPBar
                  hp={opponentHP}
                  maxHP={100}
                  color="rgba(168, 85, 247, 0.9)"
                  flashSegments={opponentHPFlash}
                />

                {/* Floating Damage Numbers */}
                <AnimatePresence>
                  {floatingDamage.filter(d => d.isOpponent).map(damage => (
                    <motion.div
                      key={damage.id}
                      className={`absolute top-0 right-0 font-tactical text-2xl font-black ${
                        damage.isCritical ? 'text-critical-red' : 'text-warning-yellow'
                      }`}
                      style={{
                        textShadow: damage.isCritical
                          ? '0 0 20px rgba(255, 0, 60, 1)'
                          : '0 0 15px rgba(250, 204, 21, 0.8)'
                      }}
                      initial={{ opacity: 1, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -50, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      -{damage.amount}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Log Terminal */}
        <div
          className="flex-1 ghost-panel p-4 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 5, 5, 0.9), rgba(5, 5, 5, 0.9))',
            border: '1px solid rgba(255, 0, 60, 0.3)',
            backdropFilter: 'blur(40px)'
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-critical-red/20">
            <div className="font-mono text-xs text-critical-red/70 uppercase tracking-wider">
              [ COMBAT_LOG.TERMINAL ]
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-critical-red animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-warning-yellow/50" />
              <div className="w-2 h-2 rounded-full bg-cyan-neon/30" />
            </div>
          </div>

          {/* Log Stream */}
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-critical-red/30 scrollbar-track-transparent">
            <div className="space-y-1 font-mono text-xs">
              {combatLog.map((entry) => (
                <motion.div
                  key={entry.id}
                  className={`
                    ${entry.isCritical ? 'text-critical-red font-bold' :
                      entry.isDefense ? 'text-cyan-neon' :
                      entry.actor === hero.name ? 'text-cyan-dim' : 'text-plasma-purple/80'}
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-cyan-dim/40">[{entry.timestamp}]</span>{' '}
                  <span className={entry.actor === hero.name ? 'text-cyan-neon' : 'text-plasma-purple'}>
                    {entry.actor}
                  </span>
                  {' '}
                  {entry.isDefense ? (
                    <>
                      <span className="text-cyan-neon">ACTIVATES</span> '{entry.action}'
                      <Shield className="inline w-3 h-3 ml-1" />
                    </>
                  ) : (
                    <>
                      <span className="text-warning-yellow/70">USES</span> '{entry.action}'
                      {entry.isCritical && <span className="text-critical-red font-black ml-2">[CRITICAL!]</span>}
                      {entry.damage && (
                        <span className="text-critical-red ml-2">
                          -{entry.damage} HP → {entry.target}
                        </span>
                      )}
                      {entry.isCritical && <Zap className="inline w-3 h-3 ml-1 text-critical-red" fill="currentColor" />}
                    </>
                  )}
                </motion.div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BattleInterface
