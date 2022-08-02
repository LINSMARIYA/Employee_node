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
require("./config");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const controller_1 = __importDefault(require("./controller"));
const rdbms_1 = __importDefault(require("./config/rdbms"));
process.on("uncaughtException", (e) => {
    process.exit(1);
});
process.on("unhandledRejection", (e) => {
    process.exit(1);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)(rdbms_1.default);
    }
    catch (error) {
        process.exit(1);
    }
    const app = new app_1.default(controller_1.default);
    app.listen();
}))();
//# sourceMappingURL=server.js.map