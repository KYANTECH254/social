import TopNav from "@/components/TopNav/TopNav";
import Back from "@/components/Buttons/Back";
import Profile from "@/components/pages/Profile";

export default function Page() {

    return (
        <>
            <TopNav />
            <div className="first-container">
                <Back title="Profile" />
                <Profile />
            </div>
        </>
    );
}
