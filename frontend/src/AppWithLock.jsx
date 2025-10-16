import React, { useState, useEffect } from 'react';
import App from './App';
import AppLockScreen from './components/AppLockScreen';

function AppWithLock() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Always lock on app load
    setUnlocked(false);
  }, []);

  return (
    <>
      {!unlocked && <AppLockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && <App />}
    </>
  );
}

export default AppWithLock;
