import Quote from "@/models/quote";
import { connectToDb } from "@/utils/db";
export async function GET(request: Request) {
  let userId = request.url.split("/")[request.url.split("/").length - 2];
  try {
    await connectToDb();
    const quotes = await Quote.find({ creator: userId }).populate("creator");
    if (quotes.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No quotes are made by this user",
        }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(quotes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("", {
      status: 500,
    });
  }
}
