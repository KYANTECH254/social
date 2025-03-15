"use client"

import { useState } from "react";
import { Copy } from "lucide-react";
import BottomPopupModal from "./BottomPopupModal/BottomPopupModal";

export default function ShareModal(isModalOpen: any) {
    const [isOpen, setIsOpen] = useState(isModalOpen);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
                break;
            default:
                return;
        }
        window.open(shareUrl, '_blank');
    };

    return (
        <BottomPopupModal isOpen={isOpen} onClose={() => setIsOpen(false)} size={0.4}>
            <div className="space-y-4 share-btns-align">
                <button
                    onClick={copyLink}
                    className="flex mt-4 items-center rounded-md transition share-icon-btn">
                    <Copy size={24} className="space-x-2 p-2 share-btn" />
                    <span>Copy Link</span>
                </button>

                {/* Facebook Share Button */}
                <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center rounded-md transition share-icon-btn">
                    <img src="assets/images/fb.png" alt="Facebook" className="space-x-2 p-2 share-btn" />
                    <span>Facebook</span>
                </button>

                {/* Twitter Share Button */}
                <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center rounded-md transition share-icon-btn">
                    <img src="assets/images/X-cl.png" alt="Twitter" className="space-x-2 p-2 share-btn" />
                    <span>Twitter</span>
                </button>

                {/* WhatsApp Share Button */}
                <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center rounded-md transition share-icon-btn">
                    <img src="assets/images/whatsapp.png" alt="WhatsApp" className="space-x-2 p-2 share-btn" />
                    <span>WhatsApp</span>
                </button>

                {/* Email Share Button */}
                <button
                    onClick={() => handleShare('email')}
                    className="flex items-center rounded-md transition share-icon-btn">
                    <img src="assets/images/email.png" alt="Email" className="space-x-2 p-2 share-btn" />
                    <span>Email</span>
                </button>

                {/* LinkedIn Share Button */}
                <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center rounded-md transition share-icon-btn">
                    <img src="assets/images/linkedin-1.png" alt="LinkedIn" className="space-x-2 p-2 share-btn" />
                    <span>LinkedIn</span>
                </button>

                {/* Telegram Share Button */}
                <button
                    onClick={() => handleShare('telegram')}
                    className="flex items-center  rounded-md transition share-icon-btn">
                    <img src="assets/images/telegram.png" alt="Telegram" className="space-x-2 p-2 share-btn" />
                    <span>Telegram</span>
                </button>
            </div>
        </BottomPopupModal>
    );
}
