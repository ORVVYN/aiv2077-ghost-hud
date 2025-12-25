# Phase 6: Neural Syndicates & Grid Invasions

## 🎯 Mission Briefing

Phase 6 implements the FINAL FRONTIER of the AIVANCED ecosystem: **NEURAL_SYNDICATES** (Clans) and **GRID_INVASIONS** (Tournaments). This creates the social and competitive infrastructure for long-term player engagement.

---

## 📋 Part 1: THE SYNDICATE HQ (Clan System)

### Concept

Players can create or join **Syndicates** (Clans) - elite tactical units operating in the AIVANCED grid. Syndicates compete for dominance through collective progress and tournament victories.

### Core Features

#### 1. Syndicate Creation/Join
- **Create Syndicate**:
  - Costs 50,000 AIV
  - Customizable name (max 20 characters)
  - Customizable tag (3-5 characters, e.g., [N1NJ], [APEX])
  - Emblem selection (12 tactical logos)
  - Color scheme (primary + secondary)
  - Max 50 members

- **Join Syndicate**:
  - Browse public syndicates
  - Search by name/tag
  - View stats before joining
  - Request to join (requires approval)
  - Free to join

#### 2. The Grand Reactor (Shared Step Pool)

**Mechanic**: Members donate steps to upgrade the Syndicate's level.

**Level System**:
```jsx
const syndicateLevels = [
  { level: 1, stepsRequired: 0,       benefits: 'Basic HQ Access' },
  { level: 2, stepsRequired: 100000,  benefits: '+5% AIV Bonus for all members' },
  { level: 3, stepsRequired: 300000,  benefits: '+10% AIV Bonus' },
  { level: 4, stepsRequired: 600000,  benefits: '+15% AIV Bonus + Chat Unlock' },
  { level: 5, stepsRequired: 1000000, benefits: '+20% AIV Bonus + Emblem Glow' },
  { level: 6, stepsRequired: 1500000, benefits: '+25% AIV Bonus + Priority Matchmaking' },
  { level: 7, stepsRequired: 2100000, benefits: '+30% AIV Bonus + Tournament Entry' },
  { level: 8, stepsRequired: 2800000, benefits: '+35% AIV Bonus + Exclusive Items' },
  { level: 9, stepsRequired: 3600000, benefits: '+40% AIV Bonus + Golden Name' },
  { level: 10, stepsRequired: 5000000, benefits: '+50% AIV Bonus + Hall of Fame + War Room Access' }
]
```

**Donation Flow**:
1. Member clicks "Donate Steps"
2. Enter amount (min 1,000 steps)
3. Confirmation modal
4. Steps deducted from personal balance
5. Added to Syndicate Grand Reactor
6. Member "Kinetic Contribution" updated
7. Check for level-up

**Grand Reactor Visual**:
- Massive hexagonal reactor core
- Pulsing energy rings (level progress)
- Glowing plasma streams
- Particle effects intensify near level-up
- Color changes based on progress:
  - 0-33%: Cyan
  - 34-66%: Purple
  - 67-99%: Yellow
  - 100%: Critical Red (ready to level up!)

#### 3. Syndicate HQ Screen

**Layout**:
```
┌─────────────────────────────────────┐
│  [SYNDICATE EMBLEM]   [APEX]        │
│  Level 5                            │
│  Members: 32/50                     │
│  ────────────────────────────────   │
│  GRAND REACTOR:                     │
│  [████████░░] 820,000 / 1,000,000   │
│  ────────────────────────────────   │
│  MEMBER LIST (scrollable):          │
│  ┌───────────────────────────────┐  │
│  │ 1. CyberQueen ▸ 145,000 steps │  │
│  │ 2. GridMaster ▸ 98,500 steps  │  │
│  │ 3. NeuralKing ▸ 76,200 steps  │  │
│  │ ... (29 more)                 │  │
│  └───────────────────────────────┘  │
│  ────────────────────────────────   │
│  [DONATE STEPS] [LEAVE] [CHAT]      │
└─────────────────────────────────────┘
```

**Visual Style**:
- **Deep atmospheric background**: Dark obsidian with subtle particle field
- **Emblem**: Centered at top, large (120px), glowing with syndicate colors
- **Glass panels**: blur(40px) with colored borders matching emblem
- **Member cards**: Skewed containers with rank badges
- **Kinetic Contribution**: Animated number counter (odometer style)

**Emblem Designs** (12 options):
1. **BLADE** - Crossed swords
2. **SHIELD** - Tactical shield
3. **PHOENIX** - Rising bird
4. **SKULL** - Tactical skull
5. **DRAGON** - Eastern dragon
6. **WOLF** - Wolf head
7. **CROWN** - Royal crown
8. **LIGHTNING** - Bolt symbol
9. **STAR** - 5-point star
10. **HEXAGON** - Geometric hex
11. **INFINITY** - Loop symbol
12. **VORTEX** - Spiral

