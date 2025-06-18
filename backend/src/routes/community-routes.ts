import { Router } from "express"
import {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../controllers/community-controller"
import { authenticationToken, authorizeRole } from "../middleware/auth-middleware"

const router = Router()

//router.use(authenticationToken)

router.get("/", getAllCommunities)
router.get("/:id", getCommunityById)
router.post("/",  createCommunity)
router.put("/:id",  updateCommunity)
router.delete("/:id",  deleteCommunity)

export default router;
