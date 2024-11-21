import {Router} from "express"
import { 
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    createUser,
    addPictures
} from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.middleware.js"


const router = Router()

router.route("/upload-profile-picture/:id")
.post(upload(), addPictures)

router.route("/:id")
.get(getUser)                           //Retrieve a user by ID
.put(updateUser)                        //Update user details.
.delete(deleteUser)                     //Remove a user.
     
router.route("")
.get(getUsers)          //Retrieve all users.
.post(createUser)       //Create a user.