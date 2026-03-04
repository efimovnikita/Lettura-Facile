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

      {/* Theme Toggle */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
          Tema dell'applicazione
        </span>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all text-sm font-medium"
        >
          {theme === 'light' ? (
            <>
              <Sun className="w-4 h-4 text-amber-500" />
              Chiaro
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-400" />
              Scuro
            </>
          )}
        </button>
      </div>

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
          className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
        />
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
