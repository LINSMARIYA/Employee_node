"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
class App extends events_1.EventEmitter {
    constructor(controllers) {
        super();
        this.app = (0, express_1.default)();
        this.app.use(cors());
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializaErrorHandling();
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on ${process.env.PORT}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.static('public'));
        this.app.use((request, response, next) => {
            request.startTime = Date.now();
            next();
        });
    }
    initializaErrorHandling() {
        this.app.use(errorMiddleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map