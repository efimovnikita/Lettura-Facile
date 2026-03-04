import React from 'react';

interface WordRendererProps {
  word: string;
  index: number;
  intensity: number;
  isSelected: boolean;
  onClick: (word: string, index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const WordRenderer: React.FC<WordRendererProps> = ({ word, index, intensity, isSelected, onClick }) => {
  const getHighlightClass = (clicks: number) => {
    if (clicks === 0) return '';
    if (clicks < 3) return 'underline decoration-dotted decoration-gray-300 dark:decoration-gray-700 decoration-2 underline-offset-4';
    if (clicks < 6) return 'underline decoration-dotted decoration-gray-500 dark:decoration-gray-500 decoration-2 underline-offset-4';
    if (clicks <= 10) return 'underline decoration-dotted decoration-red-400 dark:decoration-red-500 decoration-[3px] underline-offset-4';
    return 'underline decoration-dotted decoration-red-600 dark:decoration-red-400 decoration-[3px] underline-offset-4';
  };

  const selectionClass = isSelected
    ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded px-1 -mx-1'
    : 'hover:text-blue-600 dark:hover:text-blue-400';

  const match = word.match(/^([^\p{L}]*)([\p{L}’'-]+)([^\p{L}]*)$/u);

  if (!match) {
    return (
      <span
        onClick={(e) => onClick(word, index, e)}
        className={`cursor-pointer select-none touch-manipulation transition-colors ${isSelected ? selectionClass : 'hover:text-gray-600 dark:hover:text-gray-400'}`}
      >
        {word}{' '}
      </span>
    );
  }

  const [, prefix, coreWord, suffix] = match;

  return (
    <span className="inline-block mr-1">
      {prefix}
      <span
        onClick={(e) => onClick(coreWord, index, e)}
        className={`cursor-pointer select-none touch-manipulation transition-colors ${getHighlightClass(intensity)} ${selectionClass}`}
      >
        {coreWord}
      </span>
      {suffix}
    </span>
  );
};
