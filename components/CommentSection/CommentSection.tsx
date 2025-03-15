"use client";
import { useEffect, useState } from "react";
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
import { generateRandomColorAvatar, randomUsername, timeAgo, userUTCTime } from "@/lib/Functions";

export default function CommentSection({ session, post }: any) {
    const [comments, setComments] = useState(initialComments);
    const [replies, setReplies] = useState<any>(null);
    const [commentReplyInput, setCommentReplyInput] = useState(null);
    const [replyReplyInput, setReplyReplyInput] = useState(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [sortType, setSortType] = useState<"Popular" | "Newest" | "Oldest">("Popular");

    const sortedComments = [...comments].sort((a: any, b: any) => {
        if (sortType === "Popular") return b.likes - a.likes;
        if (sortType === "Newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        if (sortType === "Oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return 0;
    });

    /**
     * Sets the comment to be edited to the one with the given id.
     * @param {string} id the id of the comment to edit
     * @param {string} text the new text of the comment
     * @returns {void}
     */
    const handleEdit = (id: string, text: string): void => {
        setEditingId(id);
    };

    /**
     * Handles deleting a comment.
     * @param {string} id the id of the comment to delete
     * @returns {void}
     */
    const handleDelete = (id: string): void => {
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

    /**
     * Handles adding a comment or reply to the comments state.
     * @param {string} text the text of the comment to add
     * @param {any | null} [parentComment] the parent comment to add the reply to
     * @param {string | null} [parentID] the id of the parent comment to add the reply to
     * @returns {void}
     */
    const handleAddComment = (text: string, parentComment: any | null = null, parentID: string | null = null): void => {
        const username = randomUsername();
        const avatar = generateRandomColorAvatar(username);
        const newComment = {
            id: `${Date.now()}`,
            post: `${post?.id ?? Math.floor(Math.random() * 100000) + 1}`,
            post_type: post?.type ?? "public",
            username: session?.username ?? username,
            avatar: session?.avatar ?? avatar,
            timestamp: userUTCTime(),
            text,
            isReply: parentComment !== null,
            reply_username: parentComment?.username ?? null,
            replies: []
        };
        console.log(newComment);

        if (parentID) {
            setReplies(parentID);
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

    /**
     * Edits a comment.
     * @param {string} id the id of the comment to edit
     * @param {string} newText the new text of the comment
     * @returns {void}
     */
    const handleEditComment = (id: string, newText: string): void => {
        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id === id) {
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

    const handleReport = (id: string) => {
        toast.success(`Comment ${id} reported`, {
            duration: 3000,
            classNames: { toast: "alert" },
        });
    }

    return (
        <div className="comment-section">
            <div className="text-lg flex items-center justify-between font-semibold h-10 p-2 -mt-5 mb-5 border-b border-t border-[var(--main-border-color)]">
                {comments.length === 0 ? 'Be the first to Comment' : comments.length > 1 ? `${comments.length} Comments` : `${comments.length} Comment`}
            </div>
            <CommentInput onSubmit={(text) => handleAddComment(text)} />
            <SortComments selectedSort={sortType} setSelectedSort={setSortType} />
            <div className="comments-frames">
                {sortedComments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img src={comment.avatar} className="w-8 h-8 rounded-full" />
                                <div className="comment-user-det text-gray-600">@{comment.username} · {timeAgo(comment.timestamp)}</div>
                            </div>
                            <VerticalMenu
                                username={comment.username}
                                session={session}
                                id={comment.id}
                                onEdit={() => handleEdit(comment.id, comment.text)}
                                onDelete={() => handleDelete(comment.id)}
                                onReport={() => handleReport(comment.id)} />
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
                                <ReplyInput 
                                comment={comment} 
                                setReplyInput={setCommentReplyInput} 
                                replyinput={commentReplyInput} 
                                onSubmit={(text) => handleAddComment(text, comment, comment.id)} />
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
                                    <div key={reply.id} className="reply-box transition-[max-height] duration-300 ease-in-out">
                                        <div className="comment-box-header">
                                            <div className="comment-user-info flex flex-row">
                                                <img src={reply.avatar} className="w-8 h-8 rounded-full" />
                                                <div className="comment-user-det">@{reply.username} · {timeAgo(reply.timestamp)}</div>
                                            </div>
                                            <VerticalMenu
                                                username={reply.username}
                                                session={session}
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
                                            <RepliesButton
                                                total={total_replies}
                                                comment={comment}
                                                setReplies={setReplies}
                                                replies={replies} />
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