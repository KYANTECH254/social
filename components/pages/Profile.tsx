"use client"
import { Camera, Pen, Check } from "lucide-react"
import { useState } from "react";

export default function Profile() {
    const [username, setUsername] = useState("john_doe");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState("/assets/images/profile-bg.png");

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };
    return (
        <>
            {/* Profile Image Section */}
            <div className="display-center">
                <div className="relative mt-6 profile-img-container">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover profile-img default-color"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                    />
                    <button className="absolute right-2 bottom-2 default-bg p-2 rounded-full shadow-md">
                        <Camera size={18} />
                    </button>
                </div>
            </div>
            {/* User Info Section */}
            <div className="mt-6 w-full user-info-container">
                <div className="flex flex-col justify-between profile-cards">
                    <span className="profile-left-text font-medium">Name</span>
                    <span className="">John Doe</span>
                </div>
                <div className="flex flex-col justify-between profile-cards">
                    <span className="profile-left-text font-medium">Email</span>
                    <span className="">johndoe@example.com</span>
                </div>
                <div className="flex flex-row justify-between profile-cards">
                    <div className="flex flex-col">
                        <span className="profile-left-text font-medium">Username</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={username}
                                placeholder="Enter your @username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="outline-none profile-input"
                            />
                        ) : (
                            <span className="">@{username}</span>
                        )}
                    </div>
                    <button onClick={() => setIsEditing(!isEditing)} className="ml-2">
                        {!isEditing ? (
                            <Pen size={30} className="default-color default-hover-bg" />
                        ) : (
                            <Check size={30} className="default-color default-hover-bg" />
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}