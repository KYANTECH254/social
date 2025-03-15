import SwipeNavigator from "@/components/SwipeNavigator";
import FloatingIcons from "@/components/FloatingIcons";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";
import GroupsComponent from "@/components/pages/Groups/GroupsComponent";

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
