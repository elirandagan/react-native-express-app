import {NextFunction,Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

type UserId = {
    _id:string
}
const authMiddleware = async (req:Request,response:Response,next:NextFunction)=>{
    console.log("auth middlewear");
    console.log(req.headers);
    
    let token = await req.headers['authorization']
    
    if (token == undefined || token == null){
        console.log("token == undefined || token == null")
        return response.status(StatusCodes.FORBIDDEN).send({err: "token == undefined || token == null"})
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,userId:UserId)=>{
        if (err != null){
            console.log("jwt.verify error: " + err.message)
            return response.status(StatusCodes.FORBIDDEN).send({err:err.message })
        }
        // req.body._id = userId._id
        next()
    })
}

export = authMiddleware