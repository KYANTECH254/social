"use client";

export default function Textarea({
    value,
    onChange,
    placeholder = "Enter your message",
    rows = 4,
    className = "",
    ...props
}: any) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className={`text-lg tracking-widest py-2 border-2 rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)] p-2 focus:outline-none focus:border-blue-500 ${className}`}
            {...props}
        />
    );
}