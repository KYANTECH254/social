import SearchPage from "@/components/pages/Search";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
    return (
        <><TopNav />
            <div className="first-container">  
                <SearchPage />
            </div>
        </>
    )
}