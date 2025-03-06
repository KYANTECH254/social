"use client";

import { useState } from "react";
import PostBack from "../Buttons/PostBack";
import ShareModal from "../PopUps/ShareModal";

export default function PublicTopPost() {
    const [showModal, setShowModal] = useState<boolean>(false); 
    const [liked, setLiked] = useState(false);

    const toggleShareModal = () => {
        setShowModal(!showModal);
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
                <div className="public-top-post-button">
                    <svg onClick={() => {setLiked(liked ? false : true)}} width="24" height="24" viewBox="0 0 24 24" fill={liked ? 'red' : 'currentColor'}>
                        <path d="M12 21.638L11.172 20.809C6.732 16.594 4 13.97 4 10.5C4 7.634 6.21 5.5 9 5.5C10.656 5.5 12.242 6.324 13 7.5C13.758 6.324 15.344 5.5 17 5.5C19.79 5.5 22 7.634 22 10.5C22 13.97 19.268 16.594 14.828 20.809L14 21.638L12 21.638Z" />
                    </svg>
                    <div className="public-post-tally">100K</div>
                </div>

                <div className="public-top-post-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
                    </svg>
                    <div className="public-post-tally">100K</div>
                </div>

                {/* Share button */}
                <div className="public-top-post-button" onClick={toggleShareModal}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                    </svg>
                    <div className="public-post-tally">100K</div>
                </div>
            </div>

            {/* Share Modal Component */}
            {showModal && <ShareModal isModalOpen={showModal} />}
        </div>
    );
}
