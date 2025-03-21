import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { regToken, user } = await req.json();

    const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
    const secure = isProduction;

    const cookieOptions = {
        httpOnly: true,
        secure,
        path: "/",
    };

    const cookieStore = await cookies();
    cookieStore.set("regToken", regToken, cookieOptions);
    cookieStore.set("user", JSON.stringify(user), {
        secure,
        path: "/",
    });

    return NextResponse.json({ success: true });
}

export async function GET() {
    const cookieStore = await cookies();
    const regToken = cookieStore.get("regToken")?.value;
    const userCookie = cookieStore.get("user")?.value;

    if (!regToken || !userCookie) {
        return NextResponse.json({ session: null });
    }

    try {
        const user = JSON.parse(userCookie);
        return NextResponse.json({ success: true, session: { regToken, user } });
    } catch {
        return NextResponse.json({ success: false, session: null });
    }
}
