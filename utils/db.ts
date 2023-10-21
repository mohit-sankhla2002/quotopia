import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("DB already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "quotopia",
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log(`DB Connected`);
    } catch (error) {
        console.log(error);
    }
}