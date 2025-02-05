"use client";

import StatusPosts from "@/components/pages/PostStatus";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";

type Post = {
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
};

export default function Page() {
    const samplePosts: Post[] = [
        { name: "Alice", statusCount: 3, viewed: 3, notViewed: 0 },
        { name: "Bob", statusCount: 2, viewed: 1, notViewed: 1 },
        { name: "Charlie", statusCount: 50, viewed: 25, notViewed: 25 },
        { name: "David", statusCount: 1, viewed: 1, notViewed: 0 },
    ];

    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <StatusPosts posts={samplePosts} />
        </div>
    );
}
