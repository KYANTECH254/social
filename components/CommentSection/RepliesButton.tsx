import { MessageSquare } from "lucide-react";

export default function RepliesButton({ total, comment, setReplies, replies }: any) {

    const handleOnclick = () => {
        comment.id === replies ? setReplies(null) : setReplies(comment.id);
    }

    return (
        <button
            onClick={handleOnclick}
            className="flex items-center flex-row space-x-2 p-2 rounded-md transition gap-1">
            <MessageSquare size={24} className="default-text-color" />
            <span className="text-sm">{total > 0 ? total : ''}</span>
        </button>
    );
}
