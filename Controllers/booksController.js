const { set } = require('mongoose');
let Book = require('../Schema/booksSchema')

let addBook = async (req, res, next) => {
    console.log('adding new book');
    try {
        let { title, author, language, category, publisher, edition, price, numberOfPieces } = req.body
        if (title, author, language, category, publisher, edition, price, numberOfPieces) {
            title = title.toUpperCase();
            // author = author.toLowerCase();
            // language = language.toLowerCase();
            // category = category.toLowerCase();
            // publisher = publisher.toLowerCase();

            let book = await Book.create({ title, author, language, category, publisher, edition, price, numberOfPieces })
            console.log(book);
            res.json({ error: false, message: "new book added to database successfully", book })
        } else {
            res.json({ error: true, message: "Send all data" })
        }

    } catch (error) {
        next(error)
    }
}

let getBook = async (req, res, next) => {
    console.log('fetching single book data');
    try {
        let { id } = req.params
        let book = await Book.findById(id)
        console.log(book);
        res.json({ error: false, message: "Book detals fetched successfully", book: book })
    } catch (error) {
        next(error)
    }
}

let fetchAllBooks = async (req, res, next) => {
    console.log('fetching all books data');
    try {
        let books = await Book.find()
        console.log(books);
        res.json({ error: false, message: "fetched all book data", books: books })
    } catch (error) {
        next(error)
    }
}

let updateBookeDetails = async (req, res, next) => {
    console.log("updating a book data");
    try {
        let { id } = req.params;
        console.log(id);
        let { title, author, language, category, publisher, edition, price, numberOfPieces } = req.body

        title = title.toUpperCase();
        // author = author.toLowerCase();
        // language = language.toLowerCase();
        // category = category.toLowerCase();
        // publisher = publisher.toLowerCase();

        let book = await Book.findByIdAndUpdate(id)
        console.log(book);
        if (!book) {
            res.json({ error: true, message: "book not found for this id" })
        } else {
            let updatedBookDetails = await Book.updateOne({ _id: id }, { title, author, language, category, publisher, edition, price }, { new: true })
            res.json({ error: false, message: "Book details updated successfully", book: book })
        }
    } catch (error) {
        next(error)
    }
}

let deleteBook = async (req, res, next) => {
    console.log('deleting one book');
    try {
        let { id } = req.params
        let book = await Book.findById(id)
        if (!book) {
            res.json({ error: true, message: "not found a book for this id" })
        } else {
            let bookDeleted = await Book.deleteOne({ _id: id })
            res.json({ error: false, message: "Books details deleted successfully", book: book })
        }
    } catch (error) {
        next(error)
    }
}

let fetchAllAuthors = async (req, res, next) => {
    console.log('fetching all authers name');
    try {
        let authors = await Book.distinct("author")
        console.log(authors);
        if (authors.length) {
            res.status(200).json({ error: false, meassage: "fetched all authors name", authors })
        } else {
            res.json({ error: true, message: "no authors found" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchTenAuthorsList = async (req, res, next) => {
    console.log('fetching ten authors name');
    try {
        let authors = await Book.distinct("author")
        let tenAuthorsList = authors.slice(0, 10)
        console.log(tenAuthorsList);
        if (tenAuthorsList.length) {
            res.status(200).json({ error: false, meassage: "fetched ten authors name", tenAuthorsList })
        } else {
            res.json({ error: true, message: "no authors found" })
        }

    } catch (error) {
        next(error)
    }
}

let fetchCategories = async (req, res, next) => {
    console.log('fetching all categories(genere) name');
    try {
        let categories = await Book.distinct("category")
        console.log(categories);
        if (categories.length) {
            res.json({ error: false, meassage: "fetched all categories name", categories: categories })
        } else {
            res.json({ error: true, message: "No categories" })
        }

    } catch (error) {
        next(error)
    }
}

let fetchBooksByTitle = async (req, res, next) => {
    console.log('fetching books by its title');
    try {
        let { title } = req.query
        console.log(title);
        title = title.toUpperCase()
        console.log(title);
        let exactBooks = await Book.find({ title: title })
        console.log(exactBooks);
        let titles = await Book.distinct("title")
        console.log(titles);
        let filteredTitles = titles.filter((titleFromDB) => {
            return titleFromDB.includes(title)
        })
        console.log(filteredTitles);
        filteredTitles = filteredTitles.filter((filteredTitle) => {
            return filteredTitle !== title
        })
        console.log(filteredTitles);
        let filteredBooks = await Book.find({ title: { $in: [...filteredTitles] } })
        console.log(filteredBooks);
        let totalBooksByTitle = [...exactBooks, ...filteredBooks]
        console.log(totalBooksByTitle);
        if (totalBooksByTitle.length) {
            totalBooksByTitle = [...new Set(totalBooksByTitle)]
            console.log('Response array');
            console.log(totalBooksByTitle);
            res.json({ error: false, message: "fetched books by its title", books: totalBooksByTitle })
        } else {
            res.json({ error: true, message: "no books found by its title" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchBooksByAuthor = async (req, res, next) => {
    console.log('fetching books by its author name');
    try {
        // console.log(req.query.author);
        let author = req.query.author
        console.log(author);
        let books = await Book.find({ author: author })
        console.log(books);
        if (books.length) {
            res.json({ error: false, message: "fetched books by it's author name", books: books })
        } else {
            res.json({ error: true, message: "No books for this author" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchBooksByCategory = async (req, res, next) => {
    console.log('fetching books by its category(genere)');
    try {
        let category = req.query.category
        console.log(category);
        // let {category} = req.body
        let books = await Book.find({ category: category })
        console.log(books);
        if (books.length) {
            res.json({ error: false, message: "fetched books by it's category(genere)", books: books })
        } else {
            res.json({ error: true, message: "No books for this category" })
        }

    } catch (error) {
        next(error)
    }
}

let fetchAllLanguages = async (req, res, next) => {
    try {
        let languages = await Book.distinct("language")
        if (languages.length) {
            res.status(200).json({ error: false, message: "Fetching all languages", languages })
        } else {
            res.json({ error: true, message: "No languages" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchBooksByLanguage = async (req, res, next) => {
    try {
        console.log("Fteching books by languae");
        let { language } = req.query
        let books = await Book.find({ language: language })
        if (books.length) {
            res.status(200).json({ error: false, message: "fetched all books by language", books })
        } else {
            res.json({ error: true, message: "No books for this language" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchAllPublisher = async (req, res, next) => {
    try {
        let publishers = await Book.distinct("publisher")
        if (publishers.length) {
            res.status(200).json({ error: false, message: "Fetching all publishers", publishers })
        } else {
            res.json({ error: true, message: "No publishers" })
        }
    } catch (error) {
        next(error)
    }
}

let fetchBooksByPublishers = async (req, res, next) => {
    console.log("Fteching books by publisher");
    try {
        let { publisher } = req.query
        console.log(publisher);
        let books = await Book.find({ publisher: publisher })
        console.log(books);
        if (books.length) {
            res.status(200).json({ error: false, message: "fetched all books by publisher", books })
        } else {
            res.json({ error: true, message: "No books for this publisher" })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addBook,
    getBook,
    fetchAllBooks,
    updateBookeDetails,
    deleteBook,
    fetchAllAuthors,
    fetchTenAuthorsList,
    fetchCategories,
    fetchBooksByTitle,
    fetchBooksByAuthor,
    fetchBooksByCategory,
    fetchAllLanguages,
    fetchBooksByLanguage,
    fetchAllPublisher,
    fetchBooksByPublishers
}