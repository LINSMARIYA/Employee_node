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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
const express_1 = require("express");
const formatter_1 = require("../formatter");
class AbstractController {
    constructor(path) {
        this.router = (0, express_1.Router)();
        this.asyncRouteHandler = (fn) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fn(req, res, next);
                    next();
                }
                catch (error) {
                    next(error);
                }
            });
        };
        this.path = path;
        this.fmt = new formatter_1.Formatter();
    }
}
exports.AbstractController = AbstractController;
//# sourceMappingURL=controller.js.map