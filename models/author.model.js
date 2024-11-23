import mongoose, {Schema} from "mongoose";
 
const authorSchema = new Schema({
    authorId: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    },
    /*assets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ]*/
},
{
    timestamps: true
})


export const Author = mongoose.model("Author", authorSchema)