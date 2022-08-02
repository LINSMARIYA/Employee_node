import * as express from "express";
declare function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties?: boolean): express.RequestHandler;
export default validationMiddleware;
