
import React from 'react';
import type { Language } from '../constants';
import type { TranslationSet } from '../types';
import { Sparkles } from './icons/Sparkles';
import { Wand } from './icons/Wand';
import { Loader } from './icons/Loader';
import { ExamplePrompts } from './ExamplePrompts';

interface PromptControlsProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onGenerate: (isRandom?: boolean) => void;
  isLoading: boolean;
  t: TranslationSet;
  hasImages: boolean;
  language: Language;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onGenerate, isLoading, t, hasImages, language }) => {
  const commonButtonClasses = "w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
  const disabledClasses = "disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="space-y-4 flex flex-col flex-grow">
      <div>
        <h2 className="text-lg font-semibold text-cyan-400">{t.promptTitle}</h2>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t.promptPlaceholder}
        rows={5}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-200 placeholder-gray-500"
      />
      
      <ExamplePrompts setPrompt={setPrompt} language={language} t={t} />

      <div className="mt-auto space-y-3 pt-4">
        <button
          onClick={() => onGenerate(false)}
          disabled={isLoading || !hasImages}
          className={`${commonButtonClasses} bg-cyan-600 text-white hover:bg-cyan-500 ${disabledClasses}`}
        >
          {isLoading ? <Loader className="animate-spin h-5 w-5" /> : <Wand className="h-5 w-5" />}
          <span>{isLoading ? t.generating : t.generateButton}</span>
        </button>
        <button
          onClick={() => onGenerate(true)}
          disabled={isLoading || !hasImages}
          className={`${commonButtonClasses} bg-gray-600 text-gray-200 hover:bg-gray-500 ${disabledClasses}`}
        >
          {isLoading ? <Loader className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          <span>{isLoading ? t.generating : t.randomButton}</span>
        </button>
      </div>
    </div>
  );
};
