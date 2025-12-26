# AIVANCED - AI Battles

A premium Telegram Mini App (TMA) featuring AAA-tier UI/UX inspired by Zenless Zone Zero, Honkai: Star Rail, League of Legends, and Cyberpunk 2077.

## 🎮 Current Status: Phase 6 COMPLETE! 🎉

- ✅ Phase 1: Cinematic Onboarding
- ✅ Phase 2: Hero Hub & 3D Models
- ✅ Phase 3: Economy System
- ✅ Phase 4: Arena Combat
- ✅ Phase 5: Global Ladder
- ✅ Phase 6: Neural Syndicates & Grid Invasions (14/14 components)

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Cyberpunk Palette)
- **Animations**: Framer Motion (60fps)
- **3D Engine**: @react-three/fiber + @react-three/drei
- **TMA Integration**: @twa-dev/sdk
- **Icons**: Lucide React

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Features

### Phase 1: Cinematic Onboarding ✅

1. **Splash Screen**
   - Neural Link boot sequence
   - Chromatic aberration logo effect
   - Tactical grid background with scanlines
   - System boot haptic feedback

2. **Neural Sync Screen**
   - 6-digit GRID_ID tactical numpad
   - Glowing keycap buttons with haptic feedback
   - Real-time input validation
   - ZZO-style skewed UI containers
   - Glass panel effects with backdrop blur

3. **Telegram Integration**
   - HapticFeedback API (grid key press, neural sync, system boot)
   - CloudStorage API (save/load GRID_ID)
   - Theme customization

### Phase 2: Hero Hub ✅

1. **3D Hero Model**
   - High-poly humanoid silhouette (~500 vertices)
   - Blue rim-lighting system (volumetric chamber)
   - Idle breathing animation (60fps)
   - Auto-rotate camera with OrbitControls
   - Touch-optimized interaction

2. **Command Header** (Unified Top HUD)
   - **Bio-Reactor**: Circular progress ring for daily steps
   - **AIV Extraction**: 60fps particle stream animation
   - **User Identity**: Avatar orb with pulsing glow
   - **Balance Display**: AIV Reserve & Credits
   - Scrolling metadata ticker

3. **Biometrics Panel** (Left-Edge HUD)
   - 4 stat bars: STR, AGI, INT, STA
   - ZZO-style segmented bars (10 segments each)
   - Color-coded glow effects
   - Sequential fill animation

4. **Hero Gallery** (Bottom Swiper)
   - 5 holographic hero cards
   - Horizontal swipe interaction (touch/mouse)
   - Holographic sheen effect
   - Screen glitch transition on hero switch
   - Mini stat previews per card
   - Locked/unlocked states

5. **Hero Database**
   - 5 heroes with complete stats
   - 3 unlocked, 2 locked
   - League system (Bronze → AIVANCED)
   - Rarity tiers (Rare → Mythic)

### Phase 3: Economy System ✅

1. **Neural Market**
   - 15 items across 5 categories (Weapons, Armor, Consumables, Upgrades, Cosmetics)
   - Rarity system (Common → Mythic)
   - Holographic neon blueprint icons
   - Glass blur overlays
   - Scanline reveal animation
   - Chromatic aberration titles

2. **Inventory Management**
   - Equip/Unequip system
   - Equipment bonus calculation
   - Consumable usage
   - AAA tactical design

3. **Training Dojo**
   - Stat upgrades using AIV currency
   - Animated progress indicators
   - Step-burn mechanics

4. **Currency System**
   - **Daily Steps**: Daily progress (pending extraction)
   - **AIV Reserve**: Extracted currency for spending
   - **Credits (CR)**: Secondary currency

### Phase 4: Arena Combat ✅

1. **Arena Lobby**
   - Matchmaking interface
   - Entry fee system
   - Queue status display

2. **Versus Screen**
   - Pre-battle cinematic
   - Hero vs Opponent showcase
   - Dramatic intro animations

3. **Battle Interface**
   - Real-time combat simulation
   - Skill activation system
   - Health/Energy bars
   - Combat log feed

4. **Rewards Screen**
   - Victory/Defeat display
   - Loot distribution
   - XP and LP gains
   - Item rewards

### Phase 5: Global Ladder ✅

1. **Competitive Ranking**
   - League system (Bronze → AIVANCED)
   - League Points (LP) progression
   - Tier thresholds

2. **Leaderboard**
   - Top 100 players
   - Real-time rankings
   - Player profiles

