import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();
dotenv.config();

// middleware that allows us to get json data in th request from costumers// allows to parse the data
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("app is runnning in http://localjost:" + PORT);
});
