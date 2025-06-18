import { Router } from "express"
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user-controller"
import { authenticationToken, authorizeRole } from "../middleware/auth-middleware"
import { login, register } from "../controllers/auth-controller"

const userRouter = Router()


userRouter.get("/", authenticationToken, getAllUsers)
userRouter.get("/:id", authenticationToken,getUserById)
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.put("/:id", authenticationToken, updateUser)
userRouter.delete("/:id", authenticationToken, deleteUser)

export default userRouter;
