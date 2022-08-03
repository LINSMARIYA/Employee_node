"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class IncorrectUsernameOrPasswordException extends HttpException_1.default {
    constructor(error) {
        super(401, error.MESSAGE, error.CODE);
    }
}
exports.default = IncorrectUsernameOrPasswordException;
//# sourceMappingURL=IncorrectUsernameOrPasswordException.js.map