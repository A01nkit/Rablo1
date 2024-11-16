import { asyncHandler } from "../utils/asyncHandler";
import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";





    


export const getBook = asyncHandler( async (req, res) => {
    const bookid = req.params['id']
    const existedBook = await Book.findOne({
        $or: [{bookid}]
    })

    if(!existedBook) {
        throw new ApiError(409, "Book do not exist. hence, no operation can be done")
    }

    return res.status(201).json(
        new ApiResponse(200, existedBook, "Book is available and you got it")
    )
})

export const getBooks = asyncHandler( async (req, res) => {
    const books = await Book.find({})

    if(!books) {
        throw new ApiError(409, "No book available")
    }

    return res.status(201).json(
        new ApiResponse(200, books, "Books are available and you got it")
    )

})

export const createBook = asyncHandler( async (req, res) => {
    
})

export const deleteBook = asyncHandler( async (req, res) => {
    const bookid = req.params['id']
    const existedBook = await Book.findOne({
        $or: [{bookid}]
    })
    //If book do not exist
    if(!existedBook) {
        throw new ApiError(409, "Book do not exist. hence, no operation can be done")
    }

    //If book exist
    const result = await Book.deleteOne({bookId: bookid});

    if (result.deletedCount > 0) {
        console.log(`Book with bookId "${bookid}" deleted.`);
        return res.status(201).json(
          new ApiResponse(200, existedBook, "Book deleted successfully")
        )
    } else {
        console.log(`unbale to delete product with productId: ${bookid} from db`);
        throw new ApiError(500, "Server side error")
    }
})

export const updateBook = asyncHandler( async (req, res) => {
    
})