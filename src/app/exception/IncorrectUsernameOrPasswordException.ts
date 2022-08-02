import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    super(401, ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR.MESSAGE, ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;
