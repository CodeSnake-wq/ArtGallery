import Symbol from "../model/symbols.model.js";
import argon2 from 'argon2';

export const getSymbols = async (req, res) => {
    try {
        const symbols = await Symbol.find()
        res.status(200).json(symbols)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json(error)
    }
}

export const postSymbol = async (req, res) =>{
    try {
        const { name, bio, image, password } = req.body;
        if (!name || !bio || !image || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const oldSymbol = await Symbol.findOne({ name });
        if (oldSymbol) {
            return res.status(400).json({message: 'Symbol already exists'});
        }

        const hashedPassword = await argon2.hash(password);
        const newSymbol = new Symbol({ 
            name: name, 
            bio: bio, 
            image: image, 
            password: hashedPassword 
        });
        await newSymbol.save();
        res.status(201).json({message: 'New subscriber created successfully', symbol:{
            name: newSymbol.name,
            bio: newSymbol.bio,
            image: newSymbol.image,
            password:  newSymbol.hashedPassword
        }})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({message: "Internal server error"})        
    }
}

export const updateSymbol = async (req, res) => {
    try {
        const { oldName, oldPassword, name, bio, image, password } = req.body;
        console.log(oldName, oldPassword, name, bio, image, password)
        const symbol = await Symbol.findOne({ name: oldName });
        console.log(symbol)
        if (!symbol) {
            return res.status(404).json({ message: 'Symbol not found' });
        }
        const passwordMatch = await argon2.verify(symbol.password, oldPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const double = await Symbol.findOne({ name });
        if(double){
            return res.status(409).json({ message: 'Symbol name already exist' });
        }
        symbol.name = name
        symbol.bio = bio
        symbol.image = image
        symbol.password =  await argon2.hash(password)
        await symbol.save()
        res.status(200).json({ message: 'Symbol updated successfully', symbol:{
            name: symbol.name,
            bio: symbol.bio,
            image: symbol.image,
            password:  symbol.hashedPassword
        } })
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}