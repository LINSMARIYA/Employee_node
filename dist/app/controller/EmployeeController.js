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
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entities/Employee");
const authorize_1 = __importDefault(require("../middleware/authorize"));
const GetEmployeeDto_1 = require("../dto/GetEmployeeDto");
const UpdateEmployeeDto_1 = require("../dto/UpdateEmployeeDto");
const DeleteEmployeeDto_1 = require("../dto/DeleteEmployeeDto");
const UpdateEmployeeByIdDto_1 = require("../dto/UpdateEmployeeByIdDto");
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
        this.router.get(`${this.path}`, (0, authorize_1.default)(["APP_CONSTANTS.sde,APP_CONSTANTS.admin"]), this.getEmployee);
        this.router.get(`${this.path}/:id`, (0, authorize_1.default)(["APP_CONSTANTS.sde,APP_CONSTANTS.admin"]), (0, validationMiddleware_1.default)(GetEmployeeDto_1.GetEmployeeDto, constants_1.default.params), this.getEmployeeById);
        this.router.put(`${this.path}/:id`, (0, authorize_1.default)([constants_1.default.admin]), (0, validationMiddleware_1.default)(UpdateEmployeeByIdDto_1.UpdateEmployeeByIdDto, constants_1.default.params), (0, validationMiddleware_1.default)(UpdateEmployeeDto_1.UpdateEmployeeDto, constants_1.default.body), this.updateEmployeeById);
        this.router.delete(`${this.path}/:id`, (0, authorize_1.default)([constants_1.default.admin]), (0, validationMiddleware_1.default)(DeleteEmployeeDto_1.DeleteEmployeeDto, constants_1.default.params), this.deleteEmployeeById);
        this.router.post(`${this.path}`, (0, authorize_1.default)(["APP_CONSTANTS.admin"]), (0, validationMiddleware_1.default)(CreateEmployeeDto_1.CreateEmployeeDto, constants_1.default.body), this.createEmployee);
        this.router.post(`${this.path}/login`, this.login);
    }
    getEmployeeByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            const employeeDetail = yield employeeRepo.findOne({
                where: { name: userName },
            });
            return employeeDetail;
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map