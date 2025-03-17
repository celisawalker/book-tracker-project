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

module.exports = router;