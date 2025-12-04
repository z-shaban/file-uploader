import { Router } from "express";
import { signupForm, signup } from "../controllers/signupController";


const signUpRouter = Router()

signUpRouter.get('/', signupForm)
signUpRouter.post('/', signup)

export default signUpRouter