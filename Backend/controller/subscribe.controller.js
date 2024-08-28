import Subscriber from '../model/subscribe.model.js'

export const getSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.find()
        res.status(200).json(subscriber)        
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json(error)
    }
}

export const postSubscriber = async (req, res) => {
    try {
        const {email} = req.body
        const subscriber = await Subscriber.findOne({email})
        if(subscriber){
            return res.status(400).json({message: 'Subscriber already exists'})
        }
        const newSubscriber = new Subscriber({email: email})
        await newSubscriber.save()
        res.status(201).json({message: 'New subscriber created successfully', user:{
            email: newSubscriber.email
        }})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({message: "Internal server error"})        
    }
}
