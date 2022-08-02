"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("../util/formatter");
const HttpException_1 = __importDefault(require("../exception/HttpException"));
const fmt = new formatter_1.Formatter();
const errorMiddleware = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const errorCode = error.errorCode || "ERROR_CODE_NOT_FOUND";
    const validationErrors = error.validationErrors;
    response
        .status(status)
        .send(fmt.formatResponse(new HttpException_1.default(status, message, errorCode, validationErrors), 0, message));
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map