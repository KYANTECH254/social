"use client"

import { Download } from "lucide-react"
import { renderText } from "../Chat&GroupFunctions/Functions"

export default function ImageTemplate({ file, fileSize, fileName, filetype, text }: any) {
    return (
        <>
            <div className='flex flex-col gap-1 mt-1'>
                <img src={`${window.location.origin}/${file}`} alt="Image" className="w-full h-full max-h-60 object-cover rounded-md" />

                <div className="flex flex-row gap-1 items-center justify-end">
                    <div className="text-xs mr-2">{fileSize}</div>
                    <a
                        href={`${window.location.origin}/${file}`}
                        download
                        className="text-white rounded-md text-center"
                    >
                        <Download size={20} />
                    </a>
                </div>
                <div className="flex flex-col">{renderText(text)}</div>
            </div>
        </>
    )
}