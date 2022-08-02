"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class EntityNotFoundException extends HttpException_1.default {
    constructor(error) {
        super(404, error.MESSAGE, error.CODE);
    }
}
exports.default = EntityNotFoundException;
//# sourceMappingURL=EntityNotFoundException.js.map