import SwipeNavigator from "@/components/SwipeNavigator";
import TopNav from "../../components/TopNav/TopNav";
import CreateGroup from "@/components/pages/Groups/CreateGroup";

export default function Chats() {
    return (
        <>
            <TopNav />
            <CreateGroup />
            <SwipeNavigator nextPage="/groups" prevPage="/groups" />
        </>
    )
}