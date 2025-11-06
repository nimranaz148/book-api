const db = require("../db/connection")
const authorTable = require("../models/author.model")
const { sql, ilike,or, eq } = require("drizzle-orm")
const bookTable = require("../models/book.model")


exports.getAllAuthors = async (req, res) => {
   try {
    const {search, id} = req.query

    let query = db.select().from(authorTable)


      if(id){
          query = query.where(eq(authorTable.id, id))
      }   
   else if(search){
        query = query.where(or(
           ilike(authorTable.firstName, `%${search}%`),
           ilike(authorTable.lastName, `%${search}%`),
           ilike(authorTable.email, `%${search}%`)
       ))


   }

   const result = await query

   return res.status(200).json({message: "Author fetched!!", result: result})
    
   } catch (error) {
    console.error("Error fetching authors:", error)
    return res.status(500).json({message: "Internal Server Error"})
    
   }
}



exports.createAuthor = async (req, res) => {
   try {
     const {firstName, lastName, email} = req.body

    //  validation
    if(!firstName || !email){
        return res.status(400).json({message: "First name and email are required"})

    }

    const result = await db.insert(authorTable).values({firstName,lastName, email}).returning()
    return res.status(201).json({message: "Author created!!", result: result})
    
   } catch (error) {
    console.error("Error creating author:", error)
    return res.status(500).json({message: "Internal Server Error"})
    
   }
}


exports.updateAuthorbyId = async (req, res) => {
    try {
        const {id} = req.params
        const {firstName, lastName, email} = req.body

        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No fields provided to update!" });
        }

        const result = await db.update(authorTable).set(updateData).where(eq(authorTable.id, id)).returning()
        return res.status(200).json({message: "Author updated successfully", result: result})
    } catch (error) {
        console.error("Error updating author:", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}



exports.deleteAuthorById = async (req, res) => {
    try {
        const {id} = req.params

        const books = await db.select().from(bookTable).where(eq(bookTable.authorid, id))

        if(books.length > 0){
            return res.status(400).json({message: `Cannot delete author. Author has ${books.length} books associated. You must delete the books first.`})
        }
        const result = await db.delete(authorTable).where(eq(authorTable.id, id)).returning()

        return res.status(200).json({message: "Author deleted successfully", result: result[0]})
    } catch (error) {
        console.error("Error deleting author:", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}