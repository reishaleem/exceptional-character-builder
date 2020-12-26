import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./server/graphql/schema";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../app", "build")));

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP((req, res) => {
        return {
            schema: schema,
            graphiql: true,
            context: { req, res },
        };
    })
);

const mongoURI = process.env.MONGO_URI!;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
const connectionPool = mongoose.connection;
connectionPool.once("open", () => {
    console.log("MongoDB connection pool established");
});

app.get("/*", (_req: Request, res: Response) => {
    // the ../../ is because when compiled, the server.js file will live within server/build
    res.sendFile(path.resolve(__dirname, "../app", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
