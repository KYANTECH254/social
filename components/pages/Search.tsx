"use client";
import { useState } from "react";
import { Search, X, ArrowLeft, Settings } from "lucide-react";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([
        "OpenAI",
        "React 2025",
        "Next.js 14",
        "JavaScript Trends",
    ]);

    const trendingTopics = [
        { title: "#AIRevolution", posts: "120K Posts" },
        { title: "Next.js 14", posts: "85K Posts" },
        { title: "OpenAI GPT-5", posts: "200K Posts" },
        { title: "Web3 Future", posts: "50K Posts" },
        { title: "SpaceX Launch", posts: "95K Posts" },
    ];

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="w-full h-screen bg-[var(--main-background-color)] text-[var(--main-text-color)] flex flex-col">
            {/* Search Bar */}
            <div className="flex items-center p-3 border-b border-gray-700">
                <button className="p-2" onClick={() => window.history.back()}>
                    <ArrowLeft size={20} color="var(--main-text-color)" />
                </button>
                <div className="flex flex-grow mx-2 bg-gray-300 dark:bg-gray-800 rounded-full px-4 py-2 items-center">
                    <Search size={18} color="gray" />
                    <input
                        type="text"
                        placeholder="Search something..."
                        className="bg-transparent flex-grow outline-none px-2 text-[var(--main-text-color)]"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {searchQuery && (
                        <button onClick={clearSearch}>
                            <X size={18} color="gray" />
                        </button>
                    )}
                </div>
                <Settings size={20} color="var(--main-text-color)" />
            </div>

            {/* Recent Searches */}
            <div className="p-4">
                <h2 className="text-lg font-semibold dark:text-gray-300 text-[var(--main-text-color)]">Recent Searches</h2>
                {recentSearches.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-2">No recent searches</p>
                ) : (
                    <ul className="mt-2">
                        {recentSearches.map((search, index) => (
                            <li key={index} className="flex items-center justify-between py-2 border-b border-gray-800">
                                <span>{search}</span>
                                <button onClick={() => setRecentSearches(recentSearches.filter((_, i) => i !== index))}>
                                    <X size={16} color="gray" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Trending Topics */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-[var(--main-text-color)] dark:text-gray-300 ">Trending</h2>
                <ul className="mt-2">
                    {trendingTopics.map((topic, index) => (
                        <li key={index} className="py-3 border-b border-gray-800 cursor-pointer">
                            <p className="font-semibold">{topic.title}</p>
                            <p className="text-gray-500 text-sm">{topic.posts}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
