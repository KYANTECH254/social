"use client";

import { useState } from "react";
import { MessageCircle, Share } from "lucide-react";
import Back from "../Buttons/Back";
import ShareModal from "../PopUps/ShareModal";

export default function InviteFriend() {
    const [inviteLink] = useState("https://yourapp.com/invite");
    const [showModal, setshowModal] = useState(false);

    const sendInvite = () => {
        const message = encodeURIComponent(
            `Hey! Join me on this amazing app. Click here to get started: ${inviteLink}`
        );
        window.location.href = `sms:?body=${message}`;
    };

    return (
        <div className="first-container">
            <Back title="Invite a Friend" />
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-[var(--main-background-color)] text-[var(--main-text-color)] p-6 rounded-2xl max-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Invite Your Friends</h2>
                <p className="text-sm text-center mb-4">
                    Send an invitation to your friends and enjoy the experience together!
                </p>
                <div className="flex flex-col gap-2 w-full">
                    <button
                        onClick={sendInvite}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all"
                    >
                        <MessageCircle size={20} />
                        Send SMS Invite
                    </button>
                    <button
                        onClick={() => setshowModal(true)}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all"
                    >
                        <Share size={20} />
                        Share Link
                    </button>
                </div>

            </div>
            {/* Share Modal Component */}
            {showModal && <ShareModal isModalOpen={showModal} />}
        </div>
    );
}