3. **League Advancement**
   - Automatic tier promotion
   - Haptic feedback on promotion
   - Visual celebration effects

### Phase 6: Neural Syndicates & Grid Invasions ✅ (100% Complete)

1. **Syndicate System**
   - **SyndicateHub**: Elite HQ with Grand Reactor visualization
   - **GrandReactor**: Hexagonal reactor with color transitions (Cyan → Purple → Yellow → Red)
   - **DonateStepsModal**: Step donation with impact preview and level-up detection
   - **MemberList**: Contribution rankings with role-based coloring
   - **SyndicateChat**: Tactical terminal with auto-scroll and timestamps
   - **SyndicateCreate**: 3-step wizard (Basic Info → Customization → Preview)
   - **SyndicateEmblem**: 12 SVG emblems with neon glow effects
   - Level 1-10 progression with AIV bonuses (0% → 50%)
   - Shared step pool mechanics
   - Member roles: Leader (Gold), Officer (Cyan), Member (Slate)
   - Creation cost: 50,000 AIV

2. **Grid Invasions (Tournaments)**
   - **TournamentBracket**: LoL Worlds-style bracket visualization
   - **TournamentLobby**: Registration with queue system
   - **WarRoom**: 12-sector control map (4×3 grid)
   - **Emergency Lockdown Mode**: Red alert system with haptic feedback
   - Tournament types:
     - Daily Invasion (16 players, Best of 3)
     - Weekly Invasion (64 players, Best of 5)
     - Syndicate Wars (32 teams, Monthly)
   - Sector control with passive AIV rewards (10K/day per sector)
   - Challenge system (Level 7+ syndicates required)
   - Invasion mode effects: HUD flicker, red scanline, background pulse

3. **Syndicate Discovery**
   - **SyndicateBrowser**: Search and filter public syndicates
   - Syndicate preview cards with emblem, stats, description
   - JOIN button with availability checking
   - Filter modes: Public, Top, All

4. **Hall of Fame**
   - **HallOfFame**: Golden Ghost gallery with hologram platforms
   - Legendary player profiles with chromatic aberration
   - Achievement lists and career stats
   - Floating particle effects (8 per ghost)
   - Scanline overlay for retro aesthetic

5. **Data Models & Utilities**
   - 12 syndicate emblems (BLADE, SHIELD, PHOENIX, SKULL, DRAGON, WOLF, CROWN, LIGHTNING, STAR, HEXAGON, INFINITY, VORTEX)
   - Helper functions for level progress, reactor color, donation impact
   - Mock syndicates: APEX Predators, Ninja Squad, Wolf Pack
   - Emergency Lockdown utility: triggerInvasionMode(), exitInvasionMode()

**All Components Complete**: SyndicateHub, GrandReactor, DonateStepsModal, MemberList, SyndicateChat, SyndicateCreate, SyndicateEmblem, SyndicateBrowser, TournamentBracket, TournamentLobby, WarRoom, HallOfFame, Emergency Lockdown Mode, Data Models

## 🎨 Design System

### Color Palette

- **Deep Obsidian**: `#050505` - Primary background
- **High-Frequency Cyan**: `#00e5ff` - Primary accent
- **Warning Yellow**: `#facc15` - Alerts & highlights
- **Critical Red**: `#ff003c` - Errors & damage
- **Plasma Purple**: `#a855f7` - Special effects

### Typography

- **Display**: Exo 2 (Hero titles, stats)
- **Tactical**: Rajdhani (UI elements)
- **Mono**: JetBrains Mono (Terminal text)

### UI Principles

1. **3-Layer Composition**
   - Layer 0: Parallax grid background
   - Layer 1: 3D Hero model (60-70% height)
   - Layer 2: HUD panels (pinned to edges)

2. **Glassmorphism**
   - `backdrop-filter: blur(30-40px)`
   - Semi-transparent panels with cyan borders
   - Soft rim-lighting on edges

3. **ZZO-Style Kinetic Energy**
   - Skewed containers (`-skew-x-6`)
   - Trapezoid clip-paths
   - Heavy, bold typography
   - High-impact transitions (60fps)

### Visual Effects (VFX)

- **Scanline Reveal**: Laser sweep on modal open
- **Chromatic Aberration**: RGB split on titles
- **Particle Streams**: 60fps AIV extraction
- **Holographic Icons**: Neon blueprint style with glow
- **Glass Blur Overlays**: Hero remains visible
- **Gemini Grid**: 40px violet grid
- **Ambient Lighting**: Pulsing gradients
- **Micro-grid Texture**: On glass panels

