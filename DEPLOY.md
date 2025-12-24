# AIVANCED Deployment Guide

## Quick Deploy (Vercel - Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Build & Deploy
```bash
npm run build
vercel --prod
```

### Step 3: Configure Telegram Bot
1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/newapp` or `/myapps`
3. Select your bot
4. Choose "Web App"
5. Paste your Vercel URL: `https://your-app.vercel.app`

**Done!** Your Mini App is live.

---

## Alternative: Netlify

### Step 1: Build
```bash
npm run build
```

### Step 2: Deploy
Visit [Netlify Drop](https://app.netlify.com/drop) and drag the `dist/` folder.

### Step 3: Custom Domain (Optional)
```bash
# In Netlify dashboard:
Site Settings → Domain Management → Add Custom Domain
```

---

## Alternative: GitHub Pages

### Step 1: Update vite.config.js
```js
export default defineConfig({
  base: '/aiv2077/', // Your repo name
  // ... rest of config
})
```

### Step 2: Build & Deploy
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Step 3: Enable GitHub Pages
Repository Settings → Pages → Source: `gh-pages` branch

**URL**: `https://username.github.io/aiv2077/`

---

## Testing Locally with Telegram

### Method 1: ngrok (Free)

#### Step 1: Install ngrok
```bash
npm install -g ngrok
```

#### Step 2: Start Dev Server
```bash
npm run dev
```

#### Step 3: Create Tunnel
```bash
ngrok http 5173
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)

#### Step 4: Configure Bot
Send URL to @BotFather as your Web App link.

**Pros**: Instant updates, full HMR
**Cons**: URL changes on restart (free tier)

### Method 2: LocalTunnel (Alternative)

```bash
npm install -g localtunnel
npm run dev

# In another terminal:
lt --port 5173 --subdomain aivanced
```

**URL**: `https://aivanced.loca.lt`

---

## Environment Variables

### Create `.env` file (Optional)
```bash
# Telegram Bot Token (for backend API)
VITE_BOT_TOKEN=your_bot_token_here

# API Endpoint (Phase 3+)
VITE_API_URL=https://api.aivanced.com
```

### Access in Code
```js
const botToken = import.meta.env.VITE_BOT_TOKEN
```

**Important**: Never commit `.env` to Git (already in `.gitignore`)

---

## Production Checklist

### Before Deploying
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in dev mode
- [ ] Tested on real Telegram client (iOS/Android)
- [ ] Haptic feedback works correctly
- [ ] CloudStorage saves GRID_ID
- [ ] All fonts load (check Network tab)
- [ ] Images/assets load correctly
- [ ] Mobile responsive (test 375px width)

### Performance Audit
```bash
npm run build
npx serve dist

# In Chrome DevTools:
Lighthouse → Generate Report → Performance
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: N/A (TMA doesn't need SEO)

### Bundle Size Check
```bash
npm run build

# Check output:
dist/assets/index-*.js → Target: < 500KB
```

If too large:
- Enable code splitting
- Lazy load Three.js (Phase 2)
- Use dynamic imports for routes

---

## CI/CD Setup (GitHub Actions)

### Create `.github/workflows/deploy.yml`
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

**Auto-deploys on every push to `main`!**

---

## Custom Domain Setup

### Vercel
```bash
vercel domains add aivanced.app
```

Follow DNS instructions (add CNAME record).

### Cloudflare (Recommended for CDN)
1. Add site to Cloudflare
2. Point DNS to Vercel
3. Enable "Always Use HTTPS"
4. Enable "Auto Minify" (CSS, JS)
5. Set caching rules

---

## Telegram Bot Configuration

### Full BotFather Setup

#### 1. Create Bot (if not exists)
```
/newbot
> Name: AIVANCED Bot
> Username: aivanced_bot
```

#### 2. Set Commands
```
/setcommands
> start - Launch AI Battles
> help - Get support
> stats - View your stats
```

#### 3. Set Description
```
/setdescription
> Battle AI agents in a cyberpunk arena!
> Earn rewards, climb leagues, dominate the grid.
```

#### 4. Set About Text
```
/setabouttext
> Premium AI Battle Arena
> Powered by Neural Combat Protocol
```

#### 5. Set Web App
```
/newapp
> Select your bot
> Web App URL: https://your-vercel-url.vercel.app
> Short Name: aivanced
```

#### 6. Set Bot Picture
Upload a 512x512 PNG logo with transparent background.

---

## Monitoring & Analytics

### Add Analytics (Optional)

#### Vercel Analytics
```bash
npm install @vercel/analytics
```

```jsx
// In src/main.jsx
import { Analytics } from '@vercel/analytics/react'

<App />
<Analytics />
```

#### Custom Event Tracking
```js
// Track phase transitions
telegram.sendData(JSON.stringify({
  event: 'phase_complete',
  phase: 'neural_sync',
  grid_id: gridId
}))
```

### Error Tracking

#### Sentry (Recommended)
```bash
npm install @sentry/react
```

```jsx
// In src/main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your_sentry_dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})
```

---

## Debugging Production Issues

### Enable Telegram DevTools
```js
// Add to src/utils/telegram.js
if (import.meta.env.DEV) {
  window.TelegramWebApp = telegram.webApp
  console.log('Telegram WebApp:', telegram.webApp)
}
```

### Check Telegram Logs
Desktop Telegram → Settings → Advanced → Debug Mode
View console logs for Mini App errors.

### Common Issues

#### Haptic Feedback Not Working
- **Cause**: Not in Telegram client
- **Fix**: Deploy and test in real Telegram app

#### CloudStorage Not Saving
- **Cause**: TMA not initialized
- **Fix**: Ensure `telegram.js` calls `webApp.ready()`

#### Fonts Not Loading
- **Cause**: CORS or network error
- **Fix**: Use `preconnect` in `index.html` (already added)

#### White Screen
- **Cause**: JavaScript error
- **Fix**: Check browser console, enable Sentry

---

## Rollback Strategy

### Vercel
```bash
vercel rollback
```

### GitHub Pages
```bash
git revert HEAD
git push origin gh-pages
```

### Netlify
Dashboard → Deploys → Click "Publish" on previous deploy

---

## Update Workflow

### For Minor UI Tweaks
```bash
# Make changes
npm run dev      # Test locally
npm run build    # Build
vercel --prod    # Deploy
```

### For Major Features (Phase 2+)
```bash
git checkout -b feature/hero-hub
# Implement feature
npm run build && npm run preview  # Test production build
git commit -m "Add Hero Hub (Phase 2)"
git push origin feature/hero-hub
# Open PR, review, merge to main
# Auto-deploys via CI/CD
```

---

## Security Best Practices

### 1. Validate Telegram Data
```js
// Backend API (Node.js example)
const crypto = require('crypto')

function validateTelegramWebAppData(initData) {
  const urlParams = new URLSearchParams(initData)
  const hash = urlParams.get('hash')
  urlParams.delete('hash')

  const dataCheckString = Array.from(urlParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest()

  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  return calculatedHash === hash
}
```

### 2. Use HTTPS Only
All TMA URLs must use HTTPS. Vercel/Netlify provide this automatically.

### 3. Sanitize User Input
```js
// Sanitize GRID_ID before saving
const sanitized = gridId.replace(/[^0-9]/g, '').slice(0, 6)
```

---

## Cost Estimate

### Vercel (Recommended)
- **Hobby Plan**: FREE
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS

### Netlify
- **Starter Plan**: FREE
  - 100GB bandwidth/month
  - 300 build minutes/month

### GitHub Pages
- **FREE** (public repos)
- Unlimited bandwidth (fair use)

### Expected Traffic (Phase 1)
- Bundle size: ~270KB
- 1,000 users/day = ~270MB/day = 8GB/month
- **Well within free tier limits**

---

## Support & Community

### Report Issues
GitHub Issues: `https://github.com/yourusername/aiv2077/issues`

### Documentation
- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Docs](https://vercel.com/docs)

### Contact
Telegram: @yourusername

---

**Ready to deploy?** Run `npm run build && vercel --prod` 🚀
