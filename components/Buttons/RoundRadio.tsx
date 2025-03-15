"use client";

import { Check } from "lucide-react";

interface RoundRadioProps {
    name: string;
    value: string;
    checked: boolean;
    color: string;
    onChange: () => void;
}

export default function RoundRadio({ name, value, checked, color, onChange }: RoundRadioProps) {
    return (
        <label className="relative flex items-center justify-center w-6 h-6">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`appearance-none w-6 h-6 border-2 border-${color} rounded-full checked:bg-${color} relative`}
            />
            {checked && (
                <Check className={`absolute w-full h-full bg-${color} rounded-full font-semibold`} size={10} />
            )}
        </label>
    );
}
