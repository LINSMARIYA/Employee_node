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
const controller_1 = require("../util/rest/controller");
const constants_1 = __importDefault(require("../constants"));
class EmployeeController extends controller_1.AbstractController {
    constructor(employeeService) {
        super(`${constants_1.default.apiPrefix}/employee`);
        this.employeeService = employeeService;
        this.getEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.getAllEmployees();
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.getEmployeeById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.getEmployeeById(request.params.id);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateEmployeeById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.updateEmployeeById(request.params.id, request.body);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteEmployeeById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.softDeleteEmployeeById(request.params.id);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.createEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(request.body);
            try {
                const data = yield this.employeeService.createEmployee(request.body);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
            }
            catch (err) {
                next(err);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.getEmployee);
        this.router.get(`${this.path}/:id`, this.getEmployeeById);
        this.router.put(`${this.path}/:id`, this.updateEmployeeById);
        this.router.delete(`${this.path}/:id`, this.deleteEmployeeById);
        this.router.post(`${this.path}`, this.createEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map