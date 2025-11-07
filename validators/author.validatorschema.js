const {z} = require('zod')



// ------------------- Get Author Validation Schema
// -----------req.query
exports.getAuthorvalidator = z.object({
    search : z.string().optional(),
    id : z.uuid().optional()
})

// -----------------------------Create validation
// const {firstName, lastName, email} = req.body
exports.createAuthorvalidator = z.object({
    firstName: z.string({required_error: "firstname is requires"}).min(3, "first name cannot be less than 3 cgaracter"),

    lastName: z.string().optional(),

    email: z.email().optional()



})




// -------------------------update validation
// ----------------------by ID
// const {id} = req.params
exports.updateAuthorvalidatorId = z.object({
    id : z.uuid({message: "invalid author ID format"})

})

// -------------BY BODY
// // const {firstName, lastName, email} = req.body
exports.updateAuthorvalidatorBody = z.object({
    firstName: z.string().min(3, {message :"name cannot be less then 3 cgaracter"}).optional(),
    lastName: z.string().optional(),
    email : z.email().optional()    
    
})



// ------------------------------DELETE VALIDATION SCHEMa
//  const {id} = req.params
exports.deleteAuthorvalidatorId = z.object({
    id : z.uuid({message: "invalid author ID format"}) 
    
})