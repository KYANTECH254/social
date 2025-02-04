"use client"

import { useState } from "react";
import { Copy } from "lucide-react";
import WhatsAppIcon from "../Icons/WhatsAppIcon";

export default function ShareModal() {
    // Function to copy link to clipboard
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    // Function to handle social share
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

        // Open the share URL in a new tab
        window.open(shareUrl, '_blank');
    };

    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 border-t shadow-lg z-50 p-4 share-container"
                style={{ animation: "slideIn 0.3s ease-out" }}>
                <div className="items-center space-y-4 share-btns-align">
                    <button
                        onClick={copyLink}
                        className="flex mt-4 items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <Copy size={24} className="share-btn" />
                        <span>Copy Link</span>
                    </button>

                    {/* Facebook Share Button */}
                    <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <img src="assets/images/fb.png" alt="Facebook" className="share-btn" />
                        <span>Facebook</span>
                    </button>

                    {/* Twitter Share Button */}
                    <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <img src="assets/images/X.png" alt="Twitter" className="share-btn" />
                        <span>Twitter</span>
                    </button>

                    {/* WhatsApp Share Button */}
                    <button
                        onClick={() => handleShare('whatsapp')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                                                <img src="assets/images/whatsapp.png" alt="WhatsApp" className="share-btn" />
                        <span>WhatsApp</span>
                    </button>

                    {/* Email Share Button */}
                    <button
                        onClick={() => handleShare('email')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <img src="assets/images/email.png" alt="Email" className="share-btn" />
                        <span>Email</span>
                    </button>

                    {/* LinkedIn Share Button */}
                    <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <img src="assets/images/linkedin-1.png" alt="LinkedIn" className="share-btn" />
                        <span>LinkedIn</span>
                    </button>

                    {/* Telegram Share Button */}
                    <button
                        onClick={() => handleShare('telegram')}
                        className="flex items-center space-x-2 p-2 rounded-md transition share-icon-btn">
                        <img src="assets/images/telegram.png" alt="Telegram" className="share-btn" />
                        <span>Telegram</span>
                    </button>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes slideIn {
                    0% {
                        transform: translateY(100%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
