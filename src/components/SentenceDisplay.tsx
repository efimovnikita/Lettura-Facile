import React from 'react';
import { WordRenderer } from './WordRenderer';
import { motion, AnimatePresence } from 'motion/react';
import { SynonymPair } from '../utils';

interface SentenceDisplayProps {
  sentenceText: string;
  displayMode: string;
  selectedIndices: number[];
  getWordIntensity: (word: string) => number;
  onWordClick: (word: string, index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
  isLoading?: boolean;
  synonyms?: SynonymPair[];
}

export const SentenceDisplay: React.FC<SentenceDisplayProps> = ({
  sentenceText,
  displayMode,
  selectedIndices,
  getWordIntensity,
  onWordClick,
  isLoading = false,
  synonyms = [],
}) => {
  return (
    <div 
      className={`text-center mb-4 md:mb-12 w-full min-h-[160px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 ${isLoading ? 'blur-[1px]' : 'blur-0'}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sentenceText}
          initial={false}
          animate={{ opacity: isLoading ? 0.3 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          className="text-4xl md:text-5xl font-serif leading-tight text-stone-800 dark:text-stone-100 select-none"
        >
          {sentenceText.split(' ').map((word, index) => {
            const cleanWord = word.replace(/[^\p{L}’'-]/gu, '').toLowerCase();
            const synonymMatch = displayMode === 'original' 
              ? synonyms.find(s => s.original.toLowerCase() === cleanWord)
              : undefined;

            return (
              <WordRenderer
                key={`${index}-${word}`}
                word={word}
                index={index}
                intensity={getWordIntensity(word)}
                isSelected={selectedIndices.includes(index)}
                isClickable={displayMode !== 'translated'}
                synonym={synonymMatch?.synonym}
                onClick={onWordClick}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
