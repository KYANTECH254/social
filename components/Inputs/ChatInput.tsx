import { RandomTextColor } from '@/lib/Functions';
import {
    Mic,
    Smile,
    Camera,
    Paperclip,
    Send,
} from 'lucide-react';

export default function ChatInput({
    setMessage,
    setMessages,
    setShowEmojiPicker,
    openCamera,
    setShowGallery,
    message,
    setIsRecording,
    setReply,
    reply,
    handleInputChange
}: any) {

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                name: "You",
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: "outgoing",
                color: RandomTextColor(),
                isReply: reply !== null,
                reply: reply ? { ...reply } : undefined,
            };
    
            console.log('Sending message:', newMessage);
            setMessages((prevMessages: any) => [...prevMessages, newMessage]); // Add new message to messages array
            setMessage('');
            setReply(null);
        } else {
            setIsRecording(true);
            console.log('Show voice recorder component');
        }
    };
    

    return (
        <>
            <div className="p-4 border-top">
                <div className="flex items-center space-x-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Message..."
                            value={message}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-full pl-10 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                        />
                        <button
                            className="absolute inset-y-0 left-0 flex items-center pl-2"
                            onClick={() => console.log('Open emoji picker')}
                        >
                            <Smile
                                onClick={() => setShowEmojiPicker((prev: any) => !prev)}
                                size={20}
                                className="text-[var(--main-text-color)] cursor-pointer"
                            />
                        </button>
                        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                            {message.trim() === '' && (
                                <button className="text-[var(--main-text-color)]" onClick={openCamera}>
                                    <Camera size={20} />
                                </button>
                            )}
                            <button className="text-[var(--main-text-color)]" onClick={() => setShowGallery(true)}>
                                <Paperclip size={20} />
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-10 h-10 flex items-center justify-center bg-[var(--main-color)] rounded-full text-white"
                        onClick={handleSend}
                    >
                        {message.trim() === '' ? <Mic size={24} /> : <Send size={20} />}
                    </button>
                </div>
            </div>
        </>
    )
}