import { Rewind, FastForward } from "lucide-react";

export default function FastForwardAndPrevious({ currentTime, duration, handleSeek, formatTime }: any) {
    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <button
                    onClick={(e) => handleSeek(e, -5)}
                    className="text-white hover:text-blue-600 transition-colors"
                >
                    <Rewind size={24} />
                </button>
                <span className="text-white text-sm z-50">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <button
                    onClick={(e) => handleSeek(e, 5)}
                    className="text-white hover:text-blue-600 transition-colors"
                >
                    <FastForward size={24} />
                </button>
            </div>
        </>
    )
}