import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})


export const User = mongoose.model('User', userSchema)