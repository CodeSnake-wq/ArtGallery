import express from 'express'
import { deleteArtist, getArtists, postArtists } from '../controller/artists.controller.js'

const router = express.Router()

router.get('/',getArtists)
router.post('/',postArtists)
router.delete('/',deleteArtist)

export default router