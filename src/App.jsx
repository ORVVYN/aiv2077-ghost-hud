import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import NeuralSyncScreen from './components/NeuralSyncScreen';
import HeroHub from './components/HeroHub';
import telegram from './utils/telegram';

function App() {
  const [phase, setPhase] = useState('splash'); // splash -> neural-sync -> hero-hub
  const [gridId, setGridId] = useState(null);

  useEffect(() => {
    // Check if user already has a GRID_ID saved
    const checkExistingGridId = async () => {
      const savedGridId = await telegram.loadData('grid_id');
      if (savedGridId) {
        setGridId(savedGridId);
        // Skip to hero hub if already synced
        setPhase('hero-hub');
      }
    };

    checkExistingGridId();
  }, []);

  const handleSplashComplete = () => {
    setPhase('neural-sync');
  };

  const handleNeuralSyncComplete = (enteredGridId) => {
    setGridId(enteredGridId);
    setPhase('hero-hub');
  };

  return (
    <div className="w-full h-full">
      {phase === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {phase === 'neural-sync' && (
        <NeuralSyncScreen onComplete={handleNeuralSyncComplete} />
      )}

      {phase === 'hero-hub' && gridId && (
        <HeroHub gridId={gridId} />
      )}
    </div>
  );
}

export default App;
