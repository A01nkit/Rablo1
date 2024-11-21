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


router.route("/:id/upload-cover")
.post(upload.single('coverimage'), addCover)

router.route("/:id")
.get(getBook)                           //Retrieve a book by ID
.put(updateBook)                        //Update book details.
.delete(deleteBook)                     //Remove a book.
     
router.route("")
.get(getBooks)          //Retrieve all books.
.post(createBook)



export default router;
