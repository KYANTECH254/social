import DownloadApp from "@/components/Settings/DownloadApp";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
    return (
        <>
            <TopNav />
            <div className="first-container">
                <DownloadApp />
            </div>
            
        </>
    );
}
