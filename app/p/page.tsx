import CommentSection from "@/components/CommentSection";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import PublicTopPost from "@/components/pages/PublicTopPost";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
    return (
        <>
            <main>
                <TopNav />
                {/* <ItemsNav /> */}
                <PublicTopPost />
                <CommentSection />
            </main>
        </>
    )
}