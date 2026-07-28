import express from "express"
import { createOrder } from "../controllers/orderController.js"
import parseOrderId from "../middleware/orderId.js"
import { getOrders , getOrdersById, updateOrdersById , deleteOrdersById } from "../controllers/orderController.js"
import { authenticateUser } from "../middleware/authenticateUser.js"

const router =express.Router()

router.get("/me", authenticateUser, (req, res) => {
    console.log(req.user)
    return res.json(req.user);
});

router.post("/",authenticateUser,parseOrderId,createOrder)

router.get("/",getOrders)

router.get("/:id",parseOrderId,getOrdersById)

router.patch("/:id",parseOrderId,updateOrdersById)

router.delete("/:id",parseOrderId,deleteOrdersById)

export default router;