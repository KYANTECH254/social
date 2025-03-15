"use client";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import SwipeNavigator from "@/components/SwipeNavigator";
// import { sampleMyPosts } from "@/types/data";
// import MyStatusPosts from "@/components/pages/Posts/MyPostStatus";

export default function Page() {
  
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            {/* <MyStatusPosts posts={[sampleMyPosts]} /> */}
            <SwipeNavigator nextPage="/my-posts" prevPage="/posts" />
        </div>
    );
}
