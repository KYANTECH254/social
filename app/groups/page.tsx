"use client"
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import SwipeNavigator from "@/components/SwipeNavigator";
import FloatingIcons from "@/components/FloatingIcons";
import dynamic from 'next/dynamic';

const GroupsComponent = dynamic(() => import('@/components/pages/GroupsComponent'), { ssr: false });

export default function Chats() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <GroupsComponent />
            <FloatingIcons />
            <SwipeNavigator nextPage="/groups" prevPage="/posts" />
        </div>
    )
}
