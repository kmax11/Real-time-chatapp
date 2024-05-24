import mongoose from "mongoose";

const ConnectToMongoose = async () =>{
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log("Mongoose Connected");
    } catch (error) {
        console.log("Error connecting " + error);
    }
}

export default ConnectToMongoose;
