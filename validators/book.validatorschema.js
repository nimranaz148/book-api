// validators\book.validatorschema.js
const { z } = require('zod');

// ----------------GET validator schema----------------
// --------------------req.query------------------

exports.getBookValidator = z.object({
    search: z.string().optional(),
    bookId: z.uuid().optional(),
    authorId: z.uuid().optional()

})





// ----------------CREATE validator schema----------------
// --------------------req.body------------------

        // const { title, description, authorid } = req.body;

exports.createBookValidator = z.object({
    title:z.string({required_error: "Title is required"}).min(3,{message: "Title should be at least 3 characters long"}),

    description: z.string().optional(),

    authorid: z.uuid()



})






// ----------------UPDATE validator schema----------------
// --------------------req.body------------------

// // const updateid = req.params.id;

exports.updateBookValidatorId = z.object({
    id: z.uuid()

})


// -----------------------req.body----------------
// const { title, description, authorid } = req.body;
exports.updateBookValidatorBody= z.object({
    title: z.string().optional(),

    description: z.string().optional(),

    authorid: z.uuid().optional()

})




// --------------------------DELETE validator schema----------------
exports.deleteBookValidatorId= z.object({
    id: z.uuid()
})