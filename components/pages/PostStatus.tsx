import StatusCircle from "../Buttons/StatusCircle";
import StatusList from "./StatusList";

type Post = {
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
};

interface StatusPostsProps {
    posts: Post[];
}

export default function StatusPosts({ posts }: StatusPostsProps) {
    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            {posts.map((post, index) => (
                <div key={index} className="flex items-center gap-4">
                    {/* <StatusCircle count={post.statusCount} viewed={post.viewed} notViewed={post.notViewed} /> */}
                    <StatusList />
                    <span className="text-lg font-medium">{post.name}</span>
                </div>
            ))}
        </div>
    );
}
