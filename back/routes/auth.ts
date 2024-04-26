import express from "express"
import { forgetPasswordController, loginController, registerController } from "../controllers/auth"
import { validate } from "../middleware/validate"

const authRouter = express.Router()

authRouter.post("/register",validate("register"),registerController)

authRouter.post("/login", validate("login"),loginController)

authRouter.post("/forgetPassword", validate("forget_password"),forgetPasswordController)

export default authRouter