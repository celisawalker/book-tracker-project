const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/bookList');

router.get("/books-list", async (req, res) => {
    res.render("books/booklist.ejs")
 });

module.exports = router;