"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import RoundRadio from "../Buttons/RoundRadio";

const sortOptions = ["Popular", "Newest", "Oldest"];

interface SortCommentsProps {
    selectedSort: string;
    setSelectedSort: Dispatch<SetStateAction<"Popular" | "Newest" | "Oldest">>;
}

export default function SortComments({ selectedSort, setSelectedSort }: SortCommentsProps) {
    const [sort, setSort] = useState(false);

    return (
        <div className="flex flex-col">
            <div
                onClick={() => setSort(!sort)}
                className="flex flex-row justify-between p-2 cursor-pointer"
            >
                <h3 className="text-lg">Sort Comments</h3>
                {sort ? <ChevronUp /> : <ChevronDown />}
            </div>

            <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${sort ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col gap-4 p-2">
                    {sortOptions.map((option: any) => (
                        <div key={option} className="flex flex-row items-center justify-between">
                            <label htmlFor={option} className="text-sm">{option}</label>
                            <RoundRadio
                                name="sort-comments"
                                value={option}
                                checked={selectedSort === option}
                                color="blue-500"
                                onChange={() => setSelectedSort(option)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
