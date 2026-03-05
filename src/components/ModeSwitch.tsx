import React from 'react';

export type Mode = 'original' | 'simplified' | 'translated';

interface ModeSwitchProps {
  currentMode: Mode;
  onChange: (mode: Mode) => void;
  isLoading?: boolean;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ currentMode, onChange, isLoading }) => {
  const modes: { id: Mode; label: string }[] = [
    { id: 'original', label: 'Originale' },
    { id: 'simplified', label: 'Semplificato' },
    { id: 'translated', label: 'Traduzione' },
  ];

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto my-8">
      <div className="relative w-full bg-stone-100 dark:bg-stone-900/50 p-1.5 rounded-2xl border border-stone-200/50 dark:border-stone-800/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] flex">
        {/* Animated Background Slider */}
        <div 
          className="absolute top-1.5 bottom-1.5 transition-all duration-300 ease-out bg-white dark:bg-stone-800 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-stone-200/50 dark:border-stone-700/50"
          style={{
            width: `calc(100% / 3 - 8px)`,
            left: `calc(${modes.findIndex(m => m.id === currentMode)} * (100% / 3) + 4px)`,
          }}
        />

        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`relative flex-1 py-3 text-sm font-bold tracking-tight transition-all duration-500 z-10 rounded-xl ${
              currentMode === mode.id
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-stone-400 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-500'
            }`}
          >
            <span 
              className="transition-all duration-500"
              style={currentMode !== mode.id ? {
                // "Embossed" / "Pressed in" look for inactive states
                textShadow: 'rgba(255,255,255,0.6) 0px 1px 1px, rgba(0,0,0,0.15) 0px -1px 0px',
                opacity: 0.7
              } : {
                // "Glow" look for active state
                textShadow: '0 0 15px rgba(99,102,241,0.6), 0 0 5px rgba(99,102,241,0.2)',
                filter: 'drop-shadow(0 0 2px rgba(99,102,241,0.3))'
              }}
            >
              {mode.label}
            </span>
            {currentMode === mode.id && mode.id !== 'original' && isLoading && (
              <div className="absolute top-1 right-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
