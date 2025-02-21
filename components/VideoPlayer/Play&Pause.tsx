import { Pause, Play } from "lucide-react";

export default function PlayAndPause({ isPlaying, togglePlayPause }: any) {
    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center z-50">
                <button
                    onClick={togglePlayPause}
                    className="text-white hover:text-blue-600 transition-colors bg-black/50 rounded-full p-3"
                >
                    {isPlaying ? (
                        <Pause size={48} className="opacity-75" />
                    ) : (
                        <Play size={48} className="opacity-75" />
                    )}
                </button>
            </div>
        </>
    )
}