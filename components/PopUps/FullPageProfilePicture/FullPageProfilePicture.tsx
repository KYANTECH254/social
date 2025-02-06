import { ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./main.css";

export default function FullPageProfilePicture({ contact, onClose }: any) {
    const [zoomed, setZoomed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const startYRef = useRef<number | null>(null);

    const [springStyle, api] = useSpring(() => ({
        y: 0,
        opacity: 1,
        config: { tension: 200, friction: 25 },
    }));

    const toggleZoom = (e:any) => {
        setZoomed(!zoomed);
        e.stopPropagation()
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        startYRef.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!startYRef.current) return;

        const deltaY = e.touches[0].clientY - startYRef.current;
        api.start({ y: deltaY * 0.8 }); 
    };

    const handleTouchEnd = () => {
        if (!startYRef.current) return;

        const finalY = springStyle.y.get();
        setIsDragging(false);

        if (Math.abs(finalY) > 100) {
            api.start({ y: finalY > 0 ? 300 : -300, opacity: 0, onRest: onClose });
        } else {
            api.start({ y: 0 });
        }
        startYRef.current = null;
    };

    return (
        <animated.div
            className="full-page-popup-container"
            style={springStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e:any) => e.stopPropagation()}
        >
            <div className="full-page-popup-header">
                <button className="page-back-button" onClick={onClose}>
                    <ArrowLeft size={24} />
                    <span className="profile-name">Profile</span>
                </button>
            </div>

            {/* Centered image container */}
            <div className="full-page-image-container">
                <div
                    className={`image-wrapper ${zoomed ? "zoomed" : ""}`}
                    onClick={toggleZoom}
                >
                    <img src="/assets/images/pic.jpeg" className="profile-image" />
                </div>
            </div>
        </animated.div>
    );
}
