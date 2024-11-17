const User = require('../Model/loginModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const  registeration = async (req,res) => {
      try{
         const {username,password} = req.body;
         //check existing username in the database
         const checkexistingUser = await User.findOne({username})
        if (checkexistingUser) {
            res.status(409).json({
                success: false,
                message: "User id is already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        
        const newlyregister = new User({
            username,
            password:hashedpassword
        })
        
        await newlyregister.save();

        if(newlyregister){
            res.status(201).json({
                status: true,
                message: "user register is successfully done"
            })
        } else {
            res.status(409).json({
                success:false,
                message: "user id is not created successfully"
            })
        }
      } catch(error){
        console.log("error occur",error)
        res.json({
            status: false,
            message: "registeration error"
        })
      }
}

const Login = async (req,res) => {
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username})

        if(!user){
            res.status(409).json({
                success: false,
                message: "user did not exist"
            })
        }
        
        //code for password checking 
        const ispasswordMatch = await bcrypt.compare(password, user.password)
        if(!ispasswordMatch){
            res.status(409).json({
                success: false,
                message: "password did not match"
            })
        }

        //userToken
        const accesstoken = jwt.sign({
            userId : user._Id,
            username: user.username
        },process.env.JWT_SECRET_KEY,{
            expiresIn: '1h'
        })
       res.status(201).json({
            success: true,
            message:"login sucessfully",
            accesstoken,
            username: user.username
        })

    }catch(error){
        console.log("error occur",error)
        res.json({
            status: false,
            message: "Login Failed"
        })
    }
}

module.exports = {registeration,Login} ; 