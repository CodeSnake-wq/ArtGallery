import mongoose from 'mongoose'

const symbolScehema = mongoose.Schema({
    name:String,
    image:String,
    bio:String,
    password:String
})

const Symbol = mongoose.model('Symbol', symbolScehema)

export default Symbol;