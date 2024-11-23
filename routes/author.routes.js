import { Router } from "express";
import { 
    getAuthor,
    getAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
} from "../controllers/author.controllers.js";    

const router = Router()

router.route("/:id")
.get(getAuthor)//Retrieve a author by ID
.put(updateAuthor)//Update author details.
.delete(deleteAuthor)//Remove a author.

router.route("")
.get(getAuthors)//Retrieve all authors.
.post(createAuthor)//Add a new author.



export default router;