import { MessageCircle } from "lucide-react";
import { Info } from "lucide-react";
import { useState } from "react";
import FullPageProfilePicture from "./FullPageProfilePicture/FullPageProfilePicture";

export default function ProfilePicture({ contact, onClose }: any) {
    const [showFullPage, setShowFullPage] = useState(false);

    const handleImageClick = () => {
        setShowFullPage(true); 
    };

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
    };

    const closeFullPagePopup = () => {
        setShowFullPage(false);
    };

    const handleBackgroundClick = () => {
        setShowFullPage(false); // Close the full-page profile if open
        onClose(); // Close the main popup
    };

    return (
        <div>
            {showFullPage && (
                <FullPageProfilePicture
                    contact={contact}
                    onClose={closeFullPagePopup}
                />
            )}

            <div
                className="popup-bg-container"
                onClick={handleBackgroundClick} // Close both when clicking outside
            >
                <div
                    className="profile-popup-container"
                    onClick={handlePopupClick} // Prevent closing when clicking inside the popup
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
            </div>
        </div>
    );
}
