"use client"

import { ArrowLeft } from "lucide-react";
import { GoBack } from "@/lib/Functions";
export default function Back () {
    return (
        <button
        onClick={GoBack}
        className="gap-2 text-blue-500 mb-4 back-button"
      >
        <ArrowLeft size={20} /> Back
      </button>
    )
}