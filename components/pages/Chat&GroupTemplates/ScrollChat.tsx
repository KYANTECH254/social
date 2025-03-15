"use client"
import { ChevronsUp, ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollChat({ ContainerRef }: any) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showScrollBottom, setShowScrollBottom] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const container = ContainerRef.current;

        const handleScroll = () => {
            if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container;
                setShowScrollTop(scrollTop > 100);
                setShowScrollBottom(scrollHeight - (scrollTop + clientHeight) > 100);
            }
        };

        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        const container = ContainerRef.current;
        let scrollTimeout: NodeJS.Timeout;

        const detectScroll = () => {
            if (container) {
                setIsScrolling(true);
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    setIsScrolling(false);
                }, 1500);
            }
        };
        container?.addEventListener("scroll", detectScroll);
        return () => {
            container?.removeEventListener("scroll", detectScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    const scrollToBottom = () => {
        if (ContainerRef.current) {
            ContainerRef.current.scrollTo({
                top: ContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        if (ContainerRef.current) {
            ContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    return (
        <>
            {isScrolling && (
                <div className="absolute right-4 bottom-24 space-y-2 z-10">
                    {showScrollTop && (
                        <button
                            onClick={scrollToTop}
                            className={`w-10 h-10 bg-[var(--main-color)] rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--main-hover-color)] 
                            transition-opacity duration-300 ${showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            <ChevronsUp className="text-white" size={20} />
                        </button>
                    )}
                    {showScrollBottom && (
                        <button
                            onClick={scrollToBottom}
                            className={`w-10 h-10 bg-[var(--main-color)] rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--main-hover-color)] 
                            transition-opacity duration-300 ${showScrollBottom ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            <ChevronsDown className="text-white" size={20} />
                        </button>
                    )}
                </div>

            )}
        </>
    )
}