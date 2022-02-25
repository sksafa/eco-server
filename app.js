const express = require("express")
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()

//import routes
const userRoutes = require('./routes/user')

//app
const app = express();

//db

// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(()=>{
//     console.log("database connected")
// })

const URI = process.env.DATABASE;

mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});


//middleWares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

app.use('/api',userRoutes)
const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log("server is gdfrunnig on porty ${port}", port)
})


