import Artist from "../model/artists.model.js";
import argon2 from 'argon2';

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find()
        res.status(200).json(artists)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json(error)
    }
}

export const postArtists = async (req, res) =>{
    try {
        const { name, bio, image, password } = req.body;
        if (!name || !bio || !image || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const oldArtist = await Artist.findOne({ name });
        if (oldArtist) {
            return res.status(400).json({message: 'Artist already exists'});
        }

        const hashedPassword = await argon2.hash(password);
        const newArtist = new Artist({ 
            name: name, 
            bio: bio, 
            image: image, 
            password: hashedPassword 
        });
        await newArtist.save();
        res.status(201).json({message: 'New subscriber created successfully', artist:{
            name: newArtist.name,
            bio: newArtist.bio,
            image: newArtist.image,
            password:  newArtist.hashedPassword
        }})
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({message: "Internal server error"})        
    }
}

export const deleteArtist = async (req, res) => {
    try {
        const { name, password } = req.body;
        const artist = await Artist.findOne({ name });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const passwordMatch = await argon2.verify(artist.password, password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        await Artist.findOneAndDelete({ name });
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}