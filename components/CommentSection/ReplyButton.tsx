import { Reply } from "lucide-react";

export default function ReplyButton({ comment, setReplyInput, replyinput }: any) {

    const handleOnclick = () => {
        !comment.id ? setReplyInput(null) : setReplyInput(comment.id);
    }

    return (
        <button
            onClick={handleOnclick}
            className="flex items-center flex-row space-x-2 p-2 rounded-md transition gap-1">
            <Reply size={24} className="default-color" />
        </button>
    );
}
