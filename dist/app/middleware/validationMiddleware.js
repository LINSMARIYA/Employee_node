"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = __importDefault(require("../exception/HttpException"));
const constants_1 = __importDefault(require("../constants"));
const errorCode_1 = require("../util/errorCode");
function validationMiddleware(type, parameter, skipMissingProperties = false) {
    return (req, res, next) => {
        let reqValidator;
        switch (parameter) {
            case constants_1.default.body:
                reqValidator = req.body;
                break;
            case constants_1.default.params:
                reqValidator = req.params;
                break;
        }
        const requestBody = (0, class_transformer_1.plainToClass)(type, reqValidator);
        (0, class_validator_1.validate)(requestBody, {
            skipMissingProperties,
            forbidUnknownValues: true,
            whitelist: true,
        }).then((errors) => {
            if (errors.length > 0) {
                const errorDetail = errorCode_1.ErrorCodes.VALIDATION_ERROR;
                next(new HttpException_1.default(400, errorDetail.MESSAGE, errorDetail.CODE, errors));
            }
            else {
                switch (parameter) {
                    case constants_1.default.body:
                        req.body = requestBody;
                        break;
                    case constants_1.default.params:
                        req.params = requestBody;
                        break;
                }
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map