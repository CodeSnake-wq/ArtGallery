import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const {full_name, email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        const createdUser = new User({
            full_name: full_name, 
            email: email, 
            password: hashPassword
        })   
        await createdUser.save()
        res.status(201).json({message: 'User created successfully', user:{
            _id: createdUser._id,
            full_name: createdUser.full_name,
            email: createdUser.email
        }})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'})
        }else{
            res.status(200).json({message: 'Login successfully', user:{
                _id: user._id,
                full_name: user.full_name,
                email: user.email
            }})
        }
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}