#### 4. Syndicate Chat (Tactical Terminal)

**Features**:
- Real-time text chat (Telegram-style)
- Max 100 messages visible
- Auto-scroll to latest
- Timestamp display
- Member name colors (based on rank)
- System messages for events:
  - "CyberQueen donated 5,000 steps"
  - "APEX leveled up to Level 6!"
  - "Tournament starting in 10 minutes"

**Visual Design**:
```jsx
<div className="chat-terminal">
  {/* Header */}
  <div className="chat-header">
    <Terminal className="icon" />
    <span>SYNDICATE COMMS</span>
  </div>

  {/* Messages */}
  <div className="chat-messages">
    {messages.map(msg => (
      <div className={`message ${msg.type}`}>
        <span className="timestamp">{msg.time}</span>
        <span className="author" style={{ color: msg.authorColor }}>
          {msg.author}
        </span>
        <span className="text">{msg.text}</span>
      </div>
    ))}
  </div>

  {/* Input */}
  <div className="chat-input">
    <input placeholder="Type message..." />
    <button>SEND</button>
  </div>
</div>
```

---

## 📋 Part 2: GRID_INVASIONS (Tournament System)

### Concept

Daily and Weekly tournaments where Syndicates battle for sector control and prestige rewards.

### Tournament Types

#### Daily Invasion
- **Entry Fee**: 10,000 AIV or 1 Neural Key
- **Format**: Single Elimination, 16 players
- **Duration**: 2 hours
- **Rewards**:
  - 1st: 100,000 AIV + Rare Item + 200 LP
  - 2nd: 50,000 AIV + 100 LP
  - 3rd-4th: 25,000 AIV + 50 LP
  - 5th-8th: 10,000 AIV + 25 LP

#### Weekly Invasion
- **Entry Fee**: 50,000 AIV or 5 Neural Keys
- **Format**: Double Elimination, 64 players
- **Duration**: 7 days (matches scheduled)
- **Rewards**:
  - 1st: 500,000 AIV + Legendary Item + 1000 LP + Hall of Fame
  - 2nd: 250,000 AIV + Epic Item + 500 LP
  - 3rd-4th: 100,000 AIV + 250 LP
  - 5th-8th: 50,000 AIV + 125 LP

#### Syndicate Wars (Monthly)
- **Entry**: Syndicate-based (level 7+ required)
- **Format**: Best of 5, 3v3 team battles
- **Duration**: 1 month
- **Rewards**: Sector control + passive AIV generation

### Tournament Bracket UI

**Design Reference**: League of Legends Worlds bracket

**Visual Elements**:
```jsx
<div className="tournament-bracket">
  {/* Round columns */}
  <div className="round round-1">
    <h3>Round 1</h3>
    {/* 8 matches */}
    <Match player1="CyberQueen" player2="GridMaster" />
    <Match player1="NeuralKing" player2="PhoenixRise" />
    {/* ... */}
  </div>

  <div className="round round-2">
    <h3>Quarterfinals</h3>
    {/* 4 matches */}
    <Match player1="TBD" player2="TBD" />
    {/* ... */}
  </div>

  <div className="round round-3">
    <h3>Semifinals</h3>
    {/* 2 matches */}
  </div>

  <div className="round finals">
    <h3>Grand Final</h3>
    {/* 1 match */}
  </div>
</div>
```

**Match Card Design**:
```jsx
<div className="match-card">
  <div className={`player player-1 ${winner === 1 && 'winner'}`}>
    <span className="name">CyberQueen</span>
    <span className="score">2</span>
  </div>
  <div className="vs">VS</div>
  <div className={`player player-2 ${winner === 2 && 'winner'}`}>
    <span className="name">GridMaster</span>
    <span className="score">1</span>
  </div>

  {/* Connecting line to next round */}
  <svg className="connector">
    <path d="M 200 50 L 250 50 L 250 100 L 300 100" stroke="#00e5ff" />
  </svg>
</div>
```

**Bracket Animations**:
- **Pulsing Lines**: Winners advance with glowing cyan line
- **Particle Trail**: Energy flows from winner to next match
- **Screen Transition**: When bracket updates, scanline sweep effect
- **Victory Celebration**: Confetti for tournament winner

### The War Room (Sector Control Map)

**Concept**: AIVANCED Grid divided into 12 sectors. Syndicates fight to control sectors for passive rewards.

