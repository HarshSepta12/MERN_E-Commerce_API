import express, { json, Router } from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/User.js";
import productRouter from "./Routes/Product.js";
import cartRouter from "./Routes/Cart.js";
import addressRouter from "./Routes/address.js";
import PaymentRouter from './Routes/payment.js'
import cors from "cors";

const app = express();


app.use(express.json()); 


app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))


// Home route (for testing)
app.get("/", (req, res) => res.json({ message: "This is home route" }));

let port = 1000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", PaymentRouter);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://harshservi48:XLN96VGtn1jE5XB8@cluster0.phztx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "MERN_E_COMMERCE",
    }
  )
  .then(() => console.log("MongoDB connected Successfully..."))
  .catch((error) => console.log(error));
