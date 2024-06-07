import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "JOB_SEEKING_APPLICATION"
    }).then(()=> {
        console.log("Connected to database")
    }).catch((err) => {
        console.log(`Some error occured white conecting to database: ${err}`);
    })
};
