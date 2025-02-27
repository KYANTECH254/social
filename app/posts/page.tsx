"use client";

// import StatusPosts from "@/components/pages/PostStatus";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import SwipeNavigator from "@/components/SwipeNavigator";
// import { Post } from "@/types/types";
// import { samplePosts } from "@/types/data";

export default function Page() {
  
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            {/* <StatusPosts posts={samplePosts} /> */}
            <SwipeNavigator nextPage="/groups" prevPage="/chats" />
        </div>
    );
}
