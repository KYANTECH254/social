import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import "./main.css";

export default function FullPageProfilePicture({ contact, onClose }: any) {
    const [zoomed, setZoomed] = useState(false);

    const toggleZoom = () => {
        setZoomed(!zoomed);
    };

    return (
        <div className="full-page-popup-container">
            {/* Header with back button and name */}
            <div className="full-page-popup-header">
                <button className="page-back-button" onClick={onClose}>
                    <ArrowLeft size={32} />
                    <span className="profile-name">
                        {/* {contact.name} */}
                        Profile
                        </span>
                </button>
            </div>

            {/* Centered image container */}
            <div className="full-page-image-container">
                <div
                    className={`image-wrapper ${zoomed ? "zoomed" : ""}`}
                    onClick={toggleZoom} 
                >
                    <img
                        src="/assets/images/pic.jpeg"
                        className="profile-image"
                        // alt={`${contact.name}'s profile`}
                    />
                </div>
            </div>
        </div>
    );
}
