"use client";

import { useRef } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import { GripHorizontal } from "lucide-react";

export default function BottomPopupModal({ isOpen, onClose, children, size = 0.5 }: any) {
    const ref = useRef<SheetRef>(null);

    return (
        <Sheet
            ref={ref}
            isOpen={isOpen}
            onClose={onClose}
            snapPoints={[600, window.innerHeight * size, 100, 0]}
            initialSnap={1}
        >
            <Sheet.Backdrop onTap={onClose} />

            <Sheet.Container>
                <Sheet.Content className="bg-[var(--main-background-color)] text-[var(--main-text-color)] shadow-lg">
                    <div className="flex justify-center py-2 cursor-pointer">
                        <GripHorizontal className="text-gray-400" />
                    </div>
                    <div className="overflow-y-auto">{children}</div>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
