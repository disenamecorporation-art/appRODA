import React from 'react';

interface StatusBarProps {
  dark?: boolean;
  time?: string;
}

export const StatusBar: React.FC<StatusBarProps> = () => {
  // Removed simulated device status bar (time, wifi, cellular, battery)
  // as mobile devices already have their own native OS status bar.
  return null;
};


