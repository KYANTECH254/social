"use client";

import { Check } from "lucide-react";

interface RoundCheckboxProps {
    name: string;
    value: string;
    checked: boolean;
    color: string;
    onChange: () => void;
}

export default function RoundCheckbox({ name, value, checked, color, onChange }: RoundCheckboxProps) {
    return (
        <label className="relative flex items-center justify-center w-6 h-6">
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`appearance-none w-6 h-6 border-2 border-${color} rounded-full checked:bg-${color} relative`}
            />
            {checked && (
                <Check className={`absolute w-4 h-4 text-white`} size={12} />
            )}
        </label>
    );
}
