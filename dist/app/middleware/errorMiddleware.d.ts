import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";
declare const errorMiddleware: (error: HttpException, request: Request, response: Response, next: NextFunction) => void;
export default errorMiddleware;
