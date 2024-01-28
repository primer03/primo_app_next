import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import MessageModel from "@/lib/messageData";
export async function GET(request) {
    const messagex = new MessageModel();
    await messagex.initClient();
    const countVideo = await messagex.getCountvideos();
    const countImage = await messagex.getCountimages();
    const countTatal = (parseInt(countVideo) + parseInt(countImage)).toString();
    // await messagex.dropTable();
    return NextResponse.json({status: "success", video: countVideo, image: countImage, total: countTatal});
}