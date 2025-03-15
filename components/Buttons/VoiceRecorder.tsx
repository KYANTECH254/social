"use client"
import { useState, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { Mic, Send, StopCircle, Trash2 } from 'lucide-react';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}.${secs < 10 ? '0' : ''}${secs}`;
};

const VoiceChatInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Start recording and clear any previous recording.
  const handleStartRecording = (startRecording: any) => {
    setRecordedAudioUrl(null);
    startRecording();
    setIsRecording(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border-top dark:border-gray-700 flex flex-col items-center space-y-6">
      {/* Timer Display */}
      {isRecording && (
        <div className="text-2xl font-mono text-gray-700 dark:text-gray-300">
          {formatTime(recordingTime)}
        </div>
      )}

      <ReactMediaRecorder
        audio
        render={({ startRecording, stopRecording, mediaBlobUrl }: any) => (
          <>
            {isRecording ? (
              <button
                onClick={() => {
                  stopRecording();
                  setIsRecording(false);
                  setIsProcessing(true);
                  setTimeout(() => {
                    setRecordedAudioUrl(mediaBlobUrl);
                    setIsProcessing(false);
                  }, 500);
                }}
                className="flex items-center space-x-2 text-red-500 px-6 py-3 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                <StopCircle size={24} />
                <span>Stop recording</span>
              </button>
            ) : isProcessing ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 border-4 border-[var(--main-color)] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[var(--main-color)]">Processing...</span>
              </div>
            ) : recordedAudioUrl ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <audio
                  controls
                  src={recordedAudioUrl}
                  className="w-full rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <div className="flex space-x-6">
                  <button
                    onClick={() => {
                      setRecordedAudioUrl(null);
                    }}
                    className="px-6 py-2 border border-gray-500 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-500 hover:text-white transition"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      // Send recorded audio (implement your send logic here)
                      console.log("Sending recorded audio:", recordedAudioUrl);
                      // Clear the recording after sending
                      setRecordedAudioUrl(null);
                    }}
                    className="px-6 py-2 border border-[var(--main-color)] rounded-full text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleStartRecording(startRecording)}
                className="flex items-center space-x-2 text-[var(--main-color)] px-6 py-3 border border-[var(--main-color)] rounded-full hover:bg-[var(--main-color)] hover:text-white transition"
              >
                <Mic size={24} />
                <span>Start recording</span>
              </button>
            )}
          </>
        )}
      />
    </div>
  );
};

export default VoiceChatInput;
