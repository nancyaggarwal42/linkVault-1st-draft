import axios from 'axios'
import * as cheerio from 'cheerio'
import { link } from '../models/Link.js'

export const shortUrl = async(req, res) => {
    try{
        const {url} = req.body

    // axios url pe jaake html abstract krega user agent dene ka reason is kuch sites boots ko block krdeti h
    const {data} = await axios.get(url, {headers: {'User-Agent' : 'Mozilla/5.0'}})

    // cheerio html read krta h like browser
    const $ = cheerio.load(data)

    // title abstract krenge and nhi milta h to title tag se lenge otherwise blank
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || ''

    // og ka mtlb open graph joki facebook ne bnaya h jooki help krta h website ke title image or description etc ko abstract krne me
    // favicons websites ke icons hote h google hume free me provide kr skta h favicons
    const image = $('meta[property="og:image"]').attr('content') || `https://www.google.com/s2/favicons?sz=128&domain=${url}`

    res.json({title: title.trim(), image})
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

export const saveLink = async(req, res) => {
    try{
        // basically link db me name url ..... save ho jaega
        const newLink = await link.create(req.body)

        res.status(201).json(newLink)
    }
    catch(err){
        res.status(500).json({message: err})
    }
}

export const getLinks = async(req, res) => {
    try{
        const links = await link.find().sort({createdAt:-1})
        res.json(links)
    }
    catch(err){
        res.status(500).json({error: err})
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