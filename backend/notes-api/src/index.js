import dotenv from "dotenv";
import { connectDB } from "./db/connectDb.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8001;

connectDB()
  .then(() => {
    app.on("error", (error) => console.log("ERROR: ", error));
    app.listen(port, () => console.log(`Server is runing on ${port}`));
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed !!", err);
  });
