
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ResultDisplay } from './components/ResultDisplay';
import { generateAdImage } from './services/geminiService';
import { Language, translations, randomPrompts } from './constants';
import { fileToBase64 } from './utils/file';
import { AlertTriangle } from './components/icons/AlertTriangle';

export interface UploadedFile {
  file: File;
  preview: string;
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleGenerate = useCallback(async (isRandom: boolean = false) => {
    if (uploadedFiles.length === 0) {
      setError(t.errorNoImages);
      return;
    }
    
    const currentPrompt = isRandom 
      ? randomPrompts[language][Math.floor(Math.random() * randomPrompts[language].length)]
      : prompt;

    if (!isRandom && !currentPrompt.trim()) {
      setError(t.errorNoPrompt);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageParts = await Promise.all(
        uploadedFiles.map(async (uploadedFile) => {
          const base64Data = await fileToBase64(uploadedFile.file);
          return {
            inlineData: {
              data: base64Data,
              mimeType: uploadedFile.file.type,
            },
          };
        })
      );
      
      const resultImage = await generateAdImage(imageParts, currentPrompt, language);
      setGeneratedImage(`data:image/png;base64,${resultImage}`);
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || t.errorGenerationFailed);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFiles, prompt, language, t]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header language={language} setLanguage={setLanguage} t={t} />
      
      <main className="flex-grow container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            t={t}
          />
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            t={t}
            hasImages={uploadedFiles.length > 0}
            language={language}
          />
        </div>
        
        <div className="lg:w-2/3 flex flex-col bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
          {error && (
             <div className="mb-4 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <span>{error}</span>
            </div>
          )}
          <ResultDisplay
            generatedImage={generatedImage}
            isLoading={isLoading}
            t={t}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
