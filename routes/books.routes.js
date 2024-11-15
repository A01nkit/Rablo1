import {Router} from "express"

const router = Router()

router.route("/:id")
.get()//Retrieve a book by ID
.put()//Update book details.
.delete()//Remove a book.


router.route("")
.get()//Retrieve a book by ID.
.post()//Remove a book.



export default router;
