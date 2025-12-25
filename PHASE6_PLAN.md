# Phase 6: Implementation Plan

## 🎯 Current Status
- ✅ Architecture designed (PHASE6.md)
- ✅ Data models created (syndicates.js)
- ⏳ Components implementation pending

---

## 📋 Part 1: Core Syndicate Components (Priority: HIGH)

### 1. SyndicateHub.jsx
**Purpose**: Main HQ screen for syndicate management

**Key Features**:
- Syndicate emblem display (large, glowing)
- Level and member count
- Grand Reactor visualization
- Member list (scrollable, ranked by contribution)
- Action buttons: [DONATE STEPS] [LEAVE] [CHAT]
- Glass panel design with atmospheric background

**State**:
```jsx
const [syndicate, setSyndicate] = useState(null)
const [showDonateModal, setShowDonateModal] = useState(false)
const [showChat, setShowChat] = useState(false)
```

**Estimated Lines**: ~400

---

### 2. GrandReactor.jsx
**Purpose**: Visual representation of shared step pool

**Key Features**:
- Hexagonal reactor core (SVG)
- Pulsing energy rings showing level progress
- Color transitions (Cyan → Purple → Yellow → Red)
- Particle effects (intensify near level-up)
- Progress bar with current/next level steps
- Level-up celebration animation

**Visual States**:
- 0-33%: Cyan `#00e5ff`
- 34-66%: Purple `#a855f7`
- 67-99%: Yellow `#facc15`
- 100%: Critical Red `#ff003c` (READY TO LEVEL UP!)

**Estimated Lines**: ~250

---

### 3. DonateStepsModal.jsx
**Purpose**: Step donation interface

**Key Features**:
- Input field for donation amount
- Min donation: 1,000 steps
- Show player's available steps
- Preview donation impact (progress %, potential level-up)
- Confirmation with haptic feedback
- Success animation

**Flow**:
1. User enters amount
2. Validate (min 1000, max = player steps)
3. Show impact preview
4. Confirm → Deduct from player → Add to reactor
5. Update member contribution
6. Check level-up trigger

**Estimated Lines**: ~200

---

### 4. MemberList.jsx
**Purpose**: Syndicate member roster

**Key Features**:
- Scrollable list (virtualized for 50 members)
- Member cards with:
  - Rank number
  - Name (colored by role: Gold=Leader, Cyan=Officer, Slate=Member)
  - Contribution (formatted: 145K, 1.2M)
  - Last active timestamp
  - Role badge
- Sort by contribution (descending)
- Highlight current player

**Estimated Lines**: ~150

---

### 5. SyndicateChat.jsx
**Purpose**: Tactical terminal for member communication

**Key Features**:
- Terminal-style message list (max 100 messages)
- Auto-scroll to latest
- Message types:
  - User messages (with colored name)
  - System messages (yellow, centered)
- Timestamp display (e.g., "2m ago", "1h ago")
- Input field + SEND button
- Real-time updates (mock with setTimeout for now)

**Message Format**:
```jsx
{
  id: 'msg-001',
  author: 'CyberQueen',
  authorId: 'player-001',
  type: 'user' | 'system',
  text: 'Message content',
  timestamp: Date.now()
}
```

**Estimated Lines**: ~300

---

## 📋 Part 2: Syndicate Discovery (Priority: MEDIUM)

### 6. SyndicateBrowser.jsx
**Purpose**: Browse and search available syndicates

**Key Features**:
- List of public syndicates
- Search by name/tag
- Filter by:
  - Public/Private
  - Level range
  - Member count
- Syndicate preview cards:
  - Emblem
  - Name + Tag
  - Level
  - Members (32/50)
  - Description
  - [JOIN] button
- Sort by: Ranking, Level, Members

**Estimated Lines**: ~350

---

### 7. SyndicateCreate.jsx
**Purpose**: Create new syndicate modal

