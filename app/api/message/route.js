import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import MessageModel from "@/lib/messageData";
export async function GET(request) {
    const messagex = new MessageModel();
    await messagex.initClient();
    await messagex.createMessageTable();
    // await messagex.dropTable();
    return NextResponse.json({ message: "Message created successfullyx" });
}

export async function POST(request) {
    const formData = await request.formData();
    const generation = formData.get("generation");
    const type = formData.get("type");
    const url = formData.get("url");
    const folder = formData.get("folder");
    const public_id = formData.get("public_id");
    const width = parseInt(formData.get("width"));
    const height = parseInt(formData.get("height"));
    // return NextResponse.json({ status: "success", message: "Message created successfully",data: {generation: generation, type: type, url: url, folder: folder, public_id: public_id, width: width, height: height} });
    const messagex = new MessageModel();
    await messagex.initClient();
    const checkinsert = await messagex.insertMessage(generation, type, url, folder, public_id, width, height);
    if (checkinsert) {
        return NextResponse.json({status: "success", message: "Message created successfully" });
    }else{
        return NextResponse.json({status: "error", message: "Message created error" });
    }
    
}