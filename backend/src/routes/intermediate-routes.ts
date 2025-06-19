import { Router } from "express"
import {
  getAllIntermediates,
  getIntermediateById,
  createIntermediate,
  updateIntermediate,
  deleteIntermediate,
} from "../controllers/intermediate-controller"
import { authenticationToken, authorizeRole } from "../middleware/auth-middleware"

const intermediateRouter = Router()

//intermediateRouter.use(authenticationToken)

intermediateRouter.get("/", getAllIntermediates)
intermediateRouter.get("/:id", getIntermediateById)
intermediateRouter.post("/",  createIntermediate)
intermediateRouter.put("/:id", updateIntermediate)
intermediateRouter.delete("/:id", deleteIntermediate)

export default intermediateRouter
