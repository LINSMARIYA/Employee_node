import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";
declare class IncorrectUsernameOrPasswordException extends HttpException {
    constructor(error: CustomError);
}
export default IncorrectUsernameOrPasswordException;
