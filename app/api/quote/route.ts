import { connectToDb } from "@/utils/db";
import Quote from "@/models/quote";

export const GET = async (request: Request) => {
    try {
        await connectToDb();
        const quotes = await Quote.find({}).populate('creator').limit(10);

        const response= new Response(JSON.stringify(quotes), {
            status: 200, 
        });
        return response;
    } catch (error) {
        return new Response("Could not fetch quotes", {
            status: 500
        })
    }
}