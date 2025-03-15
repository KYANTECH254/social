import React, { useState } from 'react';

export default function SpeedOptionsBtn({ playbackSpeed, setPlaybackSpeed, speedOptions }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);        
    };

    const handleOptionClick = (speed: number) => {
        setPlaybackSpeed(speed);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50 inline-block cursor-pointer">
            <button
                onClick={toggleDropdown}
                className="bg-black/50 text-white px-3 py-1 rounded border border-white cursor-pointer"
            >
                {playbackSpeed}x
            </button>
            {isOpen && (
                <ul className="absolute bottom-16 right-5 mt-2 w-20 bg-black text-white border border-white rounded">
                    {speedOptions.map((speed: number) => (
                        <li
                            key={speed}
                            onClick={() => handleOptionClick(speed)}
                            className="cursor-pointer px-2 py-1 hover:bg-white hover:text-black"
                        >
                            {speed}x
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
