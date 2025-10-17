import express from "express";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js';
import taskRoute from './routes/task.route.js';
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: true}) );
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/tasks', taskRoute);


app.listen(PORT, () =>  {
    connectDB();
    console.log(`Server running at port ${PORT}`)
})