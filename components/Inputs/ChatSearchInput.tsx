import {
    ArrowLeft,
    ChevronDown,
    ChevronUp
  } from 'lucide-react';

export default function ChatSearchInput({
    handleInputChange,
    setShowSearch,
    setShowMenu,
    openCamera,
    setShowGallery,
    message,
}: any) {
    return (
        <>
            <div className="flex items-center p-4 border-bottom shadow-lg">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={message}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-full pl-10 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                    />
                    <button
                        className="absolute inset-y-0 left-0 flex items-center pl-2"
                        onClick={() => console.log('Open emoji picker')}
                    >
                        <ArrowLeft
                            onClick={() => {
                                setShowSearch((prev: any) => !prev);
                                setShowMenu(false);
                            }}
                            size={20}
                            className="text-[var(--main-text-color)] cursor-pointer"
                        />
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center font-semibold">4</div>
                        <button className="text-[var(--main-text-color)]" onClick={openCamera}>
                            <ChevronUp size={20} />
                        </button>

                        <button className="text-[var(--main-text-color)]" onClick={() => setShowGallery(true)}>
                            <ChevronDown size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}