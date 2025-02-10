// export default function StatusCircle({ viewed, notViewed }: any) {
//     const count = viewed + notViewed;
//     const radius = 28;
//     const strokeWidth = 3;
//     const circumference = 2 * Math.PI * radius;
//     const gapSize = 4;
//     const segmentLength = (circumference - count * gapSize) / count;

//     return (
//         <svg width="60" height="60" viewBox="0 0 60 60" className="relative">
//             {count === 1 ? (
//                 <circle
//                     cx="30"
//                     cy="30"
//                     r={radius}
//                     fill="none"
//                     stroke={viewed ? "gray" : "#2563EB"}
//                     strokeWidth={strokeWidth}
//                 />
//             ) : (
//                 [...Array(count)].map((_, i) => {
//                     const startAngle = (i * 360) / count;
//                     const isViewed = i < viewed;
//                     const strokeColor = isViewed ? "gray" : "#2563EB";

//                     return (
//                         <circle
//                             key={i}
//                             cx="30"
//                             cy="30"
//                             r={radius}
//                             fill="none"
//                             stroke={strokeColor}
//                             strokeWidth={strokeWidth}
//                             strokeDasharray={`${segmentLength} ${gapSize}`}
//                             strokeDashoffset={circumference - i * (segmentLength + gapSize)}
//                             transform={`rotate(-90 30 30) rotate(${startAngle} 30 30)`}
//                         />
//                     );
//                 })
//             )}
//             <circle cx="30" cy="30" r="22" fill="white" />
//         </svg>
//     );
// }

export default function StatusCircle({ viewed, notViewed, index }: { viewed: number; notViewed: number; index: number }) {
    const totalPosts = viewed + notViewed;
    const radius = 28;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const gap = 4; // Define the gap size
    const segmentLength = circumference / totalPosts;
    const dashLength = segmentLength - gap; // Reduce segment length by the gap

    const startAngle = (index * 360) / totalPosts;
    const isViewed = index < viewed;
    const strokeColor = isViewed ? "gray" : "#2563EB";

    return (
        <svg width="60" height="60" viewBox="0 0 60 60" className="absolute">
            <circle
                cx="30"
                cy="30"
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${circumference - dashLength}`} // Apply adjusted dash and gap
                strokeDashoffset={circumference - dashLength} // Update offset for correct positioning
                transform={`rotate(-90 30 30) rotate(${startAngle} 30 30)`}
            />
        </svg>
    );
}