**Key Features**:
- Cost: 50,000 AIV
- Name input (max 20 chars)
- Tag input (3-5 chars, uppercase)
- Emblem selector (12 options in grid)
- Color pickers (primary + secondary)
- Description textarea
- Preview panel (live update)
- Validation + error messages
- Create button with confirmation

**Estimated Lines**: ~400

---

## 📋 Part 3: Tournament System (Priority: HIGH)

### 8. TournamentLobby.jsx
**Purpose**: Tournament list and registration

**Key Features**:
- Active tournaments display:
  - Daily Invasion (16 players)
  - Weekly Invasion (64 players)
  - Syndicate Wars (Monthly)
- Tournament cards show:
  - Type + Duration
  - Entry fee (AIV or Neural Keys)
  - Rewards preview
  - Current participants
  - Time until start
  - [ENTER QUEUE] button
- Registration flow:
  - Check entry fee
  - Confirm entry
  - Add to queue
  - Show "Searching for opponents..."
  - Match found → Navigate to bracket

**Estimated Lines**: ~300

---

### 9. TournamentBracket.jsx
**Purpose**: Visual tournament bracket (LoL Worlds style)

**Key Features**:
- Round columns (Round 1, Quarters, Semis, Finals)
- Match cards with:
  - Player 1 name + score
  - VS separator
  - Player 2 name + score
  - Winner highlighted (gold glow)
- Connecting lines between rounds:
  - SVG paths with gradient
  - Pulsing animation for active matches
  - Particle trail for completed matches
- Auto-scroll to player's match
- Click match to view details

**Visual Design**:
```
[Round 1]    [Quarters]    [Semis]      [Finals]
┌──────┐
│ P1  2│─┐
│ P2  1│ │   ┌──────┐
└──────┘ └───│ P1  2│─┐
             │ P3  0│ │   ┌──────┐
┌──────┐ ┌───└──────┘ └───│ P1  3│─┐
│ P3  2│─┘                │ P5  1│ │
│ P4  0│                  └──────┘ │
└──────┘                            │
                                    │
                         ┌──────────┘
                         │
                    ┌────────┐
                    │ WINNER │
                    │   P1   │
                    └────────┘
```

**Estimated Lines**: ~500

---

### 10. WarRoom.jsx
**Purpose**: Sector control map for Syndicate Wars

