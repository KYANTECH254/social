import SocialFeed from "@/components/pages/Public/SocialFeed";
import ItemsNav from "../../components/ItemsNav/ItemsNav";
import TopNav from "../../components/TopNav/TopNav";

export default function Page() {
    return (
        <div className="chats-page-container">
            <TopNav />
            <ItemsNav />
            <SocialFeed />
        </div>
    )
}