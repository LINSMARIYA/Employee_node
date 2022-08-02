import { ValidationError } from "class-validator";
declare class HttpException extends Error {
    status: number;
    message: string;
    errorCode: string;
    service: string;
    validationErrors: ValidationError[];
    constructor(status: number, message: string, errorCode: string, validationErrors?: ValidationError[]);
}
export default HttpException;
