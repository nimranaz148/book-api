const express = require('express');
const {getallBook, getBookbyId,getBookbyTitle, createBook, updateBookById, deleteBookById} = require('../controllers/books.controller');


const router = express.Router();

// Get all books with this api
// GET /api/v1/books/
// GET /api/v1/books?search=book 1
// GET /api/v1/books?bookId=xxxxxxx
// GET /api/v1/books?authorId=xxxxxxx
router.get('/',getbookvalidatemiddleware, getallBook);


// create new book
// POST /api/v1/books/

router.post('/', createBook)


// update existing book
// PATCH /api/v1/books/:id
router.patch('/:id', updateBookById)


// Delete existing book
// DELETE /api/v1/books/:id
router.delete('/:id', deleteBookById)

module.exports = router;