**Sector Map**:
```
┌──────┬──────┬──────┬──────┐
│ SEC1 │ SEC2 │ SEC3 │ SEC4 │
│ APEX │ N1NJ │ FREE │ WOLF │
├──────┼──────┼──────┼──────┤
│ SEC5 │ SEC6 │ SEC7 │ SEC8 │
│ FREE │ APEX │ FREE │ DRAG │
├──────┼──────┼──────┼──────┤
│ SEC9 │ SE10 │ SE11 │ SE12 │
│ WOLF │ FREE │ N1NJ │ APEX │
└──────┴──────┴──────┴──────┘
```

**Sector Benefits**:
- Each controlled sector: +10,000 AIV/day for syndicate
- 3 sectors: Unlock exclusive emblem variant
- 6 sectors: Unlock "Warlord" title
- 9 sectors: Unlock custom HUD theme
- 12 sectors (full control): Hall of Fame + "GRID MASTER" achievement

**Sector Battle**:
- Challenge issued by attacker syndicate
- Best of 3 matches (3v3 team battles)
- Scheduled 24 hours in advance
- Winner takes control of sector

**War Room UI**:
```jsx
<div className="war-room">
  {/* Header */}
  <h2 className="chromatic-text">WAR ROOM</h2>
  <p>SECTOR CONTROL INTERFACE</p>

  {/* Map Grid */}
  <div className="sector-grid">
    {sectors.map(sector => (
      <div
        className="sector"
        style={{
          borderColor: sector.owner ? syndicates[sector.owner].color : '#333',
          background: sector.owner
            ? `linear-gradient(135deg, ${syndicates[sector.owner].color}20, transparent)`
            : 'rgba(5, 5, 5, 0.5)'
        }}
      >
        <div className="sector-id">{sector.id}</div>
        <div className="sector-owner">
          {sector.owner || 'FREE'}
        </div>
        {canChallenge(sector) && (
          <button className="challenge-btn">
            CHALLENGE
          </button>
        )}
      </div>
    ))}
  </div>

  {/* Syndicate Stats */}
  <div className="syndicate-control">
    <h3>Your Syndicate: {playerSyndicate.name}</h3>
    <p>Sectors Controlled: {playerSyndicate.sectors}/12</p>
    <p>Daily Passive AIV: {playerSyndicate.sectors * 10000}</p>
  </div>
</div>
```

---

## 📋 Part 3: THE HALL OF FAME (Prestige Leaderboard)

### Concept

A special leaderboard showcasing Tournament Winners and legendary players.

### Features

#### Golden Ghost Holograms
Winners displayed as golden holographic projections:

```jsx
<div className="hall-of-fame">
  <h2>HALL OF FAME</h2>
  <p>Legends of the Grid</p>

  <div className="golden-ghosts">
    {famousPlayers.map((player, index) => (
      <motion.div
        className="golden-ghost"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        onClick={() => showLegendaryCard(player)}
      >
        {/* Hologram Platform */}
        <div className="hologram-platform">
          <div className="ring ring-outer" />
          <div className="ring ring-middle" />
          <div className="ring ring-inner" />
        </div>

        {/* 3D Hero Silhouette (Golden) */}
        <div className="hero-hologram">
          <HeroModel3D
            hero={player.hero}
            color="#ffd700"
            opacity={0.7}
          />
        </div>

        {/* Player Info */}
        <div className="player-info">
          <h3 className="golden-text">{player.name}</h3>
          <p>Tournament Victor</p>
          <p>{player.achievements.join(', ')}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>
```

#### Legendary Agent Card
Clicking a Golden Ghost shows detailed stats:

```jsx
<div className="legendary-card">
  <div className="card-header">
    <h2 className="chromatic-text">{player.name}</h2>
    <p className="subtitle">AIVANCED LEGEND</p>
  </div>

  <div className="card-body">
    <div className="hero-display">
      <HeroModel3D hero={player.hero} />
    </div>

    <div className="achievements">
      <h3>ACHIEVEMENTS</h3>
      <ul>
        {player.achievements.map(ach => (
          <li className="achievement">
            <Trophy className="icon" />
            <span>{ach}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="stats">
      <h3>CAREER STATS</h3>
      <div className="stat">
        <span>Total Battles:</span>
        <span>{player.totalBattles}</span>
      </div>
      <div className="stat">
        <span>Win Rate:</span>
        <span>{(player.winRate * 100).toFixed(1)}%</span>
      </div>
      <div className="stat">
        <span>Tournaments Won:</span>
        <span>{player.tournamentsWon}</span>
      </div>
      <div className="stat">
        <span>Peak LP:</span>
        <span>{player.peakLP}</span>
      </div>
    </div>
  </div>
</div>
```

---

## 📋 Part 4: VISUAL & KINETIC STYLE

