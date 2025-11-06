// validators\book.validatorschema.js
const { z } = require('zod');

// ----------------GET validator schema----------------
// --------------------req.query------------------

const getBookValidator = z.object({
    search: z.string().optional(),
    bookId: z.string().uuid().optional(),
})

