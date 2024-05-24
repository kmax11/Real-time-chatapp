import express from "express"
import { getUsersFromSidebar } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/',protectRoute,getUsersFromSidebar)

export default router