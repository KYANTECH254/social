"use client";
import Back from "@/components/Buttons/Back";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ContactSupport from "./ContactSupport";
import { useState } from "react";

export default function Help() {
    const [support, setSupport] = useState(false)
    return (
        <>
            <div className="first-container">
                {!support && (
                    <>
                        <Back title="Help" />
                        <div className="flex flex-col">
                            <div
                            onClick={() => setSupport(true)}
                             className="flex flex-row justify-between items-center p-4 settings-cards">
                                <h2 className="text-lg">Contact Support</h2>
                                <ArrowRight size={24} />
                            </div>

                            <Link href="/settings/help/usage">
                                <div className="flex flex-row justify-between items-center p-4 settings-cards">
                                    <h2 className="text-lg">Usage Information</h2>
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                            <Link href="/terms">
                                <div className="flex flex-row justify-between items-center p-4 settings-cards">
                                    <h2 className="text-lg">Terms & Conditions</h2>
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                            <Link href="/privacy-policy">
                                <div className="flex flex-row justify-between items-center p-4 settings-cards">
                                    <h2 className="text-lg">Privacy Policy</h2>
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                        </div>
                    </>
                )}
                {support && (<ContactSupport />)}
            </div>
        </>
    )
}