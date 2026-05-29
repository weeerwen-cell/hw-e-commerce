import {Request, Response, NextFunction, RequestHandler} from 'express'

export const asyncHandler =(fn: RequestHandler)=>
    (req: Request,
     res: Response,
     next:NextFunction   
    )=>{
      Promise.resolve(fn(req,res, next)).catch(next)  
}

// const asyncHandler(fn) <-receive function first agrument 
//(req, res, next) return fucntion 
// tutrn controller become Promise
// .catch error
//if controller got error turn next error
// get into middleware