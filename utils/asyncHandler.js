/*
Promise based approach
*/
const asyncHandler = (requestHandler) => {
    //Accepting the method.
    //Returning the method. 
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export { asyncHandler }