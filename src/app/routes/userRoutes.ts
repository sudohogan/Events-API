import { Router } from 'express'
import { joiRegister, joiLogin } from '../middleware/joiUser'
import { signUp, signIn } from '../controllers/userController'

export const userRouter = Router()

userRouter
    .post('/sign-up', joiRegister, signUp)
    .post('/sign-in', joiLogin, signIn)
