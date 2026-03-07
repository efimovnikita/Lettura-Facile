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
  showSynonyms?: boolean;
}

export const SentenceDisplay: React.FC<SentenceDisplayProps> = ({
  sentenceText,
  displayMode,
  selectedIndices,
  getWordIntensity,
  onWordClick,
  isLoading = false,
  synonyms = [],
  showSynonyms = false,
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
          className="text-4xl md:text-5xl font-serif leading-[1.6] text-stone-800 dark:text-stone-100 select-none pt-6"
        >
          {(() => {
            let lastSynonymIndex = -2;
            return sentenceText.split(' ').map((word, index) => {
              const cleanWord = word.replace(/[^\p{L}’'-]/gu, '').toLowerCase();
              
              // Skip if previous word had a synonym to avoid horizontal overlap
              const canShowSynonym = index > lastSynonymIndex + 1;
              
              const synonymMatch = (displayMode === 'original' && showSynonyms && canShowSynonym)
                ? synonyms.find(s => s.original.toLowerCase() === cleanWord)
                : undefined;

              if (synonymMatch) {
                lastSynonymIndex = index;
              }

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
            });
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
