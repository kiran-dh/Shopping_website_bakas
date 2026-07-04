import express from "express"
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port=5000;

app.use(express.json());

app.use("/api/products",productRoutes)

app.listen(port,()=>{
    console.log(`Server is running in port ${port}`)
})
