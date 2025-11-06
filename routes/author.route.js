const express = require("express")

const router = express.Router()
const {getAllAuthors, createAuthor, updateAuthorbyId, deleteAuthorById} = require("../controllers/author.controller")




// --------------Author api
// GET all 
// GET /api/v1/authors?search=abc
router.get("/", getAllAuthors)

// create author
// POST /api/v1/authors
router.post("/", createAuthor)

// Update author by id
// PATCH /api/v1/authors/:id
router.patch("/:id", updateAuthorbyId)


// Delete author by id
// DELETE /api/v1/authors/:id
router.delete("/:id", deleteAuthorById)

module.exports = router