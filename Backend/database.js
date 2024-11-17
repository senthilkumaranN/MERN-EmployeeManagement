const mongoose = require('mongoose')

const database = async() =>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("database connected successfully")
    } catch (error) {
        console.log("error occur" ,error)
        process.exit(1)
    }
}
module.exports = database