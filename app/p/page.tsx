import CommentSection from "@/components/CommentSection/CommentSection";
import PublicTopPost from "@/components/pages/PublicTopPost";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
    return (
        <>
            <main>
                <TopNav />
                <PublicTopPost />
                <CommentSection />
            </main>
        </>
    )
}