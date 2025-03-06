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

export default function CommentSection() {
    const [comments, setComments] = useState(initialComments);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedText, setEditedText] = useState<{ [key: string]: string }>({});

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditedText((prev) => ({ ...prev, [id]: text }));
    };

    const handleChange = (id: number, text: string) => {
        setEditedText((prev) => ({ ...prev, [id]: text }));
    };

    const handleBlur = () => {
        setEditingId(null);
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
    };

    return (
        <div className="comment-section">
            <CommentInput />
            <div className="comments-frames">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img src={comment.avatar} className="w-8 h-8 rounded-full" />
                                <div className="comment-user-det">@{comment.username} · {comment.timestamp}</div>
                            </div>
                            <VerticalMenu onEdit={() => handleEdit(comment.id, comment.text)} onDelete={() => handleDelete(comment.id)} />
                        </div>

                        {editingId === comment.id ? (
                            <EditComment comment={comment} editedText={editedText} setEditedText={setEditedText} handleBlur={handleBlur} handleChange={handleChange}/>
                        ) : (
                            <CommentContent text={comment.text} />
                        )}

                        <div className="comment-box-btns">
                            <LikeButton />
                            <ReplyButton />
                        </div>

                        {/* Replies */}
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="comment-box">
                                <div className="comment-box-header">
                                    <div className="comment-user-info flex flex-row">
                                        <img src={reply.avatar} className="w-8 h-8 rounded-full" />
                                        <div className="comment-user-det">@{reply.username} · {reply.timestamp}</div>
                                    </div>
                                    <VerticalMenu onEdit={() => handleEdit(reply.id, reply.text)} onDelete={() => handleDelete(reply.id)} />
                                </div>

                                {editingId === reply.id ? (
                                    <EditComment comment={reply} editedText={editedText} setEditedText={setEditedText} handleBlur={handleBlur}  handleChange={handleChange}/>
                                ) : (
                                    <ReplyContent username={reply.reply_username} text={reply.text} />
                                )}

                                <div className="comment-box-btns">
                                    <LikeButton />
                                    <ReplyButton />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
