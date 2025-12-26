/**
 * Emergency Lockdown Mode - HUD Flicker System
 * Phase 6: Neural Syndicates - Grid Invasions
 *
 * Triggers red alert mode when invasion is detected
 */

import telegram from './telegram'

/**
 * Trigger Emergency Lockdown Mode
 * @param {Function} setBackgroundMode - State setter for background color
 * @param {Function} setAccentColor - State setter for accent color
 * @param {Function} setHudFlicker - State setter for HUD flicker effect
 * @param {Function} showAlert - Function to display alert message
 */
export const triggerInvasionMode = (callbacks) => {
  const { setBackgroundMode, setAccentColor, setHudFlicker, showAlert } = callbacks

  // Step 1: HUD Flicker Effect
  setHudFlicker(true)
  setTimeout(() => setHudFlicker(false), 1000)

  // Step 2: Change background to red tint
  if (setBackgroundMode) {
    setBackgroundMode('invasion')
  }

  // Step 3: Warning Alert
  if (showAlert) {
    showAlert('[WARNING: INVASION_DETECTED]')
  }

  // Step 4: Haptic Burst Pattern (triple heavy impact)
  telegram.impactOccurred('heavy')
  setTimeout(() => telegram.impactOccurred('heavy'), 200)
  setTimeout(() => telegram.impactOccurred('heavy'), 400)

  // Step 5: Change accent color to critical red
  if (setAccentColor) {
    setAccentColor('#ff003c')
  }

  // Step 6: Audio alert (if sound enabled)
  playAlertSound()
}

/**
 * Exit Emergency Lockdown Mode
 */
export const exitInvasionMode = (callbacks) => {
  const { setBackgroundMode, setAccentColor } = callbacks

  if (setBackgroundMode) {
    setBackgroundMode('normal')
  }

  if (setAccentColor) {
    setAccentColor('#00e5ff')
  }

  telegram.notificationOccurred('success')
}

/**
 * Play alert sound (silent fallback)
 */
const playAlertSound = () => {
  // Create short beep sound
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 880 // A5 note
    oscillator.type = 'square'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  } catch (e) {
    // Silent fallback if audio not supported
    console.log('Audio alert not available')
  }
}

/**
 * Generate random invasion events (for demo/testing)
 */
export const simulateInvasionEvent = () => {
  return {
    id: `invasion-${Date.now()}`,
    type: 'daily_invasion',
    attackerSyndicate: {
      name: 'Shadow Collective',
      tag: 'SHDW',
      level: 8
    },
    targetSector: 'SEC-ALPHA',
    scheduledTime: Date.now() + 3600000, // 1 hour from now
    participants: 14,
    maxParticipants: 16
  }
}

export default {
  triggerInvasionMode,
  exitInvasionMode,
  simulateInvasionEvent
}
