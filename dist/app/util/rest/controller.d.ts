import { NextFunction, Response, Router } from "express";
import { Formatter } from "../formatter";
import RequestWithUser from "./request";
export interface Controller {
    path: string;
    router: Router;
}
export declare abstract class AbstractController implements Controller {
    readonly path: string;
    readonly router: Router;
    protected readonly fmt: Formatter;
    constructor(path: string);
    protected abstract initializeRoutes(): void;
    protected asyncRouteHandler: (fn: (arg0: RequestWithUser, arg1: Response, arg2: NextFunction) => void) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
