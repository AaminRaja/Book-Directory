let express = require('express')
let router = express.Router()

let { addBook, getBook, fetchAllBooks, updateBookeDetails, deleteBook, fetchAllAuthors, fetchCategories, fetchBooksByTitle, fetchBooksByAuthor, fetchBooksByCategory, fetchTenAuthorsList, fetchAllLanguages, fetchBooksByLanguage, fetchAllPublisher, fetchBooksByPublishers } = require('../Controllers/booksController')

router.post('/addBook', addBook)
router.get('/getBook/:id', getBook)
router.get('/allBooks', fetchAllBooks)
router.put('/updateBook/:id', updateBookeDetails)
router.delete('/deleteBook/:id', deleteBook)
router.get('/allAuthors', fetchAllAuthors)
router.get('/tenAuthorsList', fetchTenAuthorsList)
router.get('/allCategories', fetchCategories)
router.get('/allLanguages', fetchAllLanguages)
router.get('/allPublishers', fetchAllPublisher)
router.get('/booksByTitle', fetchBooksByTitle)
router.get('/booksByAuthor', fetchBooksByAuthor)
router.get('/booksByCategory', fetchBooksByCategory)
router.get('/booksByLanguage', fetchBooksByLanguage)
router.get('/booksByPublisher', fetchBooksByPublishers)


module.exports = router