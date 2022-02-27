const express = require("express")
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

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
app.use(cors());
app.use(cookieParser())
app.use(expressValidator())

app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log("server is runing on port", port)
})

