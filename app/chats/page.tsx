import SwipeNavigator from "@/components/SwipeNavigator";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import ChatsComponent from "../../components/pages/ChatsComponent";

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