**Key Features**:
- 4x3 grid (12 sectors)
- Sector cards show:
  - Sector ID (SEC1, SEC2, etc.)
  - Owner syndicate tag + colors
  - "FREE" if unclaimed
  - [CHALLENGE] button (if player's syndicate level 7+)
- Syndicate control stats:
  - Sectors controlled: X/12
  - Daily passive AIV: X * 10,000
  - Benefits unlocked
- Challenge flow:
  - Select sector
  - Confirm challenge (costs AIV)
  - Schedule battle (24h notice)
  - Best of 3 matches (3v3)

**Visual**: Grid with colored borders based on owner

**Estimated Lines**: ~350

---

## 📋 Part 4: Hall of Fame (Priority: LOW)

### 11. HallOfFame.jsx
**Purpose**: Golden Ghost gallery for tournament winners

**Key Features**:
- Grid of Golden Ghost holograms
- Each ghost shows:
  - 3D hero model (golden, semi-transparent)
  - Hologram platform (3 rings)
  - Player name (gold text)
  - Achievements list
- Click ghost → Show LegendaryCard
- Particle effects around ghosts
- Scanline overlay

**Estimated Lines**: ~300

---

### 12. LegendaryCard.jsx
**Purpose**: Detailed profile for Hall of Fame players

**Key Features**:
- Hero 3D display
- Player name with chromatic aberration
- Achievement list with icons
- Career stats:
  - Total battles
  - Win rate
  - Tournaments won
  - Peak LP
- Close button

**Estimated Lines**: ~250

---

## 📋 Part 5: Visual Effects & Utilities

### 13. Emergency Lockdown Mode
**Location**: HeroHub.jsx or App.jsx

**Implementation**:
```jsx
const triggerInvasionMode = () => {
  // HUD flicker
  setHudFlicker(true)
  setTimeout(() => setHudFlicker(false), 1000)

  // Red background
  setBackgroundMode('invasion')

  // Warning alert
  showAlert('[WARNING: INVASION_DETECTED]')

  // Haptic burst
  telegram.impactOccurred('heavy')
  setTimeout(() => telegram.impactOccurred('heavy'), 200)
  setTimeout(() => telegram.impactOccurred('heavy'), 400)

  // Red accents
  setAccentColor('#ff003c')
}
```

**CSS**:
```css
@keyframes hudFlicker {
  0%, 100% { opacity: 1; }
  10% { opacity: 0.3; }
  20% { opacity: 1; }
  30% { opacity: 0.5; }
  40% { opacity: 1; }
  50% { opacity: 0.2; }
  60% { opacity: 1; }
}
```

---

### 14. Emblem Components
**Location**: src/components/SyndicateEmblem.jsx

Create SVG components for 12 emblem types:
- BLADE, SHIELD, PHOENIX, SKULL, DRAGON, WOLF
- CROWN, LIGHTNING, STAR, HEXAGON, INFINITY, VORTEX

Each emblem:
- Accepts size prop
- Accepts color props (primary, secondary)
- Drop-shadow glow filter
- Animated on hover

**Estimated Lines**: ~400 (all emblems)

---

## 📋 Integration with HeroHub

**Add to HeroHub.jsx**:
```jsx
// State
const [showSyndicate, setShowSyndicate] = useState(false)
const [playerSyndicate, setPlayerSyndicate] = useState(null)

// Load player syndicate on mount
useEffect(() => {
  const syn = getPlayerSyndicate('current-player-id')
  setPlayerSyndicate(syn)
}, [])

// Syndicate button in Tactical Action Dock
<motion.button
  onClick={() => setShowSyndicate(true)}
  className="tactical-button"
>
  <Users className="text-plasma-purple" />
</motion.button>

// Conditional rendering
{showSyndicate && (
  <SyndicateHub
    syndicate={playerSyndicate}
    onClose={() => setShowSyndicate(false)}
    onDonate={handleDonateSteps}
  />
)}
```

---

## 📊 Summary

### Total Components: 14
### Estimated Total Lines: ~4,200
### Visual Quality: AAA-tier
### Performance: 60 FPS

### Priority Order:
1. **HIGH**: SyndicateHub, GrandReactor, DonateStepsModal, MemberList, SyndicateChat
2. **HIGH**: TournamentLobby, TournamentBracket, WarRoom
3. **MEDIUM**: SyndicateBrowser, SyndicateCreate
4. **LOW**: HallOfFame, LegendaryCard

### Next Session Tasks:
1. Create SyndicateHub.jsx
2. Create GrandReactor.jsx
3. Create DonateStepsModal.jsx
4. Create MemberList.jsx
5. Create SyndicateChat.jsx
6. Test integration with HeroHub
7. Create TournamentBracket.jsx
8. Create WarRoom.jsx

---

## 🎨 Design Tokens (Reference)

### Colors
- Cyan Neon: `#00e5ff`
- Plasma Purple: `#a855f7`
- Warning Yellow: `#facc15`
- Critical Red: `#ff003c`
- Obsidian: `#050505`
- Gold (Leader): `#ffd700`
- Slate (Member): `#94a3b8`

### Animations
- Reactor pulse: 2s ease-in-out infinite
- Level-up celebration: confetti particles + screen flash
- Chat scroll: smooth scroll-behavior
- Emblem glow: drop-shadow filter
- Bracket lines: pathLength animation 0.8s

### Haptics
- Join syndicate: heavy impact
- Donate steps: medium impact
- Level up: triple cascade (heavy → medium → light)
- Tournament start: rapid burst (3x heavy, 200ms apart)
- Victory: 6-pulse cascade

---

**Created**: 2025-12-26
**Status**: Planning Complete
**Ready for**: Implementation
