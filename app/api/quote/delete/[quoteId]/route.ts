import { NextRequest } from "next/server";
import Quote from "@/models/quote";
import { connectToDb } from "@/utils/db";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDb();
        const quoteId: string = req.url.split("/")[req.url.split("/").length - 1];
        await Quote.findByIdAndDelete(quoteId);
        return new Response(JSON.stringify({
            message: `Quote with id: ${quoteId} was deleted successfully`
        }), {
            status: 200
        });
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({
            message: error.message
        }), {
            status: 500
        })
    }
};

