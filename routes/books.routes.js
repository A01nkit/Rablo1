import {Router} from "express"
import { 
    getBook, 
    updateBook,
    deleteBook,
    getBooks,
    createBook
} from "../controllers/books.controllers"


const router = Router()

router.route("/:id")
.get(getBook)//Retrieve a book by ID
.put(updateBook)//Update book details.
.delete(deleteBook)//Remove a book.

router.route("")
.get(getBooks)//Retrieve all books.
.post(createBook)//Add a new book.



export default router;
