import { connectToDb } from "@/utils/db";
import Quote from "@/models/quote";

export const GET = async (request: Request) => {
    try {
        await connectToDb();
        const searchTerm = request.url.split('?')[1]?.split("=")[1];
        console.log(searchTerm);
        if (!searchTerm) {
            const quotes = await Quote.find({}).populate('creator').limit(10);
            const response= new Response(JSON.stringify(quotes), {
                status: 200, 
            });
            return response;
        } else {
            const searchConditions = {
              $or: [
                { quote: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { tag: { $regex: searchTerm, $options: "i" } },
              ],
            };

            const quotes = await Quote.find(searchConditions)
              .populate("creator")
              .limit(10);

            return new Response(JSON.stringify(quotes), {
                status: 200
            });
        }
    } catch (error) {
        console.log(error);
        return new Response("Could not fetch quotes", {
            status: 500
        })
    }
}