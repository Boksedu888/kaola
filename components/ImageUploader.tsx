
import React, { useCallback, useRef } from 'react';
import type { UploadedFile } from '../App';
import type { TranslationSet } from '../types';
import { MAX_IMAGES } from '../constants';
import { UploadCloud } from './icons/UploadCloud';
import { X } from './icons/X';

interface ImageUploaderProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  t: TranslationSet;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedFiles, setUploadedFiles, t }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // FIX: Use spread syntax for better type inference of FileList to File[].
      const files = [...event.target.files];
      const newFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadedFiles(prev => {
        const combined = [...prev, ...newFiles];
        if (combined.length > MAX_IMAGES) {
          alert(t.errorTooManyFiles);
          return prev;
        }
        return combined;
      });
    }
    // Reset file input to allow re-uploading the same file
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }, [setUploadedFiles, t.errorTooManyFiles]);

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-cyan-400">{t.uploadTitle}</h2>
        <p className="text-sm text-gray-400">{t.uploadSubtitle}</p>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-cyan-500 hover:bg-gray-700/50 transition-colors"
        onClick={openFileDialog}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
        <p className="mt-2 text-sm text-gray-300 font-semibold">{t.uploadButton}</p>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative group aspect-square">
              <img src={file.preview} alt={`preview ${index}`} className="w-full h-full object-cover rounded-md" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => removeFile(index)}
                  className="p-2 bg-red-600/80 hover:bg-red-500 rounded-full text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
