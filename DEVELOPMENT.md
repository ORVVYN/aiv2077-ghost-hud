# AIVANCED Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will run at `http://localhost:5173`

## Testing in Telegram

### Method 1: Using ngrok (Recommended for Development)

1. Install ngrok: `npm install -g ngrok`
2. Start the dev server: `npm run dev`
3. In another terminal, run: `ngrok http 5173`
4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
5. Send this URL to BotFather as your Mini App URL

### Method 2: Deploy to Production

1. Build the app: `npm run build`
2. Deploy the `dist/` folder to:
   - Vercel: `vercel deploy`
   - Netlify: Drag & drop `dist/` folder
   - GitHub Pages: Push to `gh-pages` branch
3. Use the production URL in Telegram

## Project Structure

```
aiv2077/
├── public/              # Static assets
│   └── vite.svg        # Favicon
├── src/
│   ├── components/     # React components
│   │   ├── SplashScreen.jsx       # Phase 1: Boot sequence
│   │   └── NeuralSyncScreen.jsx   # Phase 1: GRID_ID input
│   ├── utils/          # Utility functions
│   │   └── telegram.js # TMA SDK wrapper
│   ├── App.jsx         # Main app orchestrator
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles + Tailwind
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Design system tokens
└── package.json        # Dependencies
```

## Phase 1: Cinematic Onboarding ✅

### Implemented Features

#### 1. Splash Screen (`SplashScreen.jsx`)
- **Neural Link Boot Sequence**
  - Animated grid background with parallax
  - Scanline overlay effect
  - Terminal-style boot text

- **Chromatic Aberration Logo**
  - RGB channel separation effect
  - Glitch animation on logo reveal
  - Smooth fade transitions

- **Haptic Feedback**
  - System boot pattern (heavy → medium → light)
  - Integrated via `telegram.systemBoot()`

#### 2. Neural Sync Screen (`NeuralSyncScreen.jsx`)
- **Tactical Numpad**
  - ZZO-style skewed buttons (`-skew-x-6`)
  - Individual digit slots with cursor blink
  - Real-time validation (6-digit requirement)

- **Interactive Feedback**
  - Haptic chirp on each key press
  - Error state with red warning panel
  - Loading state during validation

- **Data Persistence**
  - Saves GRID_ID to Telegram CloudStorage
  - Falls back to localStorage if TMA unavailable

#### 3. Telegram Integration (`telegram.js`)
- **HapticFeedback API**
  - `gridKeyPress()` - Light tap for numpad
  - `neuralSync()` - Triple-pulse for sync
  - `systemBoot()` - Cascade haptic pattern
  - `criticalHit()` - Heavy double-tap (for Phase 4)

- **CloudStorage API**
  - `saveData(key, value)` - Async save with fallback
  - `loadData(key)` - Async load with fallback

- **Theme Customization**
  - Sets header/background to `#050505` (Deep Obsidian)
  - Expands webview to full height

## Design System Reference

### Color Tokens (Tailwind)

```js
// Core Palette
obsidian: '#050505'       // Background
cyan-neon: '#00e5ff'      // Primary accent
warning-yellow: '#facc15' // Alerts
critical-red: '#ff003c'   // Errors
plasma-purple: '#a855f7'  // Special effects
```

### Typography Scale

```js
// Font Families
font-tactical  → Rajdhani (UI elements)
font-display   → Exo 2 (Hero titles)
font-mono      → JetBrains Mono (Terminal)

// Font Sizes
text-hero-title: 3.5rem (56px)
text-section-title: 2rem (32px)
text-stat-value: 2.5rem (40px)
```

### Glassmorphism Pattern

```jsx
<div className="glass-panel">
  {/* Semi-transparent with blur */}
</div>
```

CSS equivalent:
```css
.glass-panel {
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
}
```

### ZZO-Style Skew

```jsx
<div className="transform -skew-x-6">
  <span className="block transform skew-x-6">
    Content
  </span>
</div>
```

### Animation Patterns

```js
// Framer Motion variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const glitch = {
  animate: {
    x: [-2, 2, -2],
    transition: { duration: 0.15, repeat: Infinity }
  }
}
```

## Responsive Layout Guidelines

### Mobile-First Breakpoints
- **Base**: 375px (iPhone SE)
- **Medium**: 768px (Tablets)
- **Large**: 1024px (Desktop - rare in TMA)

### Touch Targets
- Minimum: 44x44px (iOS HIG)
- Recommended: 48x48px (Material Design)
- Numpad keys: 64px height for comfort

### Safe Areas
```css
/* Avoid notch/home indicator */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

## Performance Optimization

### Framer Motion Best Practices
- Use `transform` and `opacity` for 60fps
- Avoid animating `width`, `height`, `top`, `left`
- Use `layoutId` for shared element transitions

### Three.js Optimization (Phase 2)
- Low-poly models (< 10k vertices)
- Texture atlases (combine textures)
- `useGLTF` with Suspense boundary

### Bundle Size
- Current: ~272KB JS (87KB gzipped)
- Target: < 500KB total for fast mobile load

## Debugging

### Telegram WebApp Debug Mode
```js
// Add to console
window.Telegram.WebApp.version
window.Telegram.WebApp.initData
```

### Haptic Feedback Testing (Desktop)
The `telegram.js` service gracefully degrades when Telegram API is unavailable. You can test the UI flow without haptics in a regular browser.

### CloudStorage Fallback
When testing locally, data is saved to `localStorage`. In production Telegram, it syncs to Telegram servers.

## Next Steps: Phase 2 - Hero Hub

### Planned Components
1. **HeroHub.jsx** - Main command center
2. **PlasmaBioReactor.jsx** - Daily steps tracker (top-left HUD)
3. **BiometricsPanel.jsx** - Stat bars (left-edge HUD)
4. **HeroGallery.jsx** - Swipeable hero cards (bottom)
5. **HeroModel3D.jsx** - Three.js character renderer

### 3D Setup
```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function HeroModel3D({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <primitive object={scene} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### Data Structure (Example)
```js
const hero = {
  id: 'zephyr-01',
  name: 'Zephyr-01',
  league: 'bronze', // bronze, chrome, gold, plasma, aivanced
  stats: {
    str: 42,
    agi: 67,
    int: 55,
    sta: 50
  },
  dailySteps: 5240,
  model: '/models/zephyr-01.glb'
}
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
Check that `postcss.config.js` and `tailwind.config.js` exist and `index.css` imports Tailwind directives.

### Framer Motion Laggy
Reduce motion complexity or use `transform` properties only. Enable GPU acceleration with `will-change: transform`.

## Contributing

When adding new components:
1. Follow the 3-layer composition rule
2. Use Tailwind utility classes (avoid inline styles)
3. Add haptic feedback for interactions
4. Test on both iOS and Android Telegram

## Resources

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
