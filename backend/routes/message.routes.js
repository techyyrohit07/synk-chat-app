import { getMessages, sendMessage } from "../controllers/message.controller.js";
import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()


router.get('/:chatId', protectRoute ,getMessages)
router.post('/', protectRoute, sendMessage)


export default router