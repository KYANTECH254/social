export default function LikeIcon({ liked = false, size = 24, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={liked ? "#ff0000" : color}>
            <path d="M12 21.638L11.172 20.809C6.732 16.594 4 13.97 4 10.5C4 7.634 6.21 5.5 9 5.5C10.656 5.5 12.242 6.324 13 7.5C13.758 6.324 15.344 5.5 17 5.5C19.79 5.5 22 7.634 22 10.5C22 13.97 19.268 16.594 14.828 20.809L14 21.638L12 21.638Z" />
        </svg>
    );
}
