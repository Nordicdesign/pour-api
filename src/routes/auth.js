import express from 'express'
import Auth from '../controllers/auth/AuthController'
const router = express.Router()

router.post('/', Auth.createUser)
router.post('/login', Auth.logUser)
router.post('/forgot', Auth.forgotRequest)
router.patch('/reset', Auth.resetPassword)

export default router
