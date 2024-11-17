require('dotenv').config();
const express = require('express');
const connectdatabase = require('./database.js')
const router = require("./Router/Route")
const Employeerouter = require('./Router/Employeeroutes');
const path= require('path')
const cors = require('cors')
const app = express();

//databaseconnection
connectdatabase();

//forntend url
app.use(cors({ origin: 'http://localhost:5173' })); 


//middleware
app.use(express.json())
app.use('/api',router)
app.use('/api',Employeerouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Serverconnection
const Port = process.env.PORT 
app.listen(Port,()=>
 console.log("server is running")
)