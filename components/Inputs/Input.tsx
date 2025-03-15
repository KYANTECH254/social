"use client";

export default function Input({
    value,
    onChange,
    placeholder = "Enter text",
    type = "text",
    maxLength = 64,
    className = "",
    ...props
}: any) {
    return (
            <input
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`p-2 py-2 border-2 rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)] focus:outline-none focus:border-blue-500 ${className}`}
                {...props}
            />
    );
}