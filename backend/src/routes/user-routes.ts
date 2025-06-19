import { Router } from "express"
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user-controller"
import { authenticationToken, authorizeRole } from "../middleware/auth-middleware"
import { login, register } from "../controllers/auth-controller"

const userRouter = Router()


userRouter.get("/", getAllUsers)
userRouter.get("/:id",getUserById)
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter;
