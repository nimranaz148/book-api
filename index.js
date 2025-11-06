const express = require('express');
const { globalmiddleware } = require('./middlewares/globalmiddleware');
const bookRoute = require('./routes/book.route');
const authorRoute = require('./routes/author.route');

const app = express();

const PORT = 8000

// -------------------Middlewares-------------------
app.use(express.json());
app.use(globalmiddleware)


// ----------------------health check---------------------
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Book API store is running successfully",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            books: "/api/v1/books",
            author: "/api/v1/authors",
        }
    })
})

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
    })
})


// -------------------Routes-------------------
app.use("/api/v1/books", bookRoute)
app.use("/api/v1/authors", authorRoute)



app.listen(PORT, () => {
    console.log('Server is running on port 8000');
})