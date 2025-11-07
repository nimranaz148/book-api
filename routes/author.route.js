const express = require("express")

const router = express.Router()
const {getAllAuthors, createAuthor, updateAuthorbyId, deleteAuthorById} = require("../controllers/author.controller")

const {getAuthorvalidateMiddleware, createAuthorvalidateMiddleware, updateAuthorvalidateMiddleware, deleteAuthorvalidateMiddleware} = require("../middlewares/author.validation.middleware")




// --------------Author api
// GET all 
// GET /api/v1/authors?search=abc
router.get("/",getAuthorvalidateMiddleware, getAllAuthors)

// create author
// POST /api/v1/authors
router.post("/",createAuthorvalidateMiddleware, createAuthor)

// Update author by id
// PATCH /api/v1/authors/:id
router.patch("/:id",updateAuthorvalidateMiddleware, updateAuthorbyId)


// Delete author by id
// DELETE /api/v1/authors/:id
router.delete("/:id",deleteAuthorvalidateMiddleware, deleteAuthorById)

module.exports = router