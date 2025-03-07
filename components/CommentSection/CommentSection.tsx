"use client";
import { useState } from "react";
import VerticalMenu from "./CommentModal";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import CommentContent from "./CommentContent";
import ReplyContent from "./ReplyContent";
import CommentInput from "./CommentInput";
import { comments as initialComments } from "@/types/data";
import EditComment from "./EditComment";
import ReplyInput from "./ReplyInput";
import RepliesButton from "./RepliesButton";
import SortComments from "./SortComments";
import { toast } from "sonner";

export default function CommentSection({ session }: any) {
    const [comments, setComments] = useState(initialComments);
    const [replies, setReplies] = useState<any>(null);
    const [commentReplyInput, setCommentReplyInput] = useState(null);
    const [replyReplyInput, setReplyReplyInput] = useState(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [sortType, setSortType] = useState<"Popular" | "Newest" | "Oldest">("Popular");

    const sortedComments = [...comments].sort((a: any, b: any) => {
        if (sortType === "Popular") return b.likes - a.likes;
        if (sortType === "Newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        if (sortType === "Oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return 0;
    });

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setComments((prevComments) =>
            prevComments
                .map((comment) => ({
                    ...comment,
                    replies: comment.replies.filter((reply) => reply.id !== id),
                }))
                .filter((comment) => comment.id !== id)
        );
        toast.success(`Comment ${id} deleted`, {
            duration: 3000,
            classNames: { toast: "alert" },
        });
    };

    const handleAddComment = (text: string, parentComment: any | null = null, parentID: number | null = null) => {
        const newComment = {
            id: Date.now(),
            username: "current_user",
            avatar: "https://i.pravatar.cc/40?img=10",
            timestamp: new Date().toLocaleTimeString(),
            text,
            isReply: parentComment !== null,
            reply_username: parentComment ? parentComment.username : null,
            replies: []
        };

        console.log("Old comment", parentComment, "New comment:", newComment);

        if (parentID) {
            setReplies(parentID)
        }

        setComments((prevComments) => {
            if (!parentComment) {
                return [newComment, ...prevComments];
            }

            return prevComments.map((comment) => {
                if (comment.id === parentComment.id) {
                    return { ...comment, replies: [newComment, ...comment.replies] };
                }

                if (comment.replies.some((reply) => reply.id === parentComment.id)) {
                    return {
                        ...comment,
                        replies: comment.replies.flatMap((reply) =>
                            reply.id === parentComment.id
                                ? [reply, newComment]
                                : [reply]
                        )
                    };
                }

                return comment;
            });
        });
    };

    const handleEditComment = (id: number, newText: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id === id) {
                    console.log(`Updating top-level comment ID: ${id}`);
                    return { ...comment, text: newText };
                }
                if (comment.replies) {
                    return {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply.id === id
                                ? { ...reply, text: newText }
                                : reply
                        ),
                    };
                }
                return comment;
            })
        );

        setEditingId(null);
    };

    const handleReport = (id: number) => {
        toast.success(`Comment ${id} reported`, {
            duration: 3000,
            classNames: { toast: "alert" },
        });
    }

    return (
        <div className="comment-section">
            <CommentInput onSubmit={(text) => handleAddComment(text)} />
            <SortComments selectedSort={sortType} setSelectedSort={setSortType} />
            <div className="comments-frames">
                {sortedComments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img src={comment.avatar} className="w-8 h-8 rounded-full" />
                                <div className="comment-user-det">@{comment.username} · {comment.timestamp}</div>
                            </div>
                            <VerticalMenu id={comment.id} onEdit={() => handleEdit(comment.id, comment.text)} onDelete={() => handleDelete(comment.id)} onReport={() => handleReport(comment.id)} />
                        </div>

                        {editingId === comment.id ? (
                            <EditComment
                                comment={comment}
                                onSubmit={(editedText) =>
                                    handleEditComment(comment.id, editedText)}
                            />
                        ) : (
                            <CommentContent text={comment.text} />
                        )}

                        <div className="comment-box-btns">
                            <LikeButton total={comment.likes || 0} />
                            <RepliesButton total={comment.replies.length} comment={comment} setReplies={setReplies} replies={replies} />
                            <ReplyButton comment={comment} setReplyInput={setCommentReplyInput} replyinput={commentReplyInput} />
                        </div>

                        {commentReplyInput === comment.id && (
                            <div className="mt-5">
                                <ReplyInput comment={comment} setReplyInput={setCommentReplyInput} replyinput={commentReplyInput} onSubmit={(text) => handleAddComment(text, comment, comment.id)} />
                            </div>
                        )}

                        {/* Replies */}
                        {replies === comment.id &&
                            comment.replies.map((reply) => {
                                const total_replies = comments.reduce(
                                    (count, c) => count + c.replies.filter(r => r.reply_username === reply.username).length,
                                    0
                                );

                                return (
                                    <div key={reply.id} className="comment-box transition-[max-height] duration-300 ease-in-out">
                                        <div className="comment-box-header">
                                            <div className="comment-user-info flex flex-row">
                                                <img src={reply.avatar} className="w-8 h-8 rounded-full" />
                                                <div className="comment-user-det">@{reply.username} · {reply.timestamp}</div>
                                            </div>
                                            <VerticalMenu
                                                id={reply.id}
                                                onEdit={() => handleEdit(reply.id, reply.text)}
                                                onDelete={() => handleDelete(reply.id)}
                                                onReport={() => handleReport(reply.id)}
                                            />
                                        </div>

                                        {editingId === reply.id ? (
                                            <EditComment
                                                comment={reply}
                                                onSubmit={(editedText) => handleEditComment(reply.id, editedText)}
                                            />
                                        ) : (
                                            <ReplyContent username={reply.reply_username} text={reply.text} />
                                        )}

                                        <div className="comment-box-btns">
                                            <LikeButton total={reply.likes || 0} />
                                            <RepliesButton total={total_replies} comment={comment} setReplies={setReplies} replies={replies} />
                                            <ReplyButton
                                                total={total_replies}
                                                comment={reply}
                                                setReplyInput={setReplyReplyInput}
                                                replyinput={replyReplyInput}
                                            />
                                        </div>

                                        {replyReplyInput === reply.id && (
                                            <div className="mt-5">
                                                <ReplyInput
                                                    comment={reply}
                                                    setReplyInput={setReplyReplyInput}
                                                    replyinput={replyReplyInput}
                                                    onSubmit={(text) => handleAddComment(text, reply, comment.id)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}