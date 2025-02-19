export default function speedOptionsBtn({ playbackSpeed, setPlaybackSpeed, speedOptions }: any) {
    return (
        <>
            <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-black/50 text-white px-2 py-1 rounded"
                onClick={(e) => e.stopPropagation()}
            >
                {speedOptions.map((speed: any) => (
                    <option key={speed} value={speed}>
                        {speed}x
                    </option>
                ))}
            </select>
        </>
    )
}