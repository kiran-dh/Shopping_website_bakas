import express from "express"
import { getProducts , getProductsById , createProducts, updateProductsById , deleteProductsById} from "../controllers/productController.js"
import parseProductId from "../middleware/productId.js"

const router = express.Router()


router.get("/",getProducts)

router.get("/:id",parseProductId,getProductsById)

router.post("/",createProducts)

router.patch("/:id",parseProductId,updateProductsById)

router.delete("/:id",parseProductId,deleteProductsById)

export default router;

