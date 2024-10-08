let express = require('express')
let router = express.Router()

let { addBook, getBook, fetchAllBooks, updateBookeDetails, deleteBook, fetchAllAuthors, fetchCategories, fetchBooksByTitle, fetchBooksByAuthor, fetchBooksByCategory } = require('../Controllers/booksController')

router.post('/addBook', addBook)
router.get('/getBook/:id', getBook)
router.get('/allBooks', fetchAllBooks)
router.put('/updateBook/:id', updateBookeDetails)
router.delete('/deleteBook/:id', deleteBook)
router.get('/allAuthors', fetchAllAuthors)
router.get('/allCategories', fetchCategories)
router.get('/booksByTitle', fetchBooksByTitle)
router.get('/booksByAuthor', fetchBooksByAuthor)
router.get('/booksByCategory', fetchBooksByCategory)

module.exports = router