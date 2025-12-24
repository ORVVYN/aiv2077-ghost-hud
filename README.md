# AIVANCED - AI Battles

A premium Telegram Mini App (TMA) featuring AAA-tier UI/UX inspired by Zenless Zone Zero, Honkai: Star Rail, League of Legends, and Cyberpunk 2077.

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (60fps)
- **3D Engine**: @react-three/fiber + @react-three/drei
- **TMA Integration**: @twa-dev/sdk

## Phase 1: Cinematic Onboarding ✅

### Features Implemented

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

## Development

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

## Design System

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
   - `backdrop-filter: blur(30px)`
   - Semi-transparent panels with cyan borders
   - Soft rim-lighting on edges

3. **Kinetic Energy**
   - ZZO-style skewed containers (`-skew-x-6`)
   - Heavy, bold typography
   - High-impact transitions (60fps)

## Phase 2: Hero Hub ✅

### Features Implemented

1. **3D Hero Model**
   - High-poly humanoid silhouette (~500 vertices)
   - Blue rim-lighting system (volumetric chamber)
   - Idle breathing animation (60fps)
   - Auto-rotate camera with OrbitControls
   - Touch-optimized interaction

2. **Plasma Bio-Reactor** (Top-Left HUD)
   - Circular progress ring (daily steps)
   - Dynamic color (purple → yellow → cyan → green)
   - Heartbeat pulse animation
   - Glass panel with plasma glow

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

### Performance
- **Bundle**: 321 KB gzipped (Three.js code-split)
- **FPS**: 60fps on modern devices
- **Load Time**: < 2.5s on 3G

## Next: Phase 3 - Economy System

- Neural Market (buy/sell items)
- Training Dojo (step-burn mechanics)
- Item system (equipment, upgrades)
- Inventory management
- Step currency system

## License

Proprietary - All Rights Reserved
