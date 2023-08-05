const User = require('../models/userModels.js')

// home 
exports.home = async (req,res) => {
    res.send(`<h1>Home response and running at the port : ${process.env.PORT}</h1>`)
}

// CREATE USER
exports.createUser = async (req,res) => {
    try{
        const {name,email} = req.body

        if(!name || !email){
            throw new Error('Name and email are required')
        }
        // check if user is already registered
        const userExists = await User.findOne({email})

        if(userExists){
            throw new Error('User already exists')
        }

        // main
        const user = await User.create({
            name,
            email
        })
        // .................................................. 

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })


    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message: error.message
        })
    }
}

// GET USER
exports.getUser = async(req,res) => {
    try{
        const users = await User.find({})
        res.status(200).json({
            success:true,
            users
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// EDIT USER
exports.editUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            success : true,
            message : "User updated successfully"
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message: error.message
        })
    }
}

// DELETE USER
exports.deleteUser = async(req,res) => {
    try{
        const userId = req.params.userId
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message: error.message
        })
    }
}