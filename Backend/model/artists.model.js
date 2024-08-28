import mongoose from 'mongoose'

const artistScehema = mongoose.Schema({
    name:String,
    image:String,
    bio:String,
    password:String
})

const Artist = mongoose.model('Artist', artistScehema)

export default Artist;