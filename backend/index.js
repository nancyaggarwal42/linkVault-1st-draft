import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'
import linkRoutes from './routes/links.js'

dotenv.config()
const app = express()

// import.meta.url  
// current file ka full path hota hai
// jaise: "file:///C:/Users/hp/LinkVault/backend/server.js"

// fileURLToPath(import.meta.url)
// URL format se normal path mein convert karta hai
// "file:///C:/Users/hp/LinkVault/backend/server.js"
// →  "C:/Users/hp/LinkVault/backend/server.js"

// path.dirname(...)
// sirf folder ka path nikalat hai, file name hata deta hai
// "C:/Users/hp/LinkVault/backend/server.js"
// →  "C:/Users/hp/LinkVault/backend"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())

// __dirname = "C:/Users/hp/LinkVault/backend"

// path.join(__dirname, '../frontend')
// __dirname se ek folder upar jaao, phir frontend mein jaao
// "C:/Users/hp/LinkVault/backend/../frontend"
// →  "C:/Users/hp/LinkVault/frontend"

// express.static(...)
// us folder ki saari files directly browser mein accessible ho jaati hain
app.use(express.static(path.join(__dirname, '../frontend')))

app.use('/api/links', linkRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected!'))
.catch(err => console.log('error in db', err))

app.listen(process.env.PORT, () => {console.log(`Server running on ${process.env.PORT}`)})