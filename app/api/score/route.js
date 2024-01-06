import ScoreModel from "@/lib/score";
import { NextResponse } from "next/server";

export async function GET(request) {
    const score = new ScoreModel();
    await score.initClient();
    const scores = await score.createScoreTable();
    // await score.dropTable();
    return NextResponse.json(scores);
}

export async function POST(request) {
    const formData = await request.formData();
    const id = formData.get("id");
    const score = formData.get("score");
    const scorex = new ScoreModel();
    await scorex.initClient();
    let check = await scorex.updateScore(id, score);
    if(check.status == "success"){
        return NextResponse.json({ message: "Score updated successfully" });
    }
    
}