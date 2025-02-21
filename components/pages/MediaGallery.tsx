"use client"
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface MediaItem {
  file: File;
  preview: string;
  type: string;
}

interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFiles?: (files: MediaItem[]) => void;
}

export default function MediaGallery({ isOpen, onClose, onSelectFiles }: MediaGalleryProps) {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger the file input dialog
  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const filesWithPreview = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));
    setFiles(filesWithPreview);
    if (onSelectFiles) {
      onSelectFiles(filesWithPreview);
    }
  };

  // Clean up URL objects when the component unmounts or files change
  useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [files]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="h-full w-full bg-white dark:bg-gray-800 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Select Media
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={openFileInput}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="/*"
            multiple
            onChange={handleFilesChange}
            className="hidden"
          />
        </div>
        {files.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {files.map((item, index) => (
              <div key={index} className="relative">
                {item.type.startsWith('image') ? (
                  <img
                    src={item.preview}
                    alt={`Media ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <video
                    src={item.preview}
                    className="w-full h-32 object-cover rounded"
                    controls
                  />
                )}
                <button
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1"
                >
                  <X size={16} className="text-red-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No media selected.
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              // Perform any action with the selected files (e.g., attach them to the message)
              onClose();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
