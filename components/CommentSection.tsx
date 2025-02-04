"use client"

import VerticalMenu from "./Buttons/CommentModal";
import LikeButton from "./Buttons/LikeButton";
import ReplyButton from "./Buttons/ReplyButton";
import { Send } from "lucide-react";

export default function CommentSection() {
    return (
        <>
            <div className="comment-section">
                <div className="comments-tally">13K Comments</div>

                <div className="comments-input">
                    <input type="text" name="comment" id="comment" placeholder="Add a comment..." />
                    <button className="flex items-center space-x-2 p-2 rounded-md transition">
                        <Send size={24} className="text-gray-600" />
                    </button>
                </div>

                <div className="comments-frames">

                    <div className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img
                                    src="https://i.pravatar.cc/40?img=30"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="comment-user-det">@gloria · 12h</div>
                            </div>
                            <VerticalMenu />
                        </div>

                        <div className="comment-box-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className="comment-box-btns">
                            <LikeButton />
                            <ReplyButton />
                        </div>
                    </div>

                    <div className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img
                                    src="https://i.pravatar.cc/40?img=30"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="comment-user-det">@gloria · 12h</div>
                            </div>
                            <VerticalMenu />
                        </div>

                        <div className="comment-box-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className="comment-box-btns">
                            <LikeButton />
                            <ReplyButton />
                        </div>
                    </div>

                    <div className="comment-box">
                        <div className="comment-box-header">
                            <div className="comment-user-info flex flex-row">
                                <img
                                    src="https://i.pravatar.cc/40?img=30"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="comment-user-det">@gloria · 12h</div>
                            </div>
                            <VerticalMenu />
                        </div>

                        <div className="reply-box-content">
                            <div className="reply-content-user">@gloria</div>
                            <div className="reply-content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                        </div>
                        <div className="comment-box-btns">
                            <LikeButton />
                            <ReplyButton />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}