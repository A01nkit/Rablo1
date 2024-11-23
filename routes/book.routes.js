import {Router} from "express"
import { 
    getBook, 
    updateBook,
    deleteBook,
    getBooks,
    createBook,
    addCover
} from "../controllers/book.controllers.js"
import { upload } from "../middleware/multer.middleware.js"


const router = Router()


router.route("/upload-cover/:id")
.post(upload.single('coverimage'), addCover)//add cover page to a book

router.route("/:id")
.get(getBook)                           //Retrieve a book by ID
.put(updateBook)                        //Update book details.
.delete(deleteBook)                     //Remove a book.
     
router.route("")
.get(getBooks)          //Retrieve all books.
.post(createBook)       //Create a book



export default router;
