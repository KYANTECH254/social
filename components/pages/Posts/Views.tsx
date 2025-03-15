"use client"
import { viewers } from "@/types/data"

export default function Views() {
    return (
        <>
            <div className="flex flex-col">
                <h1 className="flex justify-center items-center P-2 text-xl">{viewers.length === 1 ? `${viewers.length} viewer` : `${viewers.length} viewers`}</h1>

                <div className="flex flex-col gap-2 overflow-y-auto p-2">
                    {viewers.map((contact) => (
                        <label
                            key={contact.id}
                            className="flex items-center justify-between mt-2 mb-2 last:border-none cursor-pointer"
                        >
                            <div className="flex flex-row items-center">
                                <img
                                    src="../../assets/images/profile-bg.png"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                                />
                                <span>{contact.name}</span>
                            </div>
                            <div className="text-xs font-semibold">{contact.time}</div>
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}