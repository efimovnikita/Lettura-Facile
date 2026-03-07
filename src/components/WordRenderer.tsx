import React from 'react';

interface WordRendererProps {
  word: string;
  index: number;
  intensity: number;
  isSelected: boolean;
  isClickable?: boolean;
  synonym?: string;
  onClick: (word: string, index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const WordRenderer: React.FC<WordRendererProps> = ({ word, index, intensity, isSelected, isClickable = true, synonym, onClick }) => {
  const getHighlightClass = (clicks: number) => {
    if (!isClickable || clicks === 0) return '';
    if (clicks < 3) return 'underline decoration-dotted decoration-gray-300 dark:decoration-gray-700 decoration-2 underline-offset-4';
    if (clicks < 6) return 'underline decoration-dotted decoration-gray-500 dark:decoration-gray-500 decoration-2 underline-offset-4';
    if (clicks <= 10) return 'underline decoration-dotted decoration-red-400 dark:decoration-red-500 decoration-[3px] underline-offset-4';
    return 'underline decoration-dotted decoration-red-600 dark:decoration-red-400 decoration-[3px] underline-offset-4';
  };

  const selectionClass = isSelected
    ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded px-1 -mx-1'
    : isClickable ? 'hover:text-blue-600 dark:hover:text-blue-400' : '';

  const match = word.match(/^([^\p{L}]*)([\p{L}’'-]+)([^\p{L}]*)$/u);

  if (!match) {
    return (
      <span
        onClick={(e) => isClickable && onClick(word, index, e)}
        className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} select-none touch-manipulation transition-colors ${isSelected ? selectionClass : isClickable ? 'hover:text-gray-600 dark:hover:text-gray-400' : ''}`}
      >
        {word}{' '}
      </span>
    );
  }

  const [, prefix, coreWord, suffix] = match;

  const content = (
    <span
      onClick={(e) => isClickable && onClick(coreWord, index, e)}
      className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} select-none touch-manipulation transition-colors ${getHighlightClass(intensity)} ${selectionClass}`}
    >
      {coreWord}
    </span>
  );

  return (
    <span className="inline-block mr-1 align-bottom">
      {prefix}
      {synonym ? (
        <ruby className="ruby-orange">
          {content}
          <rt className="ruby-top">
            <span className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter leading-none mb-0.5">
                {synonym.toUpperCase()}
              </span>
              <svg className="w-2 h-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M12 5l-7 7m7-7l7 7"/>
              </svg>
            </span>
          </rt>
        </ruby>
      ) : content}
      {suffix}
    </span>
  );
};
