import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";
declare class UserNotAuthorizedException extends HttpException {
    constructor(error: CustomError);
}
export default UserNotAuthorizedException;
