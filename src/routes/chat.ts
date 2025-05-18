import { Router } from "express";
import { expressHandler } from "../middleware/expressHandler";
import ChatController from "../controllers/chat";

const router = Router();
router.post("/add", expressHandler(ChatController.add))
export { router as chatRouter };
