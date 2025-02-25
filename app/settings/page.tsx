import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";
import SettingsContainer from "@/components/pages/Settings";

export default function Page() {
    return (
        <>
            <TopNav />
            <ItemsNav />

            <SettingsContainer />

        </>
    );
}
