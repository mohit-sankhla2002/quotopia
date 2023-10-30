import { connectToDb } from '@/utils/db'; // import db connection
import { createQuoteValidationSchema } from "@/types/CreateQuote";
import { getServerSession } from 'next-auth';
import Quote from "@/models/quote";
// import { authOptions } from '../../auth/[...nextauth]/route';

export const POST = async (req:Request) => {
    try {
        const body = await req.json();
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