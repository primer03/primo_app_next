import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.json({ hello: "world" });
}