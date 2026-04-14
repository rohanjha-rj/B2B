// Reliable haptic sounds using Web Audio API for premium UI interaction
export const playHaptic = () => {
  const isSoundEnabled = localStorage.getItem('khaptic') !== 'false';
  if (!isSoundEnabled) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Quick "pop" sound parameters
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05); 
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  } catch(e) {}
};
