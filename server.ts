import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../app", "build")));

app.use(cors());
app.use(express.json());

app.get("/*", (_req: Request, res: Response) => {
    // the ../../ is because when compiled, the server.js file will live within server/build
    res.sendFile(path.resolve(__dirname, "../app", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
