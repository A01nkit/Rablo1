import { asyncHandler } from "../utils/asyncHandler.js";
import { Author } from "../models/author.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 
   
export const getAuthor = asyncHandler( async (req, res) => {
    //fetching id from url
    const authorid = req.params['id']
    const existedAuthor = await Author.findOne({authorId: authorid})

    //if author do not exist
    if(!existedAuthor) {
        throw new ApiError(409, "Author do not exist. hence, no operation can be done")
    }

    //returning the response
    return res.status(201).json(
        new ApiResponse(200, existedAuthor, "Author available and you got it")
    )

})

export const getAuthors = asyncHandler( async (req, res) => {

    const authors = await Author.find({})

    if(!authors) {
        throw new ApiError("No author available")
    }

    return res.status(201).json(
        new ApiResponse(200, authors, "Authors are available and you got it")
    )
})

export const createAuthor = asyncHandler( async (req, res) => {
    //fetching and validating
    
    const {authorid, authorname} = req.body
    
    if(
        [authorid, authorname].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check if author existed
    const existedAuthor = await Author.findOne({authorId: authorid})
    if(existedAuthor) {
        throw new ApiError(409, `Author with authorid: ${authorid} exist`)
    }

    //creating author
    const author = await Author.create({
        authorId: authorid,
        authorName: authorname
    })

    const createdAuthor = await Author.findById(author._id)
    if(!createdAuthor) {
        throw new ApiError(500, "Something went wrong while creating the author")
    }
    

    return res.status(201).json(
        new ApiResponse(200, createdAuthor, "Author created successfully")
    )
})

export const deleteAuthor = asyncHandler( async (req, res) => {
    const authorid = req.params['id']

    const existedAuthor = await Author.findOne({authorId: authorid})
    
    //if author do not exist
    if(!existedAuthor) {
        throw new ApiError(409, "Author do not exist. hence, no operation can be done")
    }

    const result = await Author.deleteOne({authorId: authorid});

    if (result.deletedCount > 0) {
        console.log(`author with authorId "${authorid}" deleted.`);
        return res.status(201).json(
          new ApiResponse(200, existedAuthor, "Author deleted successfully")
        )
    } else {
        console.log(`unbale to delete author with authorId: ${authorid} from db`);
        throw new ApiError(500, "Server side error")
    }
    
})

export const updateAuthor = asyncHandler( async (req, res) => {
    
})