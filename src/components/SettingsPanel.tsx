import React from 'react';
import { Sun, Moon, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface SettingsPanelProps {
  mistralKey: string;
  setMistralKey: (key: string) => void;
  dictionary: Record<string, number>;
  showWordList: boolean;
  setShowWordList: (show: boolean) => void;
  clearDictionary: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  mistralKey,
  setMistralKey,
  dictionary,
  showWordList,
  setShowWordList,
  clearDictionary,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mb-6 p-5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl animate-fade-in-down transition-colors duration-500">
      <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-4 uppercase tracking-wider">
        Configurazione
      </h3>

      {/* API Key Input */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">
          Mistral API Key
        </label>
        <input
          type="password"
          placeholder="Inserisci la tua API Key..."
          value={mistralKey}
          onChange={(e) => setMistralKey(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-inner"
        />
      </div>

      {/* Compact Theme Toggle Switch */}
      <div className="mb-5 flex items-center justify-between bg-white dark:bg-stone-800/50 p-4 rounded-lg border border-stone-100 dark:border-stone-800 shadow-sm">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-stone-700 dark:text-stone-200">
            Tema
          </span>
          <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium leading-none mt-0.5">
            Chiaro / Scuro
          </span>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`group relative flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner border-2 shrink-0 ${
            theme === 'dark' 
              ? 'bg-indigo-600 border-indigo-500' 
              : 'bg-stone-200 border-stone-100'
          }`}
          aria-label="Cambia tema"
        >
          {/* Track Icons */}
          <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
            <Sun className={`w-3 h-3 ${theme === 'light' ? 'opacity-0' : 'text-white opacity-40'}`} />
            <Moon className={`w-3 h-3 ${theme === 'dark' ? 'opacity-0' : 'text-stone-400 opacity-60'}`} />
          </div>

          {/* Sliding Knob */}
          <div
            className={`h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
              theme === 'dark' ? 'translate-x-7.5' : 'translate-x-0.5'
            } flex items-center justify-center border border-stone-100/50 overflow-hidden`}
          >
            {theme === 'light' ? (
              <Sun className="w-3.5 h-3.5 text-amber-500 transition-colors" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600 transition-colors" />
            )}
          </div>
        </button>
      </div>

      {/* Dictionary Management */}
      {Object.keys(dictionary).length > 0 && (
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <button
              onClick={() => setShowWordList(!showWordList)}
              className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
            >
              Radici in memoria: <strong className="group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{Object.keys(dictionary).length}</strong>
              {showWordList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={clearDictionary}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Svuota dizionario
            </button>
          </div>

          {showWordList && (
            <div className="mt-4 p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg max-h-48 overflow-y-auto animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {Object.entries(dictionary)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([stem, count]) => (
                    <div key={stem} className="flex items-center gap-1.5 px-2 py-1 bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 rounded-md text-xs border border-stone-200 dark:border-stone-700">
                      <span className="font-medium">{stem}</span>
                      <span className="text-[10px] bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 px-1 rounded font-mono">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
