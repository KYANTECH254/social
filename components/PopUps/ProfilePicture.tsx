import { MessageCircle } from "lucide-react";
import { Info } from "lucide-react";

export default function ProfilePicture({ contact, onClose }: any) {
    return (
        <div 
        className="popup-bg-container" 
         onClick={onClose}
         >
            <div className="profile-popup-container">
                <div className="profile-popup-header">
                    <span className="profile-popup-header-text">Profile Picture</span>
                </div>
                <div className="profile-popup-body">
                    <img
                        src="/assets/images/pic.jpeg"
                        // alt={`${contact.name}'s profile`}
                        className="profile-pic-img"
                        // onClick={() => setViewProfile(true)}
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
    )
}