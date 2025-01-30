import GroupsComponent from "@/components/pages/GroupsComponent";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";


export default function Chats() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <GroupsComponent />
        </div>
    )
}