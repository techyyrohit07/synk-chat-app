import { getUserChats, createChat } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import express from "express"

const router = express.Router()

router.get('/', protectRoute, getUserChats)
router.post('/', protectRoute, createChat)


export default router