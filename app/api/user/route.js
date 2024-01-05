import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import UserModel from "@/lib/User";
export async function GET(request) {
    const user = new UserModel();
    await user.initClient();
    const users = await user.dropTable();
    return NextResponse.json(users);
    //how to use search
    //api/user?search=hello
}

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const user = new UserModel();
    await user.initClient();
    await user.insertUser(name, email);
    if (user) {
        return NextResponse.json({ message: "User created successfully" });
    }
}