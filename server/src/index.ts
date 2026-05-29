import "dotenv/config";
import express, { NextFunction } from "express";
import cors from "cors";
import { errorMiddleware } from "./core/errors/error.middleware";
import productRoutes from "./modules/products/product.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001; 
//define the port

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes)


app.get("/error", (req, res)=>{
  throw new Error("text error")
})


// app.get("/", (_req, res) => {
  //   res.json({ message: "Lecture E-Commerce API is running", port: PORT });
  // });
  
  
app.get('/',(req, res)=>{
    res.json({message: "welcome", port: PORT})
  }) 
  
app
app.use(errorMiddleware) 
//set up global error handling middleware


  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  