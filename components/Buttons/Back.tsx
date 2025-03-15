"use client"

import { ChevronLeft } from "lucide-react";
import { GoBack } from "@/lib/Functions";
export default function Back({ title }: any) {
  return (
    <button
      onClick={GoBack}
      className="gap-2 text-blue-500 mb-4 back-button flex items-center"
    >
      <ChevronLeft size={24}/>
      <div className="text-xl">{title}</div>
    </button>
  )
}