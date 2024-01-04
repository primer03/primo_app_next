import dynamic from "next/dynamic";
export async function GET() {
    return {
        data: {
            name: "John Doe",
            email: "",
        }
    };
}