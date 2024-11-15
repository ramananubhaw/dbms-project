import express, { urlencoded } from "express";
import cors from "cors";
import router from "./routes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}));

const port = process.env.PORT || 3000;

app.use("/todos", router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})