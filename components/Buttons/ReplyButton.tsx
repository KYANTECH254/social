import { Reply } from "lucide-react";

export default function ReplyButton() {
    return (
        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition">
            <Reply size={20} className="text-gray-600" />
        </button>
    );
}
