import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.send('<h1>Hello There</h1>')
})

export {router} 