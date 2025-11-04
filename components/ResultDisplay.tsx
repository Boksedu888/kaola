
import React, { useEffect, useState } from 'react';
import type { TranslationSet } from '../types';
import { Image as ImageIcon } from './icons/Image';
import { Download } from './icons/Download';
import { Loader } from './icons/Loader';

interface ResultDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  t: TranslationSet;
}

const loadingMessages = (t: TranslationSet): string[] => [
  t.generatingMessage1,
  t.generatingMessage2,
  t.generatingMessage3,
  t.generatingMessage4,
];

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, isLoading, t }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // FIX: Refactor useEffect to correctly handle setInterval in a browser environment
  // and avoid using NodeJS-specific types.
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages(t).length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading, t]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-product-ad-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full">
          <Loader className="h-16 w-16 text-cyan-500 animate-spin" />
          <p className="mt-4 text-xl font-semibold">{t.generating}</p>
          <p className="mt-2 text-gray-500">{loadingMessages(t)[currentMessageIndex]}</p>
        </div>
      );
    }
    if (generatedImage) {
      return (
        <div className="relative w-full h-full group">
          <img src={generatedImage} alt={t.resultTitle} className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>{t.downloadButton}</span>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full">
        <ImageIcon className="h-24 w-24" />
        <p className="mt-4 text-lg font-medium">{t.resultPlaceholder}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-cyan-400 mb-4">{t.resultTitle}</h2>
      <div className="flex-grow bg-gray-900 rounded-lg flex items-center justify-center p-4 min-h-[300px] lg:min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};
