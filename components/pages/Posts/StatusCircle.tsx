import { truncateWords } from "@/lib/Functions";
import { Post } from "@/types/types";

export default function StatusCircle({ viewed, notViewed, recentStatus }: Post) {
    const totalPosts = viewed + notViewed;
    const radius = 28;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const gap = 6;
    const status = Array.isArray(recentStatus) ? recentStatus[0] : recentStatus;

    return (
        <svg width="60" height="60" viewBox="0 0 60 60" className="relative">
            {totalPosts === 1 && (
                <circle
                    cx="30"
                    cy="30"
                    r={radius}
                    fill="none"
                    stroke={viewed ? "gray" : "#2563EB"}
                    strokeWidth={strokeWidth}
                />
            )}
            {totalPosts > 25 && (
                <circle
                    cx="30"
                    cy="30"
                    r={radius}
                    fill="none"
                    stroke={viewed > notViewed ? "gray" : "#2563EB"}
                    strokeWidth={strokeWidth}
                />
            )}
            {totalPosts <= 25 &&
                Array.from({ length: totalPosts }).map((_, index) => {
                    const segmentLength = (circumference / totalPosts) - gap;
                    const startAngle = (index * 360) / totalPosts - 90;
                    const isViewed = index < viewed;

                    return (
                        <circle
                            key={index}
                            cx="30"
                            cy="30"
                            r={radius}
                            fill="none"
                            stroke={isViewed ? "gray" : "#2563EB"}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                            transform={`rotate(${startAngle} 30 30)`}
                        />
                    );
                })}

            {status && (
                <>
                    {/* If the status is a text type, apply a background color */}
                    {status.type === "text" && status.bgColor && (
                        <>
                            <circle cx="30" cy="30" r="25" fill={status.bgColor} className="absolute" />
                            <foreignObject x="5" y="5" width="50" height="50">
                                <div className="flex flex-col items-center justify-center text-center h-full w-full text-white small-font font-medium overflow-hidden break-words line-clamp-3">
                                    {truncateWords(status.statusText, 5, 20)}
                                </div>
                            </foreignObject>
                        </>
                    )}

                    {/* Photo Option */}
                    {status.type === "image" && status.path && (
                        <>
                            <clipPath id="clipCircle">
                                <circle cx="30" cy="30" r="25" />
                            </clipPath>
                            <image
                                x="5"
                                y="5"
                                width="50"
                                height="50"
                                href={status.path}
                                clipPath="url(#clipCircle)"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </>
                    )}

                    {/* Video Option */}
                    {status.type === "video" && status.path && (
                        <foreignObject x="5" y="5" width="50" height="50">
                            <video
                                src={status.path}
                                className="w-full h-full object-cover rounded-full"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </foreignObject>
                    )}
                </>
            )}

        </svg>
    );
}
