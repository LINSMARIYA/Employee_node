"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
const errorCode_1 = require("../util/errorCode");
class UserNotAuthorizedException extends HttpException_1.default {
    constructor() {
        super(403, errorCode_1.ErrorCodes.UNAUTHORIZED.MESSAGE, errorCode_1.ErrorCodes.UNAUTHORIZED.CODE);
    }
}
exports.default = UserNotAuthorizedException;
//# sourceMappingURL=UserNotAuthorizedException.js.map