## ⚡ Performance

- **Bundle**: 321 KB gzipped (Three.js code-split)
- **FPS**: 60fps on modern devices
- **Load Time**: < 2.5s on 3G
- **Optimizations**:
  - Manual chunks for Three.js
  - Suspense for 3D loading
  - AnimatePresence for modals

## 🎯 Game Mechanics

### Core Loop

1. **Collect Steps** → Daily steps accumulate
2. **Extract AIV** → Convert steps to AIV Reserve (60fps particle animation)
3. **Shop** → Spend AIV in Neural Market
4. **Equip** → Manage gear via Inventory
5. **Train** → Upgrade hero in Training Dojo
6. **Battle** → Arena PvP for League Points
7. **Climb** → Ascend the Global Ladder

### Heroes Database

1. **Zephyr-01** (Chrome, Legendary) - Neural Striker
2. **Nova-02** (Gold, Epic) - Plasma Guardian
3. **Phoenix-03** (Bronze, Rare) - Tactical Recon
4. **Crimson-04** (Plasma, Legendary) - Berserker Core [Locked]
5. **Void-05** (AIVANCED, Mythic) - Shadow Protocol [Locked]

### Items System

15 items across 5 categories:
- **Weapons** (3): Neural Blade, Quantum Rifle, Void Hammer
- **Armor** (3): Tactical Vest, Cyber Exo-Suit, Void Plate
- **Consumables** (3): Neural Boost, Adrenaline Shot, Repair Nano-Kit
- **Upgrades** (3): Neural Processor, Muscle Augment, Reflex Chip
- **Cosmetics** (2): Neon Visor, Plasma Wings

## 📂 Project Structure

```
aiv2077/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   ├── NeuralSyncScreen.jsx
│   │   ├── HeroHub.jsx
│   │   ├── CommandHeader.jsx
│   │   ├── BiometricsPanel.jsx
│   │   ├── PlasmaBioReactor.jsx
│   │   ├── HeroGallery.jsx
│   │   ├── HeroModel3D.jsx
│   │   ├── NeuralMarket.jsx
│   │   ├── Inventory.jsx
│   │   ├── TrainingDojo.jsx
│   │   ├── ArenaLobby.jsx
│   │   ├── VersusScreen.jsx
│   │   ├── BattleInterface.jsx
│   │   ├── RewardsScreen.jsx
│   │   ├── GlobalLadder.jsx
│   │   └── TierEncyclopedia.jsx
│   ├── data/
│   │   ├── heroes.js
│   │   └── items.js
│   ├── utils/
│   │   └── telegram.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── core.png
│   └── model.fbx
└── Documentation/
    ├── README.md (this file)
    ├── PHASE2.md
    ├── PHASE3.md
    ├── PHASE4.md
    ├── PHASE5.md
    ├── CHANGELOG.md
    ├── COMPONENTS.md
    └── ...
```

## 🔮 Roadmap

### ✅ Phase 6: Neural Syndicates (COMPLETE)
- ✅ Clan system (create/join)
- ✅ Shared Step Reactor
- ✅ Syndicate HQ screen
- ✅ Member management
- ✅ Tactical chat terminal
- ✅ Tournament brackets
- ✅ Daily/Weekly events
- ✅ Sector control map
- ✅ War Room UI
- ✅ Hall of Fame
- ✅ Emergency Lockdown Mode
- ✅ 12 Syndicate Emblems

### Phase 7: Backend Integration (Next)
- API endpoint integration
- Real-time WebSocket communication
- Database schema implementation
- User authentication & authorization
- Leaderboard real-time updates
- Syndicate data persistence
- Tournament matchmaking system

### Phase 8: Advanced Features (Planned)
- Daily missions & rewards
- Achievement system
- Friend list & social features
- Replay system for battles
- Advanced analytics dashboard
- Season pass & battle pass
- Custom hero skins & cosmetics

## 📄 License

Proprietary - All Rights Reserved

## 🎉 Credits

**Design Inspiration**:
- Zenless Zone Zero (HoYoverse)
- Honkai: Star Rail (HoYoverse)
- League of Legends (Riot Games)
- Cyberpunk 2077 (CD Projekt Red)

---

**Latest Update**: Phase 6 Complete (Neural Syndicates & Grid Invasions) 🎉
**Status**: Frontend Complete - Ready for Backend Integration ✅
**Next**: Phase 7 - Backend API & Real-time Features 🚀
