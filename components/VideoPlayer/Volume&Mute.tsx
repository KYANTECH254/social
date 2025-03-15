import { VolumeX, Volume2 } from "lucide-react";

export default function VolumeAndMute({ isMuted, toggleMute, volume, handleVolumeChange }: any) {
    return (
        <div className="flex flex-col justify-center gap-2">

            {/* <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-blue-600 
                               rotate-90 origin-left translate-x-8 translate-y-1"
            /> */}

            <button
                onClick={toggleMute}
                className={`${isMuted ? 'text-blue-600' : 'text-white'} hover:text-blue-600 transition-colors`}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>
    )
}