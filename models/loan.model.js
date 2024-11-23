import mongoose, {Schema} from "mongoose"

const loanSchema = new Schema({
    loanId: {
        type: String,
        required: true,
        unique: true
    },
    loanOwner: {
        type: String,
        required: true
    }/*,
    loanbooks: {
        type:
        ref:
    }
    */
},
{
    timestamps: true
})

export const Loan = mongoose.model("Loan", loanSchema)
