import axios from 'axios'
import * as cheerio from 'cheerio'
import link from '../models/Link.js'

console.log("GET API HIT")

export const shortUrl = async (req, res) => {
    try {
        const { url } = req.body

        if (!url) {
            return res.status(400).json({ message: "URL required" })
        }

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 10000
        })

        const $ = cheerio.load(data)

        const title =
            $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            ''

        const image =
            $('meta[property="og:image"]').attr('content') ||
            `https://www.google.com/s2/favicons?sz=128&domain=${url}`

        return res.json({
            title: title.trim(),
            image
        })

    } catch (err) {
        console.error("SCRAPE ERROR:", err.message)

        return res.status(500).json({
            message: "Scraping failed",
            error: err.message
        })
    }
}

export const saveLink = async(req, res) => {
    try{
        // basically link db me name url ..... save ho jaega
        const newLink = await link.create(req.body)

        res.status(201).json(newLink)
    
    }
    catch(err){
    console.error(err)
    res.status(500).json({
        message: err.message,
        error: err.toString()
    })
}
}

export const getLinks = async(req, res) => {
    try{
        const links = await link.find().sort({createdAt:-1})
        res.json(links)
    }
    catch(err){
    console.error(err)
    res.status(500).json({
        message: err.message,
        error: err.toString()
    })
}
}

export const deleteLink = async(req, res) => {
    try{
        await link.findByIdAndDelete(req.params.id)
        res.status(201).json({message: 'Delete successfully!'})
    }
    catch(err){
        res.status(500).json({error: err})
    }
}