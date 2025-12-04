import { Router } from "express";
import { loginForm, login } from "../controllers/loginController";


const loginRouter = Router()

loginRouter.get('/', loginForm)
loginRouter.post('/', login)

export default loginRouter