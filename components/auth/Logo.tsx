"use client"

export default function Logo() {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[var(--main-text-color)] tracking-wide">
                <span className="bg-[var(--main-color)] text-transparent bg-clip-text">
                    MyLogo
                </span>
            </h1>
        </div>
    );
}