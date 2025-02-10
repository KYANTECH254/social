import StatusCircle from "../Buttons/StatusCircle";

const statuses = [
    { viewed: 1, notViewed: 1 }, // 5 posts in total
    { viewed: 4, notViewed: 1 }, // 5 posts in total
    { viewed: 1, notViewed: 4 }, // 5 posts in total
];

export default function StatusList() {
    return (
        <div className="flex gap-4">
            {statuses.map((status, statusIndex) => {
                const totalPosts = status.viewed + status.notViewed;

                return (
                    <div key={statusIndex} className="relative w-[60px] h-[60px]">
                        {/* Loop through each post and create a segment */}
                        {[...Array(totalPosts)].map((_, i) => (
                            <StatusCircle
                                key={i}
                                viewed={status.viewed}
                                notViewed={status.notViewed}
                                index={i}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}