const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/", async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)

        res.render("books/index.ejs", {books: currentUser.books});
        //we are now going to pass the current user's pantry items to the index page
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", async (req, res) => {
    // res.render("books/new.ejs")
    res.render("books/new.ejs");
})

router.post("/", async (req, res) => {
      try {

        if(req.body.currentlyReading === "on"){
            req.body.currentlyReading = true
        }else{
            req.body.currentlyReading = false
        }
    
        if(req.body.isFinished === "on"){
            req.body.isFinished = true
        }else{
            req.body.isFinished = false
        }
    
        if(req.body.dnf === "on"){
            req.body.dnf = true
        }else{
            req.body.dnf = false
        }
        
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.push(req.body); 
        await currentUser.save(); 
        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

module.exports = router;