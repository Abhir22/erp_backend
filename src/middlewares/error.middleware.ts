import { Request, Response, NextFunction } from "express";
import { HttpException } from "../interfaces/http.exception";

export const errorMiddleware = async (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const status : number = error.status || 500;
        const message : string = error.message || 'Server busy';
        const errors : string | string[] = error.errors || 'Server busy';
        //Add a logger

        res.status(status).json({message, errors})
    } catch (error) {
        next(error)
    }
};
