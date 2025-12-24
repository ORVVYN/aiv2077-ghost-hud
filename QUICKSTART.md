# AIVANCED - Quick Start Guide

## 🚀 Get Running in 60 Seconds

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

**Your app is now running at**: `http://localhost:5173`

---

## 📱 Test in Telegram

### Option A: Use ngrok (Easiest)
```bash
# In a new terminal (keep dev server running):
npx ngrok http 5173
```

1. Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
2. Open [@BotFather](https://t.me/BotFather) in Telegram
3. Send `/myapps` or `/newapp`
4. Select your bot → "Web App"
5. Paste the ngrok URL
6. Open your bot and tap the Mini App button

**Done!** You can now test with real haptic feedback.

---

## 🛠️ Available Commands

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build (port 4173)
```

---

## 📂 Key Files to Know

```
src/
├── App.jsx                      # Phase orchestrator
├── components/
│   ├── SplashScreen.jsx         # Cinematic boot (3.5s)
│   └── NeuralSyncScreen.jsx     # GRID_ID input (6 digits)
└── utils/
    └── telegram.js              # Haptics & CloudStorage

tailwind.config.js               # Design tokens (colors, fonts)
```

---

## 🎨 Design System Quick Reference

### Colors
```jsx
className="text-cyan-neon"       // #00e5ff - Primary UI
className="text-warning-yellow"  // #facc15 - Alerts
className="text-critical-red"    // #ff003c - Errors
className="text-plasma-purple"   // #a855f7 - Special FX
className="bg-obsidian"          // #050505 - Background
```

### Components
```jsx
className="glass-panel"          // Glassmorphic container
className="skew-container"       // ZZO-style tilt
className="tactical-button"      // Skewed action button
className="neon-border"          // Glowing cyan border
```

### Animations
```jsx
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 🎮 Phase Flow

```
1. Splash Screen (3.5s)
   ↓
2. Neural Sync (user enters 6-digit GRID_ID)
   ↓
3. Hero Hub (Phase 2 - coming next)
```

---

## 🔧 Troubleshooting

### Dev server won't start?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Fonts not loading?
Check that Google Fonts script is in `index.html` (already added).

### Tailwind classes not working?
Ensure files are listed in `tailwind.config.js` content array (already configured).

### Build fails?
```bash
npm run build
# Check error message, usually missing dependencies
```

---

## 📖 Full Documentation

- **README.md** - Project overview
- **DEVELOPMENT.md** - Complete developer guide (400+ lines)
- **DEPLOY.md** - Deployment instructions (Vercel, Netlify, etc.)
- **FEATURES.md** - Feature showcase with animations explained
- **PROJECT_SUMMARY.md** - Phase 1 completion report
- **STRUCTURE.md** - File structure breakdown

---

## 🎯 Next: Deploy to Production

### Deploy to Vercel (Free, 2 minutes)
```bash
npm install -g vercel
npm run build
vercel --prod
```

Copy the URL and send to @BotFather.

**Full deployment guide**: See `DEPLOY.md`

---

## 📞 Need Help?

1. Check `DEVELOPMENT.md` for detailed explanations
2. Check `FEATURES.md` for component usage examples
3. Check browser console for errors (F12)
4. Check `npm run build` output for bundle issues

---

## ✅ Verification Checklist

Before deploying:
- [ ] `npm run dev` works
- [ ] No console errors
- [ ] Tested on mobile (375px width in DevTools)
- [ ] `npm run build` succeeds
- [ ] Tested in Telegram (iOS or Android)

---

## 🚀 Phase 1 Complete!

You now have:
- Cinematic splash screen with chromatic aberration ✅
- Neural sync screen with tactical numpad ✅
- Full Telegram integration (haptics, CloudStorage) ✅
- Premium AAA-tier UI/UX ✅
- Production-ready codebase ✅

**Ready to build Phase 2?** Check `DEVELOPMENT.md` → "Phase 2 Roadmap"

---

**Happy coding!** 🎮⚡
