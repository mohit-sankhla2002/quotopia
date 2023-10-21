import { connectToDb } from '@/utils/db'; // import db connection
import { createQuoteValidationSchema } from "@/types/CreateQuote";
import Quote from "@/models/quote";

export const POST = async (request) => {
    try {
        const body = await request.json();
        
        const parsedBody = await createQuoteValidationSchema.parseAsync(body);
        const {userId, author, quote, tag} = parsedBody;
        await connectToDb();
        const newQuote = new Quote({
            creator: userId, 
            author, 
            quote, 
            tag
        });

        const post = await newQuote.save();

        return new Response(JSON.stringify({
            creator: post.creator, 
            id: post._id, 
            quote: post.quote, 
            
        }), {
            status: 201
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a quote", {
            status: 500
        });
    }


}