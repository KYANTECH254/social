import { MessageCircle, Info } from "lucide-react";
import { useState } from "react";
import FullPageProfilePicture from "./FullPageProfilePicture/FullPageProfilePicture";

export default function ProfilePicture({ contact, onClose }: any) {
    const [showFullPage, setShowFullPage] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    const handleImageClick = () => {
        setShowFullPage(true);
        setShowPopup(false); 
    };

    const closeFullPagePopup = () => {
        setShowFullPage(false);
        setShowPopup(false); 
        onClose();
    };

    const handleBackgroundClick = () => {
        setShowFullPage(false);
        setShowPopup(false); 
        onClose(); 
    };

    return (
        <div className="popup-bg-container" onClick={handleBackgroundClick}>
            {showFullPage && (
                <FullPageProfilePicture
                    contact={contact}
                    onClose={closeFullPagePopup}
                />
            )}

            {showPopup && !showFullPage && (
                <div
                    className="profile-popup-container"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div className="profile-popup-header">
                        <span className="profile-popup-header-text">
                            Profile Picture
                        </span>
                    </div>
                    <div className="profile-popup-body">
                        <img
                            src="/assets/images/pic.jpeg"
                            className="profile-pic-img"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="profile-popup-footer flex flex-row p-2">
                        <button className="profile-popup-footer-button">
                            <MessageCircle size={24} className="default-color" />
                        </button>
                        <button className="profile-popup-footer-button">
                            <Info size={24} className="default-color" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
