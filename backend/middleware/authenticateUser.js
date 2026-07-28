import { getAuth } from "../config/firebaseAdmin.js";
export const authenticateUser = async (req,res,next)=>{
    try {
            const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }
        const token =authHeader.split(" ")[1];
        const decodedToken = await getAuth().verifyIdToken(token)
        req.user = decodedToken
        console.log("authentication was sucessfull")

        next()

    } catch (error) {
        return res.status(401).json({
                message: "Authorization failed",
                error:error.message,
                code:error.code
            });
    }
}