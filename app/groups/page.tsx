import SwipeNavigator from "@/components/SwipeNavigator";
import FloatingIcons from "@/components/FloatingIcons";
import GroupsComponent from "@/components/pages/GroupsComponent";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
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
