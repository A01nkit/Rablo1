import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({
    bookId:{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    edition: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    },
    softCopy: {
        type: String,   //Cloudinary or AWS S3 bucket url
        required: true
    },
    bookCover: {
        type: String,   //Cloudinary or AWS S3 bucket url
        required: true  
    }
},
{
    timestamps: true
})


export const Book = mongoose.model("Book", bookSchema)