"use client";
import { Download } from "lucide-react";
import { renderText } from "../Chat&GroupFunctions/Functions";

export default function DocumentTemplate({ file, fileSize, fileName, filetype, text }: any) {
    return (
        <>
            <div className='flex flex-col gap-1 mt-1'>
                <div className="flex flex-row justify-between items-center w-full h-14 rounded-md bg-black/30 p-2">
                    <div className="flex items-center justify-center h-10 w-8 bg-black/20 rounded-sm text-xs p-2 font-bold">
                        {filetype}
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-sm max-w-40 truncate">{fileName}</div>
                        <div className="text-xs">{fileSize}</div>
                    </div>
                    <a
                        href={`${window.location.origin}/${file}`}
                        download
                        className="px-4 py-2 text-white rounded-md text-center"
                    >
                        <Download size={24} />
                    </a>
                </div>
                <div className="flex flex-col">{renderText(text)}</div>
            </div>
        </>
    )
}