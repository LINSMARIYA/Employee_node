"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../constants/index"));
class HttpException extends Error {
    constructor(status, message, errorCode, validationErrors) {
        super(message);
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
        this.service = index_1.default.service;
        this.validationErrors = validationErrors;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map