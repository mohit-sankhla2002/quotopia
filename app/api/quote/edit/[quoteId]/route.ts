import { NextRequest } from "next/server";
import Quote from "@/models/quote";
import { connectToDb } from "@/utils/db";
import { z } from "zod";

const validator = z.object({
  quote: z.string(),
  author: z.string(),
  tag: z.string(),
});

export async function PATCH(req: NextRequest) {
  try {
    await connectToDb();
    const body = await req.json();
    const parsedBody = validator.parse(body);
    const quoteId: string = req.url.split("/")[req.url.split("/").length - 1];
    const quote = await Quote.findByIdAndUpdate(quoteId, parsedBody);

    return new Response(JSON.stringify(quote), {
      status: 201,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 201,
      }
    );
  }
}
