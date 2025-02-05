export default function StatusCircle({ count, viewed, notViewed }: any) {
    const radius = 28; // Circle radius
    const strokeWidth = 3; // Stroke width
    const circumference = 2 * Math.PI * radius;
    const gapSize = 4;
    const segmentLength = (circumference - count * gapSize) / count;

    return (
        <svg width="60" height="60" viewBox="0 0 60 60" className="relative">
            {count === 1 ? (
                <circle
                    cx="30"
                    cy="30"
                    r={radius}
                    fill="none"
                    stroke={viewed ? "gray" : "#2563EB"}
                    strokeWidth={strokeWidth}
                />
            ) : (
                [...Array(count)].map((_, i) => {
                    const startAngle = (i * 360) / count;
                    // Determine if the current segment is viewed or not
                    const isViewed = i < viewed;
                    const strokeColor = isViewed ? "gray" : "#2563EB";

                    return (
                        <circle
                            key={i}
                            cx="30"
                            cy="30"
                            r={radius}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${segmentLength} ${gapSize}`}
                            strokeDashoffset={circumference - i * (segmentLength + gapSize)}
                            transform={`rotate(-90 ${30} ${30}) rotate(${startAngle} 30 30)`}
                        />
                    );
                })
            )}
            <circle cx="30" cy="30" r="22" fill="white" />
        </svg>
    );
}