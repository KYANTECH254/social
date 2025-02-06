"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, useAnimation } from "framer-motion";

export default function SwipeNavigator({ nextPage, prevPage }: { nextPage: string; prevPage: string }) {
    const router = useRouter();
    const controls = useAnimation();

    const bind = useDrag(({ swipe: [swipeX] }) => {
        if (swipeX === 1) {
            controls.start({ x: 300, opacity: 0 }).then(() => router.push(nextPage)); // Swipe Right → Next Page
            console.log("Swiping Right...")
        } else if (swipeX === -1) {
            controls.start({ x: -300, opacity: 0 }).then(() => router.push(prevPage)); // Swipe Left → Previous Page
        }
    });

    useEffect(() => {
        controls.start({ x: 0, opacity: 1 }); // Reset animation on page load
    }, [controls]);

    return (
        <motion.div
            onPointerDown={bind().onPointerDown} // Bind drag events manually
            onPointerMove={bind().onPointerMove}
            onPointerUp={bind().onPointerUp}
            animate={controls}
            className="fixed inset-0 w-full h-full"
        />
    );
}
