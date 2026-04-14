// Subtle haptic sounds for premium UI interaction
const clickSound = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT19vT=");

export const playHaptic = () => {
  const isSoundEnabled = localStorage.getItem('khaptic') !== 'false';
  if (isSoundEnabled) {
    const sound = clickSound.cloneNode();
    sound.volume = 0.05;
    sound.play().catch(() => {}); // Browser might block auto-play
  }
};
