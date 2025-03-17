import Logout from "@/components/Settings/Logout";
import TopNav from "@/components/TopNav/TopNav";

export default function page() {
    return (
        <>
            <TopNav />
            <div className="first-container">
                <Logout />
            </div>
        </>
    )
}