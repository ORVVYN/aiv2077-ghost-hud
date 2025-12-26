import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, TrendingUp, AlertCircle } from 'lucide-react'
import { calculateDonationImpact, formatContribution } from '../data/syndicates'
import telegram from '../utils/telegram'

/**
 * DonateStepsModal - Step Donation Interface
 * Phase 6: Neural Syndicates
 */
const DonateStepsModal = ({ syndicate, playerSteps, onConfirm, onClose }) => {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const MIN_DONATION = 1000
  const donationAmount = parseInt(amount) || 0

  // Calculate donation impact
  const impact = donationAmount > 0 ? calculateDonationImpact(syndicate, donationAmount) : null

  const handleAmountChange = (e) => {
    const value = e.target.value
    setAmount(value)
    setError('')

    const num = parseInt(value)
    if (isNaN(num)) {
      setError('Please enter a valid number')
    } else if (num < MIN_DONATION) {
      setError(`Minimum donation is ${MIN_DONATION.toLocaleString()} steps`)
    } else if (num > playerSteps) {
      setError('Insufficient steps')
    }
  }

  const handleMaxClick = () => {
    setAmount(playerSteps.toString())
    setError('')
    telegram.impactOccurred('light')
  }

  const handleConfirm = () => {
    if (error || donationAmount < MIN_DONATION || donationAmount > playerSteps) {
      telegram.notificationOccurred('error')
      return
    }

    telegram.impactOccurred('medium')
    onConfirm(donationAmount)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(5, 5, 5, 0.7)'
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal Panel */}
      <motion.div
        className="relative w-full max-w-md"
        style={{
          clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.4)',
          backdropFilter: 'blur(40px)',
          border: `1px solid ${syndicate.colors.primary}60`
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-critical-red" strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" style={{ color: syndicate.colors.primary }} />
            <h3 className="font-display text-2xl font-black uppercase tracking-tight" style={{ color: syndicate.colors.primary }}>
              DONATE STEPS
            </h3>
          </div>
          <p className="text-sm text-cyan-dim font-mono">
            Contribute to the Grand Reactor and level up your syndicate
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Available Steps */}
          <div
            className="p-4 rounded"
            style={{
              background: 'rgba(5, 5, 5, 0.5)',
              border: `1px solid ${syndicate.colors.primary}30`
            }}
          >
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-1">
              Your Available Steps
            </div>
            <div className="font-display text-2xl font-black" style={{ color: syndicate.colors.primary }}>
              {playerSteps.toLocaleString()}
            </div>
          </div>

          {/* Input Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider">
                Donation Amount
              </label>
              <motion.button
                className="font-mono text-xs uppercase tracking-wider px-2 py-1 rounded"
                style={{
                  background: `${syndicate.colors.primary}20`,
                  color: syndicate.colors.primary,
                  border: `1px solid ${syndicate.colors.primary}40`
                }}
                onClick={handleMaxClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MAX
              </motion.button>
            </div>

            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder={`Min. ${MIN_DONATION.toLocaleString()}`}
              className="w-full px-4 py-3 font-display text-xl font-bold text-cyan-neon bg-obsidian rounded outline-none"
              style={{
                border: error ? '1px solid #ff003c' : `1px solid ${syndicate.colors.primary}40`
              }}
              min={MIN_DONATION}
              max={playerSteps}
            />

            {/* Error Message */}
            {error && (
              <motion.div
                className="flex items-center gap-2 mt-2 text-xs text-critical-red font-mono"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </div>

          {/* Impact Preview */}
          {impact && !error && (
            <motion.div
              className="p-4 rounded space-y-3"
              style={{
                background: `linear-gradient(135deg, ${syndicate.colors.primary}10, transparent)`,
                border: `1px solid ${syndicate.colors.primary}40`
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-xs text-cyan-neon uppercase tracking-wider mb-2">
                Donation Impact:
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                    New Total Steps
                  </div>
                  <div className="font-display text-lg font-black" style={{ color: syndicate.colors.primary }}>
                    {formatContribution(impact.newTotal)}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
                    Syndicate Level
                  </div>
                  <div className="font-display text-lg font-black" style={{ color: syndicate.colors.secondary }}>
                    {syndicate.level} → {impact.newLevel}
                  </div>
                </div>
              </div>

              {impact.leveledUp && (
                <motion.div
                  className="p-3 rounded text-center"
                  style={{
                    background: `${syndicate.colors.secondary}20`,
                    border: `1px solid ${syndicate.colors.secondary}`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${syndicate.colors.secondary}40`,
                      `0 0 20px ${syndicate.colors.secondary}80`,
                      `0 0 10px ${syndicate.colors.secondary}40`
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="font-display font-black uppercase tracking-wider" style={{ color: syndicate.colors.secondary }}>
                    🎉 LEVEL UP! +{impact.levelsGained}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t flex gap-3" style={{ borderColor: `${syndicate.colors.primary}30` }}>
          <motion.button
            className="flex-1 py-3 font-mono text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${syndicate.colors.primary}40`,
              color: syndicate.colors.primary
            }}
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CANCEL
          </motion.button>

          <motion.button
            className="flex-1 py-3 font-display font-bold text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: error || donationAmount < MIN_DONATION
                ? 'rgba(100, 100, 100, 0.3)'
                : `linear-gradient(to right, ${syndicate.colors.primary}, ${syndicate.colors.secondary})`,
              color: error || donationAmount < MIN_DONATION ? '#666' : '#050505',
              cursor: error || donationAmount < MIN_DONATION ? 'not-allowed' : 'pointer'
            }}
            onClick={handleConfirm}
            disabled={error || donationAmount < MIN_DONATION}
            whileHover={!error && donationAmount >= MIN_DONATION ? { scale: 1.02 } : {}}
            whileTap={!error && donationAmount >= MIN_DONATION ? { scale: 0.98 } : {}}
          >
            CONFIRM DONATION
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DonateStepsModal
