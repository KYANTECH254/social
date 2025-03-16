import GoogleCallback from "@/components/auth/GoogleCallBack";
import { Suspense } from "react";

export default function Page() {
    return (
        <>
            <Suspense >
                <GoogleCallback />
            </Suspense>
        </>
    )
}
