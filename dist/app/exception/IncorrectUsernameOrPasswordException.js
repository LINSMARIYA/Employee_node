"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
const errorCode_1 = require("../util/errorCode");
class IncorrectUsernameOrPasswordException extends HttpException_1.default {
    constructor() {
        super(401, errorCode_1.ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR.MESSAGE, errorCode_1.ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR.CODE);
    }
}
exports.default = IncorrectUsernameOrPasswordException;
//# sourceMappingURL=IncorrectUsernameOrPasswordException.js.map