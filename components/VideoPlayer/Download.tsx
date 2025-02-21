import { Download } from "lucide-react";

export default function DownloadBtn({ handleDownload }: any) {
    return (
        <>
            <button
                onClick={handleDownload}
                className="text-white hover:text-blue-600 transition-colors"
            >
                <Download size={24} />
            </button>
        </>
    )
}