import { Request } from "express";
export default interface RequestWithUser extends Request {
    startTime?: number;
    userAgent?: {
        [key: string]: any;
    };
}
