import Quote from "@/models/quote";
import { connectToDb } from '@/utils/db'
export async function GET(request: Request) {
    let quoteId = request.url.split("/")[request.url.split("/").length - 1];
    try {
        await connectToDb();
        const quote = await Quote.findById(quoteId).populate('creator');
        if (quote.length === 0) {
            return new Response(JSON.stringify({
                message: "No quotes are made by this user"
            }), {
                status: 404
            })
        }
        return new Response(JSON.stringify(quote), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Could not fetch quote", {
            status: 500
        });
    }
};

export async function PATCH(request: Request) {
    let quoteId = request.url.split("/")[request.url.split("/").length - 1];
    try {
        await connectToDb();
        const body = await request.json();
        const { quote, author, tag } = body;

        const updatedQuote = await Quote.findByIdAndUpdate(quoteId, {
            quote, 
            author, 
            tag
        });

        return new Response(JSON.stringify(updatedQuote), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Could not update quote", {
          status: 500,
        });
    }
}
