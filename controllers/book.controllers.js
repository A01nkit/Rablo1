import { asyncHandler } from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";





    


export const getBook = asyncHandler( async (req, res) => {
    const bookid = req.params['id']
    const existedBook = await Book.findOne({bookId: bookid})
    
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
    //Getting user details and validating
    const {bookid, title, edition, price, discription} = req.body
    console.log(typeof bookid, typeof title, typeof edition, typeof price, typeof discription)
    if (
        [bookid, title, edition, price].some((field) => 
        field === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //Check if book existed
    /*
------------>the below function is not working for single entry. need to learn the below syntax
    
    const existedBook = await Book.findOne({
        $or: [{bookid}]
    })
    */
   const existedBook = await Book.findOne({bookId: bookid})
    if(existedBook) {
        throw new ApiError(409, `Book with bookid: ${bookid} exist`)
    }

    //Create book object- creating entry call in db
    const book = await Book.create({
        bookId: bookid,
        title: title,
        edition: edition,
        price: price,
        discription: discription || ""
    })

    const createdBook = await Book.findById(book._id)

    //check for book creation
    if (!createdBook) {
        throw new ApiError(500, "Something went wrong while book creation")
    }

    //return res if created 
    return res.status(201).json(
        new ApiResponse(200, createdBook, "Book created successfully")
    )

})

export const deleteBook = asyncHandler( async (req, res) => {
    const bookid = req.params['id']
    /*const existedBook = await Book.findOne({
        $or: [{bookid}]
    })*/
    const existedBook = await Book.findOne({bookId: bookid})
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
        console.log(`unbale to delete book with bookId: ${bookid} from db`);
        throw new ApiError(500, "Server side error")
    }
})

export const updateBook = asyncHandler( async (req, res) => {
    
})

export const addCover = asyncHandler( async(req, res) => {
    
})