import express from "express"
import { getOrCreateUser } from "../controllers/userController.js"
import { authenticateUser } from "../middleware/authenticateUser.js"

const router =express.Router();

router.get("/check",authenticateUser,getOrCreateUser)

export default router;