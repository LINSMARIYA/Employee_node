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
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const CreateEmployeeDto_1 = require("../dto/CreateEmployeeDto");
const GetEmployeeDto_1 = require("../dto/GetEmployeeDto");
const UpdateEmployeeDto_1 = require("../dto/UpdateEmployeeDto");
const DeleteEmployeeDto_1 = require("../dto/DeleteEmployeeDto");
const IdDto_1 = require("../dto/IdDto");
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
        this.getEmployeeByRole = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.getEmployeeByRole(request.params.role);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.updateEmployee(request.body, request.params.id);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployeeById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.softDeleteEmployee(request.params.id);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.createEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.createEmployee(request.body);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = request.body;
                const loginDetail = yield this.employeeService.employeeLogin(loginData.username, loginData.password);
                response.send(this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.getEmployee);
        this.router.get(`${this.path}/:role`, this.getEmployeeByRole);
        console.log("Hello");
        this.router.get(`${this.path}/:id`, (0, validationMiddleware_1.default)(GetEmployeeDto_1.GetEmployeeDto, constants_1.default.params), this.getEmployeeById);
        this.router.put(`${this.path}/:id`, (0, validationMiddleware_1.default)(IdDto_1.IdDto, constants_1.default.params), (0, validationMiddleware_1.default)(UpdateEmployeeDto_1.UpdateEmployeeDto, constants_1.default.body), this.updateEmployee);
        this.router.delete(`${this.path}/:id`, (0, validationMiddleware_1.default)(DeleteEmployeeDto_1.DeleteEmployeeDto, constants_1.default.params), this.deleteEmployeeById);
        this.router.post(`${this.path}`, (0, validationMiddleware_1.default)(CreateEmployeeDto_1.CreateEmployeeDto, constants_1.default.body), this.createEmployee);
        this.router.post(`${this.path}/login`, this.login);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map