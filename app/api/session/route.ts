import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { accessToken, refreshToken, user } = await req.json();

    const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
    const secure = isProduction;

    const cookieOptions = {
        httpOnly: true,
        secure,
        path: "/",
    };

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, cookieOptions);
    cookieStore.set("refreshToken", refreshToken, cookieOptions);
    cookieStore.set("user", JSON.stringify(user), {
        secure,
        path: "/",
    });

    return NextResponse.json({ success: true });
}

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const userCookie = cookieStore.get("user")?.value;

    if (!accessToken || !refreshToken || !userCookie) {
        return NextResponse.json({ session: null });
    }

    try {
        const user = JSON.parse(userCookie);
        return NextResponse.json({ session: { accessToken, refreshToken, user } });
    } catch {
        return NextResponse.json({ session: null });
    }
}
