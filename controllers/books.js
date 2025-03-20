const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/bookList');

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
    res.render("books/new.ejs");
})


router.get("/book-list", async (req, res) => {
    const bookList = await List.find();
    console.log(bookList);
    res.render("books/booklist.ejs", {list: bookList});
})

router.post("/", async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.push(req.body); 
        await currentUser.save(); 
        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//populate to tbr
// router.post("/tbr", async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//         currentUser.books.push(req.body); //this changes the application's list in memory only
//         await currentUser.save(); //this makes the changes permanent in the database
//         res.redirect(`/users/${currentUser._id}/books/`);
//     } catch (error) {
//         console.log(error);
//         res.redirect("/");
//     }
// })

router.get("/:booksId", async (req, res) => {
    //look up the user that's currently logged in
    try {
        const currentUser = await User.findById(req.session.user._id);
        //find the subdoc that's in the currently logged in user's applications list
        const book = currentUser.books.id(req.params.booksId);
        //render a document with the subdocument's details
        res.render("books/show.ejs", {
            book: book,
            //property shorthand syntax - whenever the prop name and variable name are the same
        });
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.push(req.body); //this changes the application's list in memory only
        await currentUser.save(); //this makes the changes permanent in the database
        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/:bookId/edit", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.books.id(req.params.bookId);

        res.render("books/edit.ejs", {
            book: book
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.put("/:bookId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.books.id(req.params.bookId);
        book.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/books/${req.params.bookId}`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

router.delete("/:bookId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        //^this makes a change in memory only
        currentUser.books.id(req.params.bookId).deleteOne();
        await currentUser.save(); //this makes a change to the database

        res.redirect(`/users/${currentUser._id}/books`)
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;