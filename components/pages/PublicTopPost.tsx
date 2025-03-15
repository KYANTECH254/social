"use client";

import { useState } from "react";
import PostBack from "../Buttons/PostBack";
import ShareModal from "../PopUps/ShareModal";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function PublicTopPost() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [shared, setShared] = useState(false);
    const [ping, setPing] = useState(false);

    const toggleShareModal = () => {
        setShowModal(!showModal);
    };

    const handleLike = () => {
        setLiked((prev) => !prev);
        setPing(true);
        setTimeout(() => {
            setPing(false);
        }, 300);
        toast.success("Post Liked", {
            duration: 3000,
            classNames: { toast: "alert" },
        })
    };

    return (
        <div className="no-header-container">
            <div className="public-top-post-header flex flex-row">
                <PostBack />
            </div>

            <div className="public-top-post-body">
                <div className="public-post-user flex flex-row">
                    <div className="public-post-user-avatar">
                        <img
                            src="https://i.pravatar.cc/40?img=30"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                    <div className="public-post-info">
                        <div className="public-post-user-info flex flex-col">
                            <div className="public-post-user-name">Gloria muliro</div>
                            <div className="public-post-user-username">
                                @gloria · 12h
                            </div>
                        </div>
                    </div>
                </div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div className="public-top-post-footer">
                <div onClick={handleLike} className="public-top-post-button">
                    <Heart fill={liked ? 'red' : 'none'} className={liked ? `text-red-600 ${ping ? "animate-ping" : ""}` : ''} />
                    <div className={`public-post-tally ${liked ? 'text-red-600' : ''}`}>100K</div>
                </div>

                <div className="public-top-post-button">
                    <MessageSquare />
                    <div className={`public-post-tally ${commented ? 'text-blue-600' : ''}`}>100K</div>
                </div>

                <div className="public-top-post-button" onClick={toggleShareModal}>
                    <Share2 />
                    <div className={`public-post-tally ${shared ? 'text-blue-600' : ''}`}>30K</div>
                </div>
            </div>

            {/* Share Modal Component */}
            {showModal && <ShareModal isModalOpen={showModal} />}
        </div>
    );
}
