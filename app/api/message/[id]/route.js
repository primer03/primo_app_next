import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import MessageModel from "@/lib/messageData";

export async function GET(request,{params}) {
    const publicId = params.id;
    const messagex = new MessageModel();
    await messagex.initClient();
    const message = await messagex.check_public_id(publicId);
    if(message.status == "success"){
        await messagex.update_active(publicId);
        return NextResponse.json({status: "success", message: message.message, data: message.data });
    }else{
        return NextResponse.json({status: "error", message: message.message });
    }
} 