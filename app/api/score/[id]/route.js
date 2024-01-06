import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import ScoreModel from "@/lib/score";
export function GET(request, { params}) {
    const score = new ScoreModel();
    return NextResponse.json({id: params.id});
}
