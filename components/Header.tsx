
import React from 'react';
import type { Language } from '../constants';
import type { TranslationSet } from '../types';
import { BotMessageSquare } from './icons/BotMessageSquare';

interface HeaderProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: TranslationSet;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BotMessageSquare className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{t.title}</h1>
        </div>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 text-sm font-semibold bg-gray-700 hover:bg-cyan-500 hover:text-white transition-colors duration-300 rounded-md"
        >
          {t.langSwitch}
        </button>
      </div>
    </header>
  );
};
