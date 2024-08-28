import express from 'express'
import {getSubscriber, postSubscriber} from '../controller/subscribe.controller.js'

const router = express.Router()

router.get('/',getSubscriber)
router.post('/',postSubscriber)

export default router