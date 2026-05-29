import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (
    (err: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.status || 500;
        //error middleware catch all the error global 

        //pass status into res.status
        res.status(statusCode).json({
            message: err.message || " internal server error"
        })
    })

