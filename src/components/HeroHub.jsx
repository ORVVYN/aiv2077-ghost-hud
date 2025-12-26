import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Zap, Package, Swords, Trophy, Users } from 'lucide-react'
import { heroes as allHeroes, getHeroById } from '../data/heroes'
import HeroModel3D from './HeroModel3D'
import CommandHeader from './CommandHeader'
import BiometricsPanel from './BiometricsPanel'
import HeroGallery from './HeroGallery'
import NeuralMarket from './NeuralMarket'
import TrainingDojo from './TrainingDojo'
import Inventory from './Inventory'
import ArenaLobby from './ArenaLobby'
import VersusScreen from './VersusScreen'
import BattleInterface from './BattleInterface'
import RewardsScreen from './RewardsScreen'
import GlobalLadder from './GlobalLadder'
import SyndicateHub from './SyndicateHub'
import { getPlayerSyndicate, syndicates } from '../data/syndicates'
import telegram from '../utils/telegram'

/**
 * HeroHub - The Command Center (Phase 2)
 * 3-Layer Composition: Grid Background → 3D Hero → HUD Panels
 */
const HeroHub = ({ gridId }) => {
  const [selectedHeroId, setSelectedHeroId] = useState('zephyr-01')
  const [hero, setHero] = useState(getHeroById('zephyr-01'))

  // Phase 3: Economy System State (AIV Currency)
  const [availableSteps, setAvailableSteps] = useState(15000) // Available for spending (market/dojo)
  const [dailySteps, setDailySteps] = useState(3420) // Daily progress (pending extraction)
  const [totalAIV, setTotalAIV] = useState(156000) // Total AIV Reserve (extracted currency)
  const [credits, setCredits] = useState(2500) // Credits (CR)
  const [showMarket, setShowMarket] = useState(false)
  const [showDojo, setShowDojo] = useState(false)
  const [showInventory, setShowInventory] = useState(false)

  // Phase 4: Arena System State
  const [showArena, setShowArena] = useState(false)
  const [arenaStage, setArenaStage] = useState('lobby') // lobby → versus → battle → rewards
  const [opponent, setOpponent] = useState(null)
  const [battleResult, setBattleResult] = useState(null)
  const [battleRewards, setBattleRewards] = useState(null)

  // Phase 5: Global Ladder State
  const [showLadder, setShowLadder] = useState(false)
  const [leaguePoints, setLeaguePoints] = useState(2340) // LP for ranking

  // Phase 6: Neural Syndicates State
  const [showSyndicate, setShowSyndicate] = useState(false)
  const [playerSyndicate, setPlayerSyndicate] = useState(getPlayerSyndicate('player-001')) // Mock player ID

  // ZZO-Style Camera Zoom State (for cinematic transitions)
  const [isCameraZooming, setIsCameraZooming] = useState(false)
  const anyModalOpen = showMarket || showDojo || showInventory || showArena || showLadder || showSyndicate

  // Update hero when selection changes
  useEffect(() => {
    const newHero = getHeroById(selectedHeroId)
    setHero(newHero)
  }, [selectedHeroId])

  // Handle market purchase
  const handlePurchase = (item) => {
    setAvailableSteps(prev => prev - item.price)
    item.owned = true
    telegram.notificationOccurred('success')
  }

  // Handle training complete
  const handleTrainingComplete = (result) => {
    setAvailableSteps(prev => prev - result.stepsBurned)

    // Apply stat gains to current hero
    hero.stats.str += result.gains.str
    hero.stats.agi += result.gains.agi
    hero.stats.int += result.gains.int
    hero.stats.sta += result.gains.sta

    setShowDojo(false)
  }

  // Handle item equip
  const handleEquip = (item) => {
    // Unequip same slot items first
    if (item.slot) {
      allHeroes.forEach(h => {
        h.items?.forEach(i => {
          if (i.slot === item.slot && i.equipped) {
            i.equipped = false
          }
        })
      })
    }
    item.equipped = true
  }

  // Handle item unequip
  const handleUnequip = (item) => {
    item.equipped = false
  }

  // Handle consumable use
  const handleUseConsumable = (item) => {
    // Apply temporary stats or instant effect
    if (item.duration === 0) {
      // Instant effect (e.g., repair kit)
      hero.stats.sta = Math.min(100, hero.stats.sta + item.stats.sta)
    } else {
      // Temporary buff (would need timer system in real app)
      console.log(`Applied ${item.name} for ${item.duration} seconds`)
    }

    // Remove consumable from inventory
    item.owned = false
  }

  // Handle AIV Extraction - Core game mechanic
  const handleExtractAIV = (extractedSteps) => {
    // Transfer daily steps to AIV Reserve
    setTotalAIV(prev => prev + extractedSteps)
    setAvailableSteps(prev => prev + extractedSteps)
    setDailySteps(0) // Reset daily progress after extraction

    telegram.notificationOccurred('success')
  }

  // Arena Handlers
  const handleMatchFound = (matchData) => {
    setOpponent(matchData.opponent)
    setArenaStage('versus')
  }

  const handleBattleStart = () => {
    setArenaStage('battle')
  }

  const handleBattleEnd = (result) => {
    setBattleResult(result)

    // Generate rewards for victory
    if (result === 'victory') {
      const lpGained = Math.floor(Math.random() * 30) + 50 // 50-80 LP per victory

      const rewards = [
        { type: 'xp', amount: 150 },
        { type: 'aiv', amount: 8000 },
        { type: 'lp', amount: lpGained },
        { type: 'item', name: 'Neural Booster', rarity: 'rare' }
      ]
      setBattleRewards(rewards)

      // Apply rewards
      setTotalAIV(prev => prev + 8000)
      setAvailableSteps(prev => prev + 8000)

      // Update League Points
      const oldLP = leaguePoints
      const newLP = oldLP + lpGained
      setLeaguePoints(newLP)

      // Check for league advancement (trigger haptic success)
      const oldLeague = newLP >= 5000 ? 'AIVANCED' : newLP >= 4000 ? 'DIAMOND' : newLP >= 3000 ? 'PLASMA' : newLP >= 2000 ? 'GOLD' : newLP >= 1000 ? 'CHROME' : 'BRONZE'
      const prevLeague = oldLP >= 5000 ? 'AIVANCED' : oldLP >= 4000 ? 'DIAMOND' : oldLP >= 3000 ? 'PLASMA' : oldLP >= 2000 ? 'GOLD' : oldLP >= 1000 ? 'CHROME' : 'BRONZE'

      if (oldLeague !== prevLeague) {
        setTimeout(() => {
          telegram.notificationOccurred('success')
        }, 2000)
      }
    }

    setArenaStage('rewards')
  }

  const handleArenaClose = () => {
    setShowArena(false)
    setArenaStage('lobby')
    setOpponent(null)
    setBattleResult(null)
    setBattleRewards(null)
  }

  // Phase 6: Syndicate Handlers
  const handleDonateSteps = (syndicateId, amount) => {
    // Deduct steps from available pool
    setAvailableSteps(prev => prev - amount)

    // Update syndicate data (in real app, this would be API call)
    const updatedSyndicate = getPlayerSyndicate('player-001')
    setPlayerSyndicate(updatedSyndicate)

    telegram.notificationOccurred('success')
  }

  const handleLeaveSyndicate = (syndicateId) => {
    setPlayerSyndicate(null)
    setShowSyndicate(false)
    telegram.notificationOccurred('warning')
  }

  // Loading fallback for 3D
  const LoadingFallback = () => (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-neon border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
          Loading Neural Chamber...
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ZZO-Style Camera Zoom Overlay */}
      <AnimatePresence>
        {anyModalOpen && (
          <motion.div
            className="fixed inset-0 z-20 pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glitch overlay during zoom */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-neon/10 via-transparent to-plasma-purple/10"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: [0, 0.5, 0], x: ['-100%', '100%'] }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* LAYER 0: AI Server Core Background Image - Revealed Monolith */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/core.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.3) contrast(1.4) blur(12px)',
            opacity: 0.8
          }}
        />
      </div>

      {/* Cyan Floor Gradient - Creates scale and depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(0, 229, 255, 0.08) 0%, transparent 60%)'
        }}
      />

      {/* Gemini Grid Background - 40px violet grid with 0.2 opacity wrapper */}
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-20" />

      {/* Cinematic Ambient Lighting - Gemini Style */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* LAYER 1: The 3D Hero (Center, 60-70% height) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* 3D Hero Chamber - NO UI SHOULD OVERLAP THIS AREA */}
        <div className="relative w-full h-[70vh] max-w-2xl">
          <Suspense fallback={<LoadingFallback />}>
            <HeroModel3D hero={hero} />
          </Suspense>

          {/* INNER FRAME: Hero Combat Scanner - Cyan Brackets with breathing animation */}

          {/* TOP LEFT - Above hero's head */}
          <motion.div
            className="absolute top-16 left-2 w-12 h-12 border-l-2 border-t-2 border-cyan-neon/30 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute -top-4 left-0 font-mono text-[7px] text-cyan-neon/50 uppercase tracking-wider whitespace-nowrap">
              [UNIT_SCAN_ACTIVE]
            </div>
          </motion.div>

          {/* TOP RIGHT - Above hero's head */}
          <motion.div
            className="absolute top-16 right-2 w-12 h-12 border-r-2 border-t-2 border-cyan-neon/30 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />

          {/* BOTTOM LEFT - Below hero's platform */}
          <motion.div
            className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-cyan-neon/30 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
          />

          {/* BOTTOM RIGHT - Below hero's platform */}
          <motion.div
            className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-cyan-neon/30 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.25 }}
          >
            <div className="absolute -bottom-4 right-0 font-mono text-[7px] text-cyan-neon/50 uppercase tracking-wider whitespace-nowrap">
              [UNIT_SCAN_ACTIVE]
            </div>
          </motion.div>

          {/* Hero name display - Orbitron headers (above 3D model) */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
            key={hero.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(0, 229, 255, 0.3)' }}>
                {hero.codename}
              </div>
              <div
                className="font-tactical text-4xl font-black uppercase tracking-tight"
                style={{
                  color: hero.appearance.primaryColor,
                  textShadow: `0 0 16px ${hero.appearance.glowColor}, 0 0 24px ${hero.appearance.glowColor}`,
                  opacity: 0.9
                }}
              >
                {hero.name}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LAYER 2: HUD Panels (Pinned to Edges - Never Overlap Hero) */}

      {/* NEW: Command Header - Unified HUD at top */}
      <CommandHeader
        dailySteps={dailySteps}
        totalAIV={totalAIV}
        credits={credits}
        hero={hero}
        onExtractAIV={handleExtractAIV}
      />

      {/* Left-Edge: Biometrics Panel */}
      <BiometricsPanel stats={hero.stats} />

      {/* Bottom: Hero Gallery */}
      <HeroGallery
        heroes={allHeroes}
        selectedHeroId={selectedHeroId}
        onHeroChange={setSelectedHeroId}
      />

      {/* Phase 3: Tactical Action Dock (Right Edge) - ZZO Style */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        {/* Global Ladder Button - Prestige Gold */}
        <motion.button
          className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 215, 0, 0.4)'
          }}
          onClick={() => {
            telegram.impactOccurred('heavy')
            setShowLadder(true)
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 215, 0, 1)' }}
          whileTap={{ scale: 0.95 }}
          title="Global Ladder"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-warning-yellow/0 to-warning-yellow/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="w-6 h-6 text-warning-yellow relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2} />
        </motion.button>

        {/* Syndicate Button - Plasma Purple */}
        {playerSyndicate && (
          <motion.button
            className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.4)',
              backdropFilter: 'blur(30px)',
              border: `1px solid ${playerSyndicate.colors.primary}40`
            }}
            onClick={() => {
              telegram.impactOccurred('heavy')
              setShowSyndicate(true)
            }}
            whileHover={{ scale: 1.05, borderColor: playerSyndicate.colors.primary }}
            whileTap={{ scale: 0.95 }}
            title="Neural Syndicate"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, transparent, ${playerSyndicate.colors.primary}30)` }} />
            <Users className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" style={{ color: playerSyndicate.colors.primary }} strokeWidth={2} />
          </motion.button>
        )}

        {/* Arena Button - Combat Red */}
        <motion.button
          className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={() => {
            telegram.impactOccurred('heavy')
            setShowArena(true)
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 0, 60, 1)' }}
          whileTap={{ scale: 0.95 }}
          title="Combat Arena"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-critical-red/0 to-critical-red/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Swords className="w-6 h-6 text-critical-red relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2} />
        </motion.button>

        {/* Market Button - Tactical Trapezoid */}
        <motion.button
          className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}
          onClick={() => {
            telegram.impactOccurred('heavy')
            setShowMarket(true)
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(0, 229, 255, 1)' }}
          whileTap={{ scale: 0.95 }}
          title="Neural Market"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/0 to-cyan-neon/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShoppingCart className="w-6 h-6 text-cyan-neon relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2} />
        </motion.button>

        {/* Training Dojo Button - Tactical Trapezoid */}
        <motion.button
          className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(250, 204, 21, 0.3)'
          }}
          onClick={() => {
            telegram.impactOccurred('heavy')
            setShowDojo(true)
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(250, 204, 21, 1)' }}
          whileTap={{ scale: 0.95 }}
          title="Training Dojo"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-warning-yellow/0 to-warning-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap className="w-6 h-6 text-warning-yellow relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2} fill="currentColor" />
        </motion.button>

        {/* Inventory Button - Tactical Trapezoid */}
        <motion.button
          className="relative w-16 h-16 flex items-center justify-center overflow-hidden group"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}
          onClick={() => {
            telegram.impactOccurred('heavy')
            setShowInventory(true)
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 1)' }}
          whileTap={{ scale: 0.95 }}
          title="Inventory"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-plasma-purple/0 to-plasma-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Package className="w-6 h-6 text-plasma-purple relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2} />
        </motion.button>
      </motion.div>

      {/* Phase 3: Modal Windows */}
      <AnimatePresence>
        {showMarket && (
          <NeuralMarket
            availableSteps={availableSteps}
            onPurchase={handlePurchase}
            onClose={() => setShowMarket(false)}
          />
        )}

        {showDojo && (
          <TrainingDojo
            hero={hero}
            availableSteps={availableSteps}
            onTrainingComplete={handleTrainingComplete}
            onClose={() => setShowDojo(false)}
          />
        )}

        {showInventory && (
          <Inventory
            onEquip={handleEquip}
            onUnequip={handleUnequip}
            onUse={handleUseConsumable}
            onClose={() => setShowInventory(false)}
          />
        )}

        {/* Phase 4: Arena System */}
        {showArena && arenaStage === 'lobby' && (
          <ArenaLobby
            hero={hero}
            availableAIV={availableSteps}
            credits={credits}
            onClose={handleArenaClose}
            onMatchFound={handleMatchFound}
          />
        )}

        {showArena && arenaStage === 'versus' && opponent && (
          <VersusScreen
            hero={hero}
            opponent={opponent}
            onBattleStart={handleBattleStart}
          />
        )}

        {showArena && arenaStage === 'battle' && opponent && (
          <BattleInterface
            hero={hero}
            opponent={opponent}
            onBattleEnd={handleBattleEnd}
          />
        )}

        {showArena && arenaStage === 'rewards' && battleResult && (
          <RewardsScreen
            result={battleResult}
            rewards={battleRewards}
            onClose={handleArenaClose}
          />
        )}

        {/* Phase 5: Global Ladder */}
        {showLadder && (
          <GlobalLadder
            hero={hero}
            currentLP={leaguePoints}
            onClose={() => setShowLadder(false)}
          />
        )}

        {/* Phase 6: Neural Syndicates */}
        {showSyndicate && playerSyndicate && (
          <SyndicateHub
            syndicateId={playerSyndicate.id}
            playerId="player-001"
            playerSteps={availableSteps}
            onClose={() => setShowSyndicate(false)}
            onDonate={handleDonateSteps}
            onLeave={handleLeaveSyndicate}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default HeroHub
