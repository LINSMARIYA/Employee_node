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
const CreateDepartmentDto_1 = require("../dto/CreateDepartmentDto");
const UpdateDepartmentDto_1 = require("../dto/UpdateDepartmentDto");
const UpdateDepartmentByIdDto_1 = require("../dto/UpdateDepartmentByIdDto");
const GetDepartmentDto_1 = require("../dto/GetDepartmentDto");
const DeleteDepartmentDto_1 = require("../dto/DeleteDepartmentDto");
class DepartmentController extends controller_1.AbstractController {
    constructor(departmentService) {
        super(`${constants_1.default.apiPrefix}/department`);
        this.departmentService = departmentService;
        this.getDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.departmentService.getAllDepartments();
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.getDepartmentById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.departmentService.getDepartmentById(request.params.id);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateDepartmentById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.departmentService.updateDepartmentById(request.params.id, request.body);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteDepartmentById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.departmentService.softDeleteDepartmentById(request.params.id);
                response.status(200);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            }
            catch (error) {
                return next(error);
            }
        });
        this.createDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.departmentService.createDepartment(request.body);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
            }
            catch (err) {
                next(err);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.getDepartment);
        this.router.get(`${this.path}/:id`, (0, validationMiddleware_1.default)(GetDepartmentDto_1.GetDepartmentDto, constants_1.default.params), this.getDepartmentById);
        this.router.put(`${this.path}/:id`, (0, validationMiddleware_1.default)(UpdateDepartmentByIdDto_1.UpdateDepartmentByIdDto, constants_1.default.params), (0, validationMiddleware_1.default)(UpdateDepartmentDto_1.UpdateDepartmentDto, constants_1.default.params), this.updateDepartmentById);
        this.router.delete(`${this.path}/:id`, (0, validationMiddleware_1.default)(DeleteDepartmentDto_1.DeleteDepartmentDto, constants_1.default.params), this.deleteDepartmentById);
        this.router.post(`${this.path}`, (0, validationMiddleware_1.default)(CreateDepartmentDto_1.CreateDepartmentDto, constants_1.default.body), this.createDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map