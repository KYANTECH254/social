import { MessageSquare, Reply } from "lucide-react";

export default function ReplyButton() {
    return (
        <button className="flex items-center space-x-2 p-2 rounded-md transition">
            <MessageSquare size={20} className="default-text-color" />
        </button>
    );
}
