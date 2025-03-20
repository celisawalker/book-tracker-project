const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/bookList');

router.get("/", async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)

        res.render("books/index.ejs", {books: currentUser.books});
        //this passes all books without a status of wantToRead to the your books index page
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})



router.get("/new", async (req, res) => {
    res.render("books/new.ejs");
})

//lists book list on /book-list
router.get("/book-list", async (req, res) => {
    const bookList = await List.find();
    res.render("books/booklist.ejs", {list: bookList});
})

//
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

//TODO: ADD ROUTE FOR ADD TO LIST ACTION - SHOULD POPULATE THE TITLE AND AUTHOR FIELDS
router.get("/:bookId/add", async (req, res) => {
    try {
      const book = await List.findById(req.params.bookId);
      res.render("books/edit.ejs", {book});
  } catch (error) {
      console.log(error);
      res.redirect("/");
  }
});

router.get("/tbr", async (req, res) => {
    const books = await List.find({"assignee": req.session.user._id});
    res.render("books/tbr.ejs", {books});
})

router.get("/:bookId", async (req, res) => {
    //look up the user that's currently logged in
    try {
        const book = await List.findById(req.params.bookId);
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

//adds books to db and adds them to either books or tbr page
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
        const book = await List.findById(req.params.bookId);
        book.set(req.body);
        book.assignee.push(req.session.user._id);
        await book.save();
        //console.log(book);
        res.redirect(`/users/${req.session.user._id}/books/${req.params.bookId}`);
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