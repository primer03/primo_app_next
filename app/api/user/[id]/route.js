import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
export function GET(request,{params}) {
  return NextResponse.json({ message: `Hello ${params.id}` });
}