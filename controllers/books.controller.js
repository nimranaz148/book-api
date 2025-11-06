const { eq, sql } = require('drizzle-orm');
const db = require('../db/connection')
const bookTable = require('../models/book.model');
const authorTable = require('../models/author.model');



// -----------------get all books-----------------
exports.getallBook = async (req, res) => {
     try {
        const {search, bookId, authorId} = req.query;

        let query = db.select().from(bookTable);

     // search by title
     if(search){
      query = query.where(sql`to_tsvector('english', ${bookTable.title}) @@ plainto_tsquery('english', ${search})`);
 }

    if(bookId){
        query = query.where(eq(bookTable.id, bookId));

 }
    if(authorId){
       query = query.where(eq(bookTable.authorid, authorId));

 }
    
 const result = await query;
   return res.status(200).json({message: "Books fetched successfully", result: result})
     } catch (error) {
        console.error("Error fetching books:", error);
        return  res.status(500).json({message: "Internal Server Error"})
     }

}



// -----------------create book-----------------

exports.createBook = async (req, res) => {
   try{
     const { title, description, authorid } = req.body;

    if (!title || !description || !authorid) {
        return res.status(400).json({ message: "Title, description, and authorid are required!" });

    }
   // check if author exists
    const authorExists = await db.select().from(authorTable).where(eq(authorTable.id, authorid)).limit(1);

    if(authorExists.length === 0){
        return res.status(404).json({message: "Author not found!!"})
    }

    const result = await db.insert(bookTable).values({
        title,
        description,
        authorid
    }).returning()

    return res.status(201).json({message: "Books created successfully", result: result})

  }catch(error){
    console.error("Error creating books:", error);
    return  res.status(500).json({message: "Internal Server Error"})

   }

}

// --------------------------------UPDATE BOOK BY ID-----------
exports.updateBookById = async (req, res) => {
    try {
        const updateid = req.params.id;
        const { title, description, authorid } = req.body;

    // Check if book exists
    const existingBook = await db.select().from(bookTable).where(eq(bookTable.id, updateid)).limit(1);
    
    if (!existingBook || existingBook.length === 0) {
        return res.status(404).json({ message: "Book not found!" });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (authorid !== undefined) updateData.authorid = authorid;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No fields provided to update!" });
    }

    // Perform update
    const result = await db.update(bookTable)
        .set(updateData)
        .where(eq(bookTable.id, updateid))
        .returning({
            id: bookTable.id,
            title: bookTable.title,
            description: bookTable.description,
            authorid: bookTable.authorid
        });

    if (!result || result.length === 0) {
        return res.status(500).json({ message: "Failed to update book!" });
    }

    res.json({ 
        message: "Book updated successfully", 
        book: result[0] 
    });

    } catch (error) {
         console.error("Error updating books:", error);
         return  res.status(500).json({message: "Error updating books"})

    }
};



//----------------------------DELETE BOOK BY ID----------------------------

exports.deleteBookById = async (req, res) => {
    try {
      const deleteid = req.params.id;

      const result = await db.delete(bookTable).where(eq(bookTable.id, deleteid)).returning()

    if(!result.length == 0){
        return res.status(404).json({message: "Book not found!!"})

    }

    return res.status(200).json({message: "Book deleted!!"})

    } catch (error) {
         console.error("Error deleting books:", error);
         return  res.status(500).json({message: "Error deleting books"})

    }
}



