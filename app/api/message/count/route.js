import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import MessageModel from "@/lib/messageData";
export async function GET(request) {
    const messagex = new MessageModel();
    await messagex.initClient();
    const count = await messagex.countMessages();
    // await messagex.dropTable();
    return NextResponse.json({status: "success", message: "success",data: count });
}