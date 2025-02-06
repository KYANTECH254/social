"use client";

import ItemsNav from "@/components/ItemsNav/ItemsNav";
import BottomPopupModal from "@/components/PopUps/BottomPopupModal/BottomPopupModal";
import TopNav from "@/components/TopNav/TopNav";
import { useState } from "react";

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main>
            <TopNav />
            <ItemsNav />
            <div className="container">
                <BottomPopupModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <p className="text-black">
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        Your content here
                        </p>
                </BottomPopupModal>

                <button onClick={() => setIsOpen(true)}>Open Modal</button>

            </div>

        </main>
    );
}