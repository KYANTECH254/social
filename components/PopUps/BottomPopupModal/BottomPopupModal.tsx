"use client";

import { useState, useEffect, useRef } from "react";
import { GripHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomPopupModal({ isOpen, onClose, children }: any) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [maxDrag, setMaxDrag] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (modalRef.current) {
                const modalHeight = modalRef.current.offsetHeight;
                setMaxDrag(window.innerHeight - modalHeight); // Ensure top remains visible
            }
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-end bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        className="w-full max-w-md rounded-t-2xl shadow-lg p-4 container-bg max-h-[90vh] flex flex-col"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        drag="y"
                        dragConstraints={{ top: maxDrag, bottom: 0 }}
                        dragElastic={0.3}
                        onDragEnd={(event, info) => {
                            if (info.point.y > window.innerHeight * 0.75) {
                                onClose();
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with Drag Handle */}
                        <div className="flex justify-center py-2 cursor-pointer">
                            <GripHorizontal className="text-gray-400" />
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-40px)]">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
