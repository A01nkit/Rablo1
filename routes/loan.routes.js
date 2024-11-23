import { Router } from "express";
import { 
    getLoans,
    createLoan,
    deleteLoan,
    updateLoan
} from "../controllers/loan.controllers.js";


const router = Router()

router.route("/:id")
.put(updateLoan)
.delete(deleteLoan)

router.route("")
.get(getLoans)
.post(createLoan)

export default router;