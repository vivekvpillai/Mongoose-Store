const express = require('express')
const router = express.Router();
const Product = require('../models/products.js')

//Authentication
// const isAuthenticated = (req, res, next) => {
//   if (req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/sessions/new')
//   }
// } not going to use this

//I still don't get why we use req.body in addition to params.id here. Would you mind please explaining? No worries if you don't have the chance. I'll ask or read into it more.
//PUT
router.put('/:id', (req, res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
      res.redirect('/products');
    });
});

//quantity button. I used https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Beaker/wiki/Mongo-Cheatsheet as a reference and Jessica told us on Discord about an idea to use findByIdAndUpdate, from which I took that idea and deciphered this solution.
router.put('/:id/updatequantity', (req, res)=>{
    Product.findByIdAndUpdate(req.params.id, {$inc: { qty: -1}}, {new: true}, (err, updatedModel)=>{
      res.redirect(`/products/${req.params.id}`);
      //I tried res.redirect('/products') before and it didn't work. Don't know why though. I tried this instead and it worked. I'm also getting an error when I include req.body before req.params.id, which I'm still trying to understand why.
    });
});


//POST
router.post('/', (req,res)=> {
  Product.create(req.body, (error, createdProducts)=> {
    res.redirect('/products')
  })
})


//INDEX
router.get('/', (req, res)=>{
    Product.find({}, (error, allProducts)=>{
        res.render('index.ejs', {
            products: allProducts
            ,currentUser: req.session.currentUser
        });
    });
});

//CREATE
router.get('/new', (req,res) =>{
 res.render('new.ejs', {
   currentUser: req.session.currentUser
 })
})

//DELETE
router.delete('/:id', (req,res) => {
  Product.findByIdAndRemove(req.params.id, (err,data)=>{
    res.redirect('/products')
  })
})

//SHOW
router.get('/:id', (req,res)=> {
  Product.findById(req.params.id, (err, foundProducts) => {
    res.render('show.ejs', {
      product:foundProducts,
      currentUser: req.session.currentUser
    })
})
})

//Edit
router.get('/:id/edit', (req,res) =>{
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('edit.ejs', {
      product: foundProduct,
      currentUser: req.session.currentUser
    })
  })
})

//drop db route
router.get(
  '/dropdatabase/cannotundo/areyousure/reallysure/okthen', (req,res) => {
    Product.collection.drop()
    res.send('You did it, you dropped the whole database')
  }
)


module.exports = router;
