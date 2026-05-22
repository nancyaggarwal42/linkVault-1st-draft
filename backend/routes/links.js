import Router from 'express'
import { deleteLink, getLinks, saveLink, shortUrl } from '../controllers/link.js'

const router = Router()

router.post('/shorten', shortUrl)
router.post('/', saveLink)
router.get('/', getLinks)
router.delete('/:id', deleteLink)

export default router

