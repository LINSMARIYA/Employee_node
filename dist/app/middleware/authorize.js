"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserNotAuthorizedException_1 = __importDefault(require("../exception/UserNotAuthorizedException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
const authorize = (permittedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = getTokenFromRequestHeader(req);
            jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
            const data = jsonwebtoken_1.default.decode(token);
            const decodedData = JSON.parse(JSON.stringify(data));
            if (!(permittedRoles.includes(decodedData.role))) {
                throw new UserNotAuthorizedException_1.default();
            }
            const det = JSON.parse(JSON.stringify(data));
            return next();
        }
        catch (error) {
            return next(new UserNotAuthorizedException_1.default());
        }
    });
};
const getTokenFromRequestHeader = (req) => {
    const tokenWithBearerHeader = req.header(`${constants_1.default.authorizationHeader}`);
    if (tokenWithBearerHeader) {
        return tokenWithBearerHeader.replace(`${constants_1.default.bearer} `, "");
    }
    return "";
};
exports.default = authorize;
//# sourceMappingURL=authorize.js.map