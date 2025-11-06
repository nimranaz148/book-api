
const { pgTable,uuid, varchar,index, text} = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");
const authorTable = require("./author.model");

const bookTable = pgTable("booklibrary", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    authorid: uuid().references(() => authorTable.id).notNull()
}, (table)=> ([
  index('title_index').using('gin', sql`to_tsvector('english', ${table.title})`),
]))

module.exports = bookTable