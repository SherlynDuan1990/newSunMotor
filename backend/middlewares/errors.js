const ErrorHandler=require("../utils/errorHandler");


module.exports =(err, req, res, next) => {
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error";

        if (process.env.NODE_ENV === "DEVELOPMENT") {
            res.status(err.statusCode).json({
                success:false,
                error:err,
                errMessage:err.message,
                stack: err.stack
            })
        }

        if (process.env.NODE_ENV === "PRODUCTION") {
            let error={...err}
            error.message=err.message;

             //wrong mongoose object id

            if (err.name==="CastError") {
                const message=`Resource not found. Invalid :${err.path}`
                error=new ErrorHandler(message, 400)
            }

            //handle mongoose validation
            if (err.name==="ValidationError") {
                const message=Object.values(err.errors).map(value=>value.message);
                error=new ErrorHandler(message, 400)
            }

            //handle mongoose duplicate key error
            if (err.code===11000) {
                const message=`Duplicate ${Object.keys(err.keyvalue)} entered`
                error=new ErrorHandler(message, 400)
            }

            //handle wrong jwt error
            if (err.name==="JsonWebTokenError") {
                const message="JSON web token is invalid, try again"
                error=new ErrorHandler(message, 400)
            }

            //handle expired jwt error
            if (err.name==="TokenExpiredError") {
                const message="JSON web token is expired, try again"
                error=new ErrorHandler(message, 400)
            }

            res.status(err.statusCode).json({
                success:false,
                message:error.message || "internal server error"
            })
    }
}