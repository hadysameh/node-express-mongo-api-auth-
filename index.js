require('dotenv').config()
const express = require('express')
const cors = require('cors') 
const app = express()
const mongoose = require('mongoose')
const {initializeRoutes} = require('./routes/routesInitializer')

const bodyParser = require('body-parser')
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hi you')
})

initializeRoutes(app)

mongoose.connect(process.env.mongodbConnectionStr,
{ useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(()=>{
    console.log("MongoDB successfully connected")  
})

app.listen(process.env.port)