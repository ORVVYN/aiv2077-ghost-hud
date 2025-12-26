import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Shield, Check, AlertCircle } from 'lucide-react'
import { SYNDICATE_EMBLEMS } from '../data/syndicates'
import telegram from '../utils/telegram'

/**
 * SyndicateCreate - Create New Syndicate Modal
 * Phase 6: Neural Syndicates
 */
const SyndicateCreate = ({ playerAIV, onClose, onCreate }) => {
  const CREATION_COST = 50000

  const [step, setStep] = useState(1) // 1: Basic Info, 2: Customization, 3: Preview
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    emblem: SYNDICATE_EMBLEMS.SHIELD,
    primaryColor: '#00e5ff',
    secondaryColor: '#a855f7',
    description: '',
    publicJoin: true
  })
  const [errors, setErrors] = useState({})

  const availableEmblems = Object.values(SYNDICATE_EMBLEMS)
  const colorPresets = [
    { primary: '#00e5ff', secondary: '#a855f7', name: 'Cyber Blue' },
    { primary: '#ff003c', secondary: '#facc15', name: 'Combat Red' },
    { primary: '#a855f7', secondary: '#00e5ff', name: 'Plasma Purple' },
    { primary: '#facc15', secondary: '#ff003c', name: 'Warning Gold' },
    { primary: '#00ff88', secondary: '#00e5ff', name: 'Neon Green' }
  ]

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Syndicate name required'
    } else if (formData.name.length > 20) {
      newErrors.name = 'Max 20 characters'
    }

    if (!formData.tag.trim()) {
      newErrors.tag = 'Tag required'
    } else if (formData.tag.length < 3 || formData.tag.length > 5) {
      newErrors.tag = 'Tag must be 3-5 characters'
    } else if (!/^[A-Z0-9]+$/.test(formData.tag)) {
      newErrors.tag = 'Uppercase letters and numbers only'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (formData.description.length > 200) {
      newErrors.description = 'Max 200 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      telegram.impactOccurred('light')
    } else if (step === 2 && validateStep2()) {
      setStep(3)
      telegram.impactOccurred('medium')
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    telegram.impactOccurred('light')
  }

  const handleCreate = () => {
    if (playerAIV < CREATION_COST) {
      telegram.notificationOccurred('error')
      return
    }

    telegram.impactOccurred('heavy')
    onCreate(formData)
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(25px)',
          backgroundColor: 'rgba(5, 5, 5, 0.7)'
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Create Panel */}
      <motion.div
        className="relative w-full max-w-3xl flex flex-col"
        style={{
          clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',
          background: 'rgba(5, 5, 5, 0.3)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 229, 255, 0.6)',
          maxHeight: '90vh'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center z-10"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: 'rgba(5, 5, 5, 0.8)',
            border: '1px solid rgba(255, 0, 60, 0.4)'
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6 text-critical-red" strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-cyan-neon/30">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-neon" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-cyan-neon">
                CREATE SYNDICATE
              </h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-dim uppercase tracking-wider">
                Step {step}/3 • Cost: {CREATION_COST.toLocaleString()} AIV
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1 rounded-full"
                style={{
                  background: s <= step ? '#00e5ff' : 'rgba(0, 229, 255, 0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {step === 1 && (
            <Step1BasicInfo
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />
          )}

          {step === 2 && (
            <Step2Customization
              formData={formData}
              errors={errors}
              availableEmblems={availableEmblems}
              colorPresets={colorPresets}
              onChange={handleInputChange}
            />
          )}

          {step === 3 && (
            <Step3Preview
              formData={formData}
              creationCost={CREATION_COST}
              playerAIV={playerAIV}
            />
          )}
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-cyan-neon/30 flex gap-3">
          {step > 1 && (
            <motion.button
              className="flex-1 py-3 font-mono text-sm uppercase tracking-wider"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                background: 'rgba(5, 5, 5, 0.6)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                color: '#00e5ff'
              }}
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              BACK
            </motion.button>
          )}

          <motion.button
            className="flex-1 py-3 font-display font-bold text-sm uppercase tracking-wider"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              background: step === 3 && playerAIV < CREATION_COST
                ? 'rgba(100, 100, 100, 0.3)'
                : 'linear-gradient(to right, #00e5ff, #a855f7)',
              color: step === 3 && playerAIV < CREATION_COST ? '#666' : '#050505',
              cursor: step === 3 && playerAIV < CREATION_COST ? 'not-allowed' : 'pointer'
            }}
            onClick={step === 3 ? handleCreate : handleNext}
            disabled={step === 3 && playerAIV < CREATION_COST}
            whileHover={step !== 3 || playerAIV >= CREATION_COST ? { scale: 1.02 } : {}}
            whileTap={step !== 3 || playerAIV >= CREATION_COST ? { scale: 0.98 } : {}}
          >
            {step === 3 ? 'CREATE SYNDICATE' : 'NEXT'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Step 1: Basic Information
 */
const Step1BasicInfo = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2 block">
          Syndicate Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter syndicate name..."
          maxLength={20}
          className="w-full px-4 py-3 font-display text-xl font-bold text-cyan-neon bg-obsidian rounded outline-none"
          style={{
            border: errors.name ? '1px solid #ff003c' : '1px solid rgba(0, 229, 255, 0.4)'
          }}
        />
        <div className="flex justify-between mt-2">
          {errors.name ? (
            <div className="flex items-center gap-2 text-xs text-critical-red font-mono">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </div>
          ) : (
            <div />
          )}
          <div className="font-mono text-xs text-cyan-dim">
            {formData.name.length}/20
          </div>
        </div>
      </div>

      {/* Tag Input */}
      <div>
        <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2 block">
          Syndicate Tag * (3-5 characters, uppercase)
        </label>
        <input
          type="text"
          value={formData.tag}
          onChange={(e) => onChange('tag', e.target.value.toUpperCase())}
          placeholder="TAG"
          maxLength={5}
          className="w-full px-4 py-3 font-display text-xl font-bold text-cyan-neon bg-obsidian rounded outline-none uppercase"
          style={{
            border: errors.tag ? '1px solid #ff003c' : '1px solid rgba(0, 229, 255, 0.4)'
          }}
        />
        <div className="flex justify-between mt-2">
          {errors.tag ? (
            <div className="flex items-center gap-2 text-xs text-critical-red font-mono">
              <AlertCircle className="w-4 h-4" />
              {errors.tag}
            </div>
          ) : (
            <div className="text-xs text-cyan-dim font-mono">
              Letters and numbers only
            </div>
          )}
          <div className="font-mono text-xs text-cyan-dim">
            {formData.tag.length}/5
          </div>
        </div>
      </div>

      {/* Public Join Toggle */}
      <div
        className="p-4 rounded flex items-center justify-between"
        style={{
          background: 'rgba(5, 5, 5, 0.6)',
          border: '1px solid rgba(0, 229, 255, 0.3)'
        }}
      >
        <div>
          <div className="font-mono text-sm text-cyan-neon uppercase tracking-wider mb-1">
            Public Syndicate
          </div>
          <div className="font-mono text-xs text-cyan-dim">
            Anyone can join without approval
          </div>
        </div>
        <motion.button
          className="relative w-16 h-8 rounded-full"
          style={{
            background: formData.publicJoin ? '#00e5ff' : 'rgba(100, 100, 100, 0.3)',
            border: formData.publicJoin ? '1px solid #00e5ff' : '1px solid rgba(100, 100, 100, 0.5)'
          }}
          onClick={() => onChange('publicJoin', !formData.publicJoin)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute w-6 h-6 rounded-full bg-obsidian top-1"
            animate={{
              left: formData.publicJoin ? '36px' : '4px'
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
    </div>
  )
}

/**
 * Step 2: Customization
 */
const Step2Customization = ({ formData, errors, availableEmblems, colorPresets, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Emblem Selection */}
      <div>
        <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-3 block">
          Select Emblem
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {availableEmblems.map((emblem) => (
            <motion.button
              key={emblem}
              className="aspect-square rounded flex items-center justify-center"
              style={{
                background: formData.emblem === emblem
                  ? `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}20)`
                  : 'rgba(5, 5, 5, 0.6)',
                border: formData.emblem === emblem
                  ? `2px solid ${formData.primaryColor}`
                  : '1px solid rgba(0, 229, 255, 0.3)'
              }}
              onClick={() => onChange('emblem', emblem)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield
                className="w-8 h-8"
                style={{ color: formData.emblem === emblem ? formData.primaryColor : '#00e5ff' }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-3 block">
          Color Scheme
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {colorPresets.map((preset) => (
            <motion.button
              key={preset.name}
              className="p-3 rounded"
              style={{
                background: formData.primaryColor === preset.primary && formData.secondaryColor === preset.secondary
                  ? `linear-gradient(135deg, ${preset.primary}20, ${preset.secondary}20)`
                  : 'rgba(5, 5, 5, 0.6)',
                border: formData.primaryColor === preset.primary && formData.secondaryColor === preset.secondary
                  ? `2px solid ${preset.primary}`
                  : '1px solid rgba(0, 229, 255, 0.3)'
              }}
              onClick={() => {
                onChange('primaryColor', preset.primary)
                onChange('secondaryColor', preset.secondary)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-1 mb-2">
                <div className="flex-1 h-6 rounded" style={{ background: preset.primary }} />
                <div className="flex-1 h-6 rounded" style={{ background: preset.secondary }} />
              </div>
              <div className="font-mono text-xs text-cyan-dim">
                {preset.name}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-2 block">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter syndicate description..."
          maxLength={200}
          rows={4}
          className="w-full px-4 py-3 font-mono text-sm text-cyan-neon bg-obsidian rounded outline-none resize-none"
          style={{
            border: errors.description ? '1px solid #ff003c' : '1px solid rgba(0, 229, 255, 0.4)'
          }}
        />
        <div className="flex justify-between mt-2">
          {errors.description ? (
            <div className="flex items-center gap-2 text-xs text-critical-red font-mono">
              <AlertCircle className="w-4 h-4" />
              {errors.description}
            </div>
          ) : (
            <div />
          )}
          <div className="font-mono text-xs text-cyan-dim">
            {formData.description.length}/200
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Step 3: Preview & Confirm
 */
const Step3Preview = ({ formData, creationCost, playerAIV }) => {
  const canAfford = playerAIV >= creationCost

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <div
        className="p-6 rounded"
        style={{
          background: `linear-gradient(135deg, ${formData.primaryColor}10, transparent)`,
          border: `2px solid ${formData.primaryColor}60`
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          {/* Emblem */}
          <motion.div
            className="flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}20)`,
              border: `2px solid ${formData.primaryColor}`,
              boxShadow: `0 0 20px ${formData.primaryColor}60`
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${formData.primaryColor}60`,
                `0 0 30px ${formData.primaryColor}80`,
                `0 0 20px ${formData.primaryColor}60`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-12 h-12" style={{ color: formData.primaryColor }} />
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight truncate mb-1"
              style={{ color: formData.primaryColor }}
            >
              {formData.name || 'Syndicate Name'}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                style={{
                  background: `${formData.secondaryColor}30`,
                  color: formData.secondaryColor,
                  border: `1px solid ${formData.secondaryColor}60`
                }}
              >
                [{formData.tag || 'TAG'}]
              </span>
            </div>
            <p className="text-sm text-cyan-dim font-mono">
              {formData.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-3">
          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${formData.primaryColor}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Level
            </div>
            <div className="font-display text-xl font-black" style={{ color: formData.primaryColor }}>
              1
            </div>
          </div>

          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${formData.primaryColor}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Members
            </div>
            <div className="font-display text-xl font-black text-cyan-neon">
              1/50
            </div>
          </div>

          <div
            className="p-3 rounded text-center"
            style={{
              background: 'rgba(5, 5, 5, 0.6)',
              border: `1px solid ${formData.primaryColor}40`
            }}
          >
            <div className="font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="font-display text-xl font-black" style={{ color: formData.secondaryColor }}>
              {formData.publicJoin ? 'PUBLIC' : 'PRIVATE'}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Info */}
      <div
        className="p-4 rounded"
        style={{
          background: canAfford ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 0, 60, 0.1)',
          border: canAfford ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid rgba(255, 0, 60, 0.4)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-1">
              Creation Cost
            </div>
            <div className="font-display text-2xl font-black text-warning-yellow">
              {creationCost.toLocaleString()} AIV
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-1">
              Your Balance
            </div>
            <div
              className="font-display text-2xl font-black"
              style={{ color: canAfford ? '#00e5ff' : '#ff003c' }}
            >
              {playerAIV.toLocaleString()} AIV
            </div>
          </div>
        </div>

        {!canAfford && (
          <div className="flex items-center gap-2 mt-3 text-xs text-critical-red font-mono">
            <AlertCircle className="w-4 h-4" />
            Insufficient AIV balance
          </div>
        )}
      </div>
    </div>
  )
}

export default SyndicateCreate
