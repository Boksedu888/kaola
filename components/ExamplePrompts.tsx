
import React from 'react';
import type { Language } from '../constants';
import { examplePrompts } from '../constants';
import type { TranslationSet } from '../types';

interface ExamplePromptsProps {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  language: Language;
  t: TranslationSet;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ setPrompt, language, t }) => {
  const prompts = examplePrompts[language];

  return (
    <div className="space-y-3">
      <div>
          <h3 className="text-sm font-semibold text-gray-300">{t.examplePromptsTitle}</h3>
          <p className="text-xs text-gray-500">{t.examplePromptsSubtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p, index) => (
          <button
            key={index}
            onClick={() => setPrompt(p.prompt)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-700 text-gray-300 rounded-full hover:bg-cyan-600 hover:text-white transition-colors duration-200"
            title={p.prompt}
          >
            {p.title}
          </button>
        ))}
      </div>
    </div>
  );
};
