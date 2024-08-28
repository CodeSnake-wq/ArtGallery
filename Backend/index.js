import express from 'express'
import dotenv from 'dotenv'
import mongoose from'mongoose'
import cors from 'cors'

import artistsRoute from './route/artists.route.js'
import userRoute from './route/user.route.js'
import subscriberRoute from './route/subscribe.route.js'
import symbolsRoute from './route/symbols.route.js'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

const port = process.env.PORT || 4000
const URI = process .env.mongoDBURI

//connect to mongodb
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('connected to mongodb')
    
} catch (error) {
    console.log("Error: ", error)
}

//defining route
app.use("/artists", artistsRoute)
app.use("/user", userRoute)
app.use("/subscriber", subscriberRoute)
app.use("/symbols", symbolsRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})