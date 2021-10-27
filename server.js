const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const session = require('express-session');
const app = express()

//Configuration
require('dotenv').config()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//DATABASE//
mongoose.connect(
    mongodbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    () => {
        console.log('the connection with mongod is established at', mongodbURI)
    }
)

const productsController = require('./controllers/products.js');
app.use('/products', productsController);
const userController = require('./controllers/users.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)


app.listen(3000, () => {
  console.log('listening...')
})
mongoose.connect('mongodb://localhost:27017/products', ()=>{
  console.log('The connection with mongod is established')
})
