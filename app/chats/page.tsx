import ItemsNav from "@/components/ItemsNav/ItemsNav";
import ChatsComponent from "@/components/pages/Chats/ChatsComponent";
import SwipeNavigator from "@/components/SwipeNavigator";
import TopNav from "@/components/TopNav/TopNav";

export default function Chats() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <ChatsComponent />
            <SwipeNavigator nextPage="/posts" prevPage="/" />
        </div>
    )
}