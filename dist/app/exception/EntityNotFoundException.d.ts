import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";
declare class EntityNotFoundException extends HttpException {
    constructor(error: CustomError);
}
export default EntityNotFoundException;
