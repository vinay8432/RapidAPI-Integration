const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require('dotenv')

dotenv.config()

const login = async (req,res) => {
    try{
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if (!user){
            return res.status(404).json({message: "You havn't registered with this email"})
        }
    
        const isMatched = await bcrypt.compare(password, user.password)
    
        if (!isMatched) {
            return res.status(401).json({message: "Password is not correct"})
        }
    
        const jwt_token = jwt.sign({_id: user._id, email: user.email}, process.env.JwtSecerat,{
            expiresIn: '10h'
        })
        return res.status(200).json({message: "Successfully Login", token: jwt_token})
    }catch(error){
        res.status(500).json({message: "getting error while login", error: error.message})
    }

}

const register = async (req,res) => {
    try{
        const { email, password} = req.body

        const existedUser = await User.findOne({email:email})
        if(existedUser) {
            res.status(400).json({message: "User Already Exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
    
        const user = new User({email, password: hashedPassword})
        await user.save()
        return res.status(201).json({message: "User successfully Created"})
    } catch(error) {
        res.status(500).json({message: "Error while registering", error: error.message})
    }

}

module.exports = {
    login, register
}