### Emergency Lockdown Mode

When a tournament starts:

```jsx
// Trigger invasion mode
const triggerInvasionMode = () => {
  // 1. HUD flicker animation
  setHudFlicker(true)
  setTimeout(() => setHudFlicker(false), 1000)

  // 2. Change background to red grid
  setBackgroundMode('invasion') // Red tactical grid

  // 3. Display warning
  showAlert('[WARNING: INVASION_DETECTED]')

  // 4. Haptic pattern (rapid pulses)
  telegram.impactOccurred('heavy')
  setTimeout(() => telegram.impactOccurred('heavy'), 200)
  setTimeout(() => telegram.impactOccurred('heavy'), 400)

  // 5. Change HUD accent colors
  setAccentColor('#ff003c') // Critical Red
}
```

**HUD Flicker Effect**:
```css
@keyframes hudFlicker {
  0% { opacity: 1; }
  10% { opacity: 0.3; }
  20% { opacity: 1; }
  30% { opacity: 0.5; }
  40% { opacity: 1; }
  50% { opacity: 0.2; }
  60% { opacity: 1; }
}
```

### Bracket Animations

**Connecting Lines**:
```jsx
<svg className="bracket-connector">
  <defs>
    <linearGradient id="lineGlow">
      <stop offset="0%" stopColor="#00e5ff00" />
      <stop offset="50%" stopColor="#00e5ff" />
      <stop offset="100%" stopColor="#00e5ff00" />
    </linearGradient>
  </defs>

  <motion.path
    d="M 200 50 L 250 50 L 250 100 L 300 100"
    stroke="url(#lineGlow)"
    strokeWidth="3"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
  />

  {/* Particle traveling along path */}
  <motion.circle
    r="4"
    fill="#00e5ff"
    animate={{
      offsetDistance: ['0%', '100%']
    }}
    transition={{ duration: 1.5, repeat: Infinity }}
    style={{ offsetPath: 'path("M 200 50 L 250 50 L 250 100 L 300 100")' }}
  />
</svg>
```

### Victory Roar Haptics

```jsx
// Victory haptic pattern
const victoryHaptic = () => {
  // Initial impact
  telegram.impactOccurred('heavy')

  // Cascade of lighter impacts
  const delays = [100, 200, 300, 400, 500]
  delays.forEach(delay => {
    setTimeout(() => {
      telegram.impactOccurred('medium')
    }, delay)
  })

  // Final success notification
  setTimeout(() => {
    telegram.notificationOccurred('success')
  }, 700)
}
```

---

## 📂 Components to Create

### Phase 6A: Syndicates
1. `SyndicateHub.jsx` - Main syndicate HQ screen
2. `SyndicateCreate.jsx` - Create new syndicate modal
3. `SyndicateBrowser.jsx` - Browse/search syndicates
4. `SyndicateChat.jsx` - Tactical terminal chat
5. `GrandReactor.jsx` - Shared step pool visualization
6. `MemberList.jsx` - Syndicate member roster

### Phase 6B: Tournaments
7. `TournamentLobby.jsx` - Tournament list and entry
8. `TournamentBracket.jsx` - Bracket visualization
9. `WarRoom.jsx` - Sector control map
10. `SectorBattle.jsx` - Sector challenge interface

### Phase 6C: Hall of Fame
11. `HallOfFame.jsx` - Golden Ghost gallery
12. `LegendaryCard.jsx` - Detailed player profile

---

## 📊 Data Models

### syndicates.js
```jsx
export const syndicateTemplate = {
  id: 'syn-001',
  name: 'APEX Predators',
  tag: 'APEX',
  emblem: 'BLADE',
  colors: {
    primary: '#00e5ff',
    secondary: '#a855f7'
  },
  level: 5,
  grandReactor: {
    totalSteps: 820000,
    nextLevelSteps: 1000000
  },
  members: [
    {
      id: 'player-001',
      name: 'CyberQueen',
      role: 'leader', // leader | officer | member
      contribution: 145000,
      joinedDate: '2025-12-20'
    }
    // ... more members
  ],
  stats: {
    founded: '2025-12-15',
    totalMembers: 32,
    totalContribution: 820000,
    tournamentsWon: 3,
    sectorsControlled: 4
  },
  chat: {
    messages: [
      {
        id: 'msg-001',
        author: 'CyberQueen',
        text: 'Let's push for level 6!',
        timestamp: 1735123456789
      }
      // ... more messages
    ]
  }
}
```

---

**Status**: 🚧 In Progress
**Estimated Lines of Code**: ~3,500
**Visual Quality**: AAA-tier (ZZO/HSR/LoL inspired)
**Performance Target**: 60 FPS
