export default function SmallPopUpModal({ children, isOpen, onClose }: any) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-[var(--main-background-color)] text-[var(--main-text-color)] p-6 shadow-lg max-w-lg w-full mr-5 ml-5"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};