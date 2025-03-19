"use server"
import { cookies } from "next/headers";

export async function setCookies(cookiedata: any) {
    const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
    const secure = isProduction;
    const { name, token } = cookiedata;
    if (!cookiedata) return;
    const cookieOptions = {
        httpOnly: true,
        secure,
        path: "/",
    };
    const cookieStore = await cookies();
    cookieStore.set(name, token, cookieOptions);
    return { success: true, message: "Cookie set" }
}

export async function deleteCookies(cookiedata: any) {
    const { name } = cookiedata;
    if (!cookiedata) return;
    const cookieStore = await cookies();
    cookieStore.delete(name);
    return { success: true, message: "Cookie deleted" }
}
