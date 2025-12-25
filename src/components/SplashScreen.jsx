import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import telegram from '../utils/telegram';

const SplashScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('boot'); // boot -> logo -> fade
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // System boot haptic
    telegram.systemBoot();

    // Boot sequence timeline
    const timeline = [
      { delay: 500, action: () => setGlitchActive(true) },
      { delay: 800, action: () => setGlitchActive(false) },
      { delay: 1200, action: () => setStage('logo') },
      { delay: 1500, action: () => setGlitchActive(true) },
      { delay: 1700, action: () => setGlitchActive(false) },
      { delay: 3000, action: () => setStage('fade') },
      { delay: 3500, action: () => onComplete() },
    ];

    const timers = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'fade' && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Grid Background */}
          <motion.div
            className="absolute inset-0 grid-background opacity-30"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Scanline Effect */}
          <div className="absolute inset-0 scanline pointer-events-none" />

          {/* Neural Link Boot Text */}
          <AnimatePresence>
            {stage === 'boot' && (
              <motion.div
                className="absolute top-1/4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-mono text-cyan-dim text-xs uppercase tracking-widest mb-2">
                  {'>'} INITIALIZING NEURAL LINK...
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-cyan-neon rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-cyan-neon rounded-full animate-pulse delay-75" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1 h-1 bg-cyan-neon rounded-full animate-pulse delay-150" style={{ animationDelay: '0.3s' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Logo with Chromatic Aberration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: stage === 'logo' ? 1 : 0.5,
              scale: stage === 'logo' ? 1 : 0.8,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Chromatic Aberration Effect */}
            <div className="relative inline-block">
              {/* Red Channel */}
              <motion.div
                className="absolute inset-0 text-critical-red opacity-70 blur-[1px]"
                animate={glitchActive ? {
                  x: [-3, 3, -3],
                  y: [0, 0, 0],
                } : { x: 0, y: 0 }}
                transition={{ duration: 0.15, repeat: glitchActive ? Infinity : 0 }}
              >
                <h1 className="font-display text-7xl font-black uppercase tracking-tighter">
                  AIVANCED
                </h1>
              </motion.div>

              {/* Blue Channel */}
              <motion.div
                className="absolute inset-0 text-cyan-neon opacity-70 blur-[1px]"
                animate={glitchActive ? {
                  x: [3, -3, 3],
                  y: [0, 0, 0],
                } : { x: 0, y: 0 }}
                transition={{ duration: 0.15, repeat: glitchActive ? Infinity : 0 }}
              >
                <h1 className="font-display text-7xl font-black uppercase tracking-tighter">
                  AIVANCED
                </h1>
              </motion.div>

              {/* Main Channel */}
              <h1 className="relative font-display text-7xl font-black uppercase tracking-tighter text-white">
                AIVANCED
              </h1>
            </div>

            {/* Subtitle with glow */}
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'logo' ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="font-tactical text-cyan-neon text-xl tracking-[0.3em] uppercase text-glow">
                AI BATTLES
              </div>
              <div className="font-mono text-cyan-dim text-xs mt-2 tracking-wider">
                v1.0.0 // NEURAL COMBAT PROTOCOL
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Status Bar */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse" />
                  <span className="text-cyan-dim">SYSTEM READY</span>
                </div>
                <div className="text-cyan-dim/50">
                  GRID_ID: PENDING
                </div>
              </div>
            </div>
          </motion.div>

          {/* Corner Decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-cyan-neon/30" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-cyan-neon/30" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-cyan-neon/30" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-cyan-neon/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
