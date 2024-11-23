import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";








export const getUser = asyncHandler( async (req, res) => {
    const userid = req.params['id']
    const existedUser = await User.findOne({userId: userid})
    console.log(typeof existedUser);
    if(!existedUser) {
        throw new ApiError(409, "User do not exist. hence, no operation can be done")
    }

    return res.status(201).json(
        new ApiResponse(200, existedUser, "User is available and you got it")
    )
})

export const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find({})
    console.log(typeof users);
    if(!users) {
        throw new ApiError(409, "No user available")
    }

    return res.status(201).json(
        new ApiResponse(200, users, "Users are available and you got it")
    )
})

export const createUser = asyncHandler( async (req, res) => {
    //Getting user details and validating
    const {userid, firstname, secondname} = req.body// req and res are objects
    
    if (
        [userid, firstname, secondname].some((field) => 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //Check if user existed
    const existedUser= await User.findOne({userId: userid})
    if(existedUser) {
        throw new ApiError(409, `user with userid: ${userid} exist`)
    }

    //Create user object- creating entry call in db
    const user = await User.create({
        userId: userid,
        firstName: firstname,
        secondName: secondname
    })

    const createdUser = await User.findById(user._id)

    //check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while User creation")
    }

    //return res if created 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
})

export const deleteUser = asyncHandler( async (req, res) => {
    const userid = req.params['id']
    const existedUser = await User.findOne({userId: userid})
    
    //If User do not exist
    if(!existedUser) {
        throw new ApiError(409, "User do not exist. hence, no operation can be done")
    }

    //If User exist
    const result = await User.deleteOne({userId: userid});

    if (result.deletedCount > 0) {
        console.log(`User with userId "${userid}" deleted.`);
        return res.status(201).json(
          new ApiResponse(200, existedUser, "User deleted successfully")
        )
    } else {
        console.log(`unbale to delete user with userId: ${userid} from db`);
        throw new ApiError(500, "Server side error")
    }
})

export const updateUser = asyncHandler( async (req, res) => {
    
})

export const addPicture = asyncHandler( async (req, res) => {
    
})

