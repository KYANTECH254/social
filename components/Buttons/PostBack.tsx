"use client"

import { ArrowLeft } from "lucide-react";
import { GoBack } from "@/lib/Functions";
export default function PostBack () {
    return (
        <button
        onClick={GoBack}
        className="flex items-center gap-2 text-blue-500 mb-4 post-back-button"
      >
        <ArrowLeft size={20} /> Post
      </button>
    )
}