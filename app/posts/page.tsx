"use client";

import StatusPosts from "@/components/pages/Posts/PostStatus";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import SwipeNavigator from "@/components/SwipeNavigator";
import { sampleMyPosts, samplePosts } from "@/types/data";

export default function Page() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <StatusPosts posts={samplePosts} myposts={[sampleMyPosts]} />
            <SwipeNavigator nextPage="/groups" prevPage="/chats" />
        </div>
    );
}
