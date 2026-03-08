import React from 'react';
import { ChevronsUp, ChevronsDown } from 'lucide-react';

export type Mode = 'original' | 'simplified' | 'translated';

interface ModeSwitchProps {
  currentMode: Mode;
  onChange: (mode: Mode) => void;
  onThumbClick?: () => void;
  hasSynonyms?: boolean;
  showSynonyms?: boolean;
  isLoading?: boolean;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ 
  currentMode, 
  onChange, 
  onThumbClick,
  hasSynonyms = false,
  showSynonyms = false,
  isLoading 
}) => {
  const getSliderLeft = () => {
    if (currentMode === 'original') return '4px';
    if (currentMode === 'simplified') return '50%';
    if (currentMode === 'translated') return 'calc(100% - 28px)';
    return '4px';
  };

  const getSliderTransform = () => {
    if (currentMode === 'simplified') return 'translateX(-50%)';
    return 'none';
  };

  const getLabelStyle = (mode: Mode) => {
    const isActive = currentMode === mode;
    if (isActive) {
      return {
        textShadow: '0 0 15px rgba(99,102,241,0.6), 0 0 5px rgba(99,102,241,0.2)',
        opacity: 1
      };
    } else {
      return {
        textShadow: 'none',
        opacity: 0.5
      };
    }
  };

  const handleThumbClick = (e: React.MouseEvent) => {
    if (currentMode === 'original' && hasSynonyms && onThumbClick) {
      e.stopPropagation();
      onThumbClick();
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 w-full max-w-lg mx-auto mt-8 mb-16 relative">
      {/* Central Slider Control */}
      <div className="flex items-center gap-4 relative">
        
        {/* Left Label (Originale) */}
        <div className="absolute right-full mr-2 flex items-center">
          <button 
            onClick={() => onChange('original')}
            className={`text-[15px] font-extrabold tracking-tight transition-all duration-500 whitespace-nowrap cursor-pointer ${
              currentMode === 'original' ? 'text-indigo-600 dark:text-indigo-300' : 'text-stone-400 dark:text-stone-500'
            }`}
          >
            <span style={getLabelStyle('original')}>
              Originale
            </span>
          </button>
          <div className={`h-[0.5px] w-4 bg-indigo-300 dark:bg-indigo-700 ml-1 transition-opacity duration-500 ${currentMode === 'original' ? 'opacity-100' : 'opacity-20'}`} />
        </div>

        {/* The Track */}
        <div className="relative w-28 h-8 bg-stone-100 dark:bg-stone-900 rounded-full border border-stone-200/50 dark:border-stone-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          {/* Slider Thumb */}
          <div 
            data-testid="mode-switch-thumb"
            onClick={handleThumbClick}
            className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ease-out z-20 flex items-center justify-center overflow-hidden ${
              currentMode === 'original' && hasSynonyms && onThumbClick 
                ? 'cursor-pointer hover:scale-110 active:scale-95' 
                : 'cursor-not-allowed'
            }`}
            style={{
              left: getSliderLeft(),
              transform: getSliderTransform(),
              backgroundColor: hasSynonyms ? 'rgba(99, 102, 241, 0.3)' : 'rgba(120, 113, 108, 0.2)',
              // Sharp, readable white border, NO external glow
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
              opacity: hasSynonyms ? 1 : 0.6
            }}
          >
            {currentMode === 'original' && (
              <div className={`transition-all duration-300 ${
                hasSynonyms 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-stone-400 dark:text-stone-600'
              }`}>
                {showSynonyms ? (
                  <ChevronsDown className="w-4 h-4" />
                ) : (
                  <ChevronsUp className="w-4 h-4" />
                )}
              </div>
            )}
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Invisible click targets on the track */}
          <div className="absolute inset-0 flex z-10">
            <div className="flex-1 cursor-pointer" onClick={() => onChange('original')} />
            <div className="flex-1 cursor-pointer" onClick={() => onChange('simplified')} />
            <div className="flex-1 cursor-pointer" onClick={() => onChange('translated')} />
          </div>
        </div>

        {/* Right Label (Traduzione) */}
        <div className="absolute left-full ml-2 flex items-center">
          <div className={`h-[0.5px] w-4 bg-indigo-300 dark:bg-indigo-700 mr-1 transition-opacity duration-500 ${currentMode === 'translated' ? 'opacity-100' : 'opacity-20'}`} />
          <button 
            onClick={() => onChange('translated')}
            className={`text-[15px] font-extrabold tracking-tight transition-all duration-500 whitespace-nowrap cursor-pointer ${
              currentMode === 'translated' ? 'text-indigo-600 dark:text-indigo-300' : 'text-stone-400 dark:text-stone-500'
            }`}
          >
            <span style={getLabelStyle('translated')}>
              Traduzione
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Label (Semplificato) */}
      <div className="absolute top-full mt-1 flex flex-col items-center">
        <div className={`w-[0.5px] h-3 bg-indigo-300 dark:bg-indigo-700 mb-0.5 transition-opacity duration-500 ${currentMode === 'simplified' ? 'opacity-100' : 'opacity-20'}`} />
        <button 
          onClick={() => onChange('simplified')}
          className={`text-[15px] font-extrabold tracking-tight transition-all duration-500 whitespace-nowrap cursor-pointer ${
            currentMode === 'simplified' ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-400 dark:text-stone-500'
          }`}
        >
          <span style={getLabelStyle('simplified')}>
            Semplificato
          </span>
        </button>
      </div>
    </div>
  );
};
