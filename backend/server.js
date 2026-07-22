import express from "express"
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv"
import cors from "cors"
import orderRoutes from "./routes/orderRoutes.js"


dotenv.config();

const Port=process.env.Port

const app = express();

app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use(express.json());

app.use("/api/products",productRoutes)

app.use("/api/orders",orderRoutes)

app.listen(Port,()=>{
    console.log(`Server is running in port ${Port}`)
})
