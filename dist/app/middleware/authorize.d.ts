import express from "express";
import RequestWithUser from "../util/rest/request";
declare const authorize: (permittedRoles?: string[]) => (req: RequestWithUser, res: express.Response, next: express.NextFunction) => Promise<void>;
export default authorize;
