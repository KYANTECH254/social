import GroupsComponent from "@/components/pages/GroupsComponent";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";
import SwipeNavigator from "@/components/SwipeNavigator";


export default function Chats() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <GroupsComponent />
            <SwipeNavigator nextPage="/groups" prevPage="/posts" />
        </div>
    )
}