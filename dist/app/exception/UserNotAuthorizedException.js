"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class UserNotAuthorizedException extends HttpException_1.default {
    constructor(error) {
        super(403, error.MESSAGE, error.CODE);
    }
}
exports.default = UserNotAuthorizedException;
//# sourceMappingURL=UserNotAuthorizedException.js.map