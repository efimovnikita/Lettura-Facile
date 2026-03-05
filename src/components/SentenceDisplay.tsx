import React from 'react';
import { WordRenderer } from './WordRenderer';

interface SentenceDisplayProps {
  sentenceText: string;
  displayMode: string;
  selectedIndices: number[];
  getWordIntensity: (word: string) => number;
  onWordClick: (word: string, index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
  onWordDoubleClick: (index: number) => void;
  isLoading?: boolean;
}

export const SentenceDisplay: React.FC<SentenceDisplayProps> = ({
  sentenceText,
  displayMode,
  selectedIndices,
  getWordIntensity,
  onWordClick,
  onWordDoubleClick,
  isLoading = false,
}) => {
  return (
    <div className={`text-center mb-12 w-full min-h-[240px] flex items-center justify-center transition-all duration-500 ${isLoading ? 'opacity-50 blur-[1px]' : 'opacity-100 blur-0'}`}>
      <div className="text-4xl md:text-5xl font-serif leading-tight text-stone-800 dark:text-stone-100 select-none">
        {sentenceText.split(' ').map((word, index) => (
          <WordRenderer
            key={`${index}-${word}`}
            word={word}
            index={index}
            intensity={getWordIntensity(word)}
            isSelected={selectedIndices.includes(index)}
            isClickable={displayMode !== 'translated'}
            onClick={onWordClick}
            onDoubleClick={onWordDoubleClick}
          />
        ))}
      </div>
    </div>
  );
};
