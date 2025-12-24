import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import telegram from '../utils/telegram';

const NeuralSyncScreen = ({ onComplete }) => {
  const [gridId, setGridId] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);

  const maxLength = 6;

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Handle numpad press
  const handleKeyPress = (key) => {
    telegram.gridKeyPress();
    setError('');

    if (key === 'backspace') {
      setGridId(prev => prev.slice(0, -1));
    } else if (key === 'clear') {
      setGridId('');
    } else if (gridId.length < maxLength) {
      setGridId(prev => prev + key);
    }
  };

  // Handle sync/validation
  const handleSync = async () => {
    if (gridId.length !== maxLength) {
      setError('GRID_ID MUST BE 6 DIGITS');
      telegram.notificationOccurred('error');
      return;
    }

    setIsValidating(true);
    telegram.neuralSync();

    // Simulate validation (replace with actual API call)
    setTimeout(() => {
      // For demo, accept any 6-digit code
      const isValid = /^\d{6}$/.test(gridId);

      if (isValid) {
        telegram.notificationOccurred('success');
        // Save the GRID_ID
        telegram.saveData('grid_id', gridId);
        setTimeout(() => onComplete(gridId), 500);
      } else {
        setError('INVALID GRID_ID FORMAT');
        telegram.notificationOccurred('error');
        setIsValidating(false);
      }
    }, 1500);
  };

  const numpadKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['clear', '0', 'backspace'],
  ];

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-obsidian overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Header */}
      <motion.div
        className="relative pt-8 px-6 pb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="glass-panel p-4">
          <div className="font-mono text-xs text-cyan-dim uppercase tracking-wider mb-1">
            {'>'} NEURAL LINK PROTOCOL
          </div>
          <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            ENTER GRID_ID
          </h2>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Display Area */}
        <motion.div
          className="w-full max-w-md mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* ID Display */}
          <div className="glass-panel p-6 mb-4">
            <div className="font-mono text-xs text-cyan-dim mb-3 uppercase tracking-wider">
              BRIDGE CODE
            </div>
            <div className="relative h-16 flex items-center justify-center">
              <div className="flex gap-3">
                {[...Array(maxLength)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative w-10 h-14 glass-panel flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    {gridId[i] ? (
                      <motion.span
                        className="font-display text-3xl font-bold text-cyan-neon text-glow"
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        {gridId[i]}
                      </motion.span>
                    ) : i === gridId.length ? (
                      <motion.div
                        className="w-0.5 h-8 bg-cyan-neon"
                        animate={{ opacity: cursorBlink ? 1 : 0.2 }}
                        transition={{ duration: 0 }}
                      />
                    ) : (
                      <div className="text-cyan-dim/20 font-mono text-2xl">_</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-4 p-3 bg-critical-red/10 border border-critical-red/50 backdrop-blur-tactical"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-critical-red rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-critical-red uppercase tracking-wider">
                    {error}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-cyan-dim/50">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isValidating ? 'bg-warning-yellow animate-pulse' : 'bg-cyan-neon'}`} />
              <span>{isValidating ? 'VALIDATING...' : 'AWAITING INPUT'}</span>
            </div>
            <span>{gridId.length}/{maxLength}</span>
          </div>
        </motion.div>

        {/* Tactical Numpad */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-3">
            {numpadKeys.flat().map((key, index) => {
              const isSpecial = key === 'clear' || key === 'backspace';
              const isDisabled = isValidating;

              return (
                <motion.button
                  key={key}
                  className={`
                    relative h-16 font-display font-bold text-lg uppercase tracking-wider
                    transform -skew-x-6 transition-all duration-150
                    ${isSpecial
                      ? 'bg-gradient-to-br from-plasma-purple/30 to-plasma-magenta/30 border border-plasma-purple/50 text-plasma-purple'
                      : 'bg-gradient-to-br from-cyan-dim/30 to-cyan-neon/30 border border-cyan-neon/50 text-cyan-neon'
                    }
                    ${!isDisabled && 'active:scale-95 hover:shadow-neon-cyan'}
                    ${isDisabled && 'opacity-30 cursor-not-allowed'}
                    backdrop-blur-tactical
                  `}
                  onClick={() => !isDisabled && handleKeyPress(key)}
                  disabled={isDisabled}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.03 }}
                >
                  <span className="block transform skew-x-6">
                    {key === 'backspace' ? '←' : key === 'clear' ? 'CLR' : key}
                  </span>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-neon/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -skew-x-6" />
                </motion.button>
              );
            })}
          </div>

          {/* Sync Button */}
          <motion.button
            className={`
              w-full mt-6 h-14 font-display font-black text-xl uppercase tracking-wider
              transform -skew-x-6 transition-all duration-200
              ${gridId.length === maxLength && !isValidating
                ? 'bg-gradient-to-r from-cyan-dim to-cyan-neon text-obsidian shadow-neon-cyan'
                : 'bg-obsidian-700/50 text-cyan-dim/30 border border-cyan-dim/20 cursor-not-allowed'
              }
              ${gridId.length === maxLength && !isValidating && 'active:scale-95'}
              backdrop-blur-tactical
            `}
            onClick={handleSync}
            disabled={gridId.length !== maxLength || isValidating}
            whileTap={gridId.length === maxLength && !isValidating ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <span className="block transform skew-x-6 flex items-center justify-center gap-2">
              {isValidating ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  SYNCING...
                </>
              ) : (
                'INITIATE SYNC'
              )}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Info */}
      <motion.div
        className="px-6 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="glass-panel p-3">
          <div className="font-mono text-xs text-cyan-dim/70 text-center">
            NEURAL SYNC ESTABLISHES SECURE BRIDGE TO AI COMBAT NETWORK
          </div>
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-cyan-neon/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-cyan-neon/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-cyan-neon/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-cyan-neon/30" />
    </motion.div>
  );
};

export default NeuralSyncScreen;
