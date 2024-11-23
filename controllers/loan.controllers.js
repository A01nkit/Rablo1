import { asyncHandler } from "../utils/asyncHandler";
import { Loan } from "../models/loan.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const getLoans = asyncHandler( async(req, res) => {
    const loans = await Loan.find({})

    if(!loans) {
        throw new ApiError("No Loans available")
    }

    return res.status(201).json(
        new ApiResponse(200, loans, "Loans are available and you got it")
    )

})

export const createLoan = asyncHandler( async(req, res) => {
    const {loanid, loanowner} = req.body
    
    if(
        [loanid, loanowner].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check if author existed
    const existedLoan = await Loan.findOne({loanId: loanid})
    if(existedLoan) {
        throw new ApiError(409, `Loan with loanid: ${loanid} exist`)
    }

    //creating author
    const loan = await Loan.create({
        loanId: loanid,
        loanOwner: loanowner
    })

    const createdLoan = await Loan.findById(loan._id)
    if(!createdLoan) {
        throw new ApiError(500, "Something went wrong while creating the Loan")
    }
    

    return res.status(201).json(
        new ApiResponse(200, createdLoan, "Loan created successfully")
    )

})

export const deleteLoan = asyncHandler( async(req, res) => {
    const loanid = req.params['id']

    const existedLoan = await Loan.findOne({loanId: loanid})
    
    //if author do not exist
    if(!existedLoan) {
        throw new ApiError(409, "Loan do not exist. hence, no operation can be done")
    }

    const result = await Loan.deleteOne({loanId: loanid});

    if (result.deletedCount > 0) {
        console.log(`loan with loanId "${loanid}" deleted.`);
        return res.status(201).json(
          new ApiResponse(200, existedLoan, "Loan deleted successfully")
        )
    } else {
        console.log(`unbale to delete loan with loanId: ${loanid} from db`);
        throw new ApiError(500, "Server side error")
    }

})

export const updateLoan = asyncHandler( async(req, res) => {

})