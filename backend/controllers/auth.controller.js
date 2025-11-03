import User from "../models/User.model.js";
import jwt from 'jsonwebtoken'


export const registerUser = async (req,res) => {
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
        return res.status(400).json({
                message : "User already exists"
        }) 
        }

        const newUser = await User.create({username, email, password})
        
        res.status(201).send({
            message : "New user created",
            newUser
    })
    } catch (error) {
        console.log("Error : ",error );
        res.status(501).json({
            message : error.message
        })        
    }
}

export const loginUser = async(req,res) => {
    
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "User not registered"
            })
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1h"})

        res.cookie('token', token, {
            httpOnly : true,
            sameSite : "None",
            secure : true,
            path : '/'
        })

        // console.log("token :", token);
        // console.log(res);
        
        res.status(201).json({
            message : "Login Successfull",
            user,
            token
        })
    } catch (error) {
        res.status(501).json({
            message : error.message
        })
    }

}