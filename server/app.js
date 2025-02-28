import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/useRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import jobRouter from "./routes/jobRouter.js"
import { connectDB } from "./config/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

connectDB();

app.use(errorMiddleware);

export default app;