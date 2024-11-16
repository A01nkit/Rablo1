import { Router } from "express";
import { 
    getAuthor,
    getAuthors,
    creaateAuthor,
    deleteAuthor,
    updateAuthor
} from "../controllers/author.controllers";    

 const router = Router()

router.route("/:id")
.get(getAuthor)//Retrieve a author by ID
.put(updateAuthor)//Update author details.
.delete(deleteAuthor)//Remove a author.

router.route("")
.get(getAuthors)//Retrieve all authors.
.post(creaateAuthor)//Add a new author.



export default router;