"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DepartmentController = void 0;
const controller_1 = require("../util/rest/controller");
const constants_1 = __importStar(require("../constants"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
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
        this.router.get(`${this.path}`, (0, authorize_1.default)([constants_1.USER_ROLES.admin, constants_1.USER_ROLES.manager, constants_1.USER_ROLES.developer, constants_1.USER_ROLES.engineer]), this.getDepartment);
        this.router.get(`${this.path}/:id`, (0, authorize_1.default)([constants_1.USER_ROLES.admin, constants_1.USER_ROLES.manager]), (0, validationMiddleware_1.default)(GetDepartmentDto_1.GetDepartmentDto, constants_1.default.params), this.getDepartmentById);
        this.router.put(`${this.path}/:id`, (0, authorize_1.default)([constants_1.USER_ROLES.admin]), (0, validationMiddleware_1.default)(UpdateDepartmentByIdDto_1.UpdateDepartmentByIdDto, constants_1.default.params), (0, validationMiddleware_1.default)(UpdateDepartmentDto_1.UpdateDepartmentDto, constants_1.default.body), this.updateDepartmentById);
        this.router.delete(`${this.path}/:id`, (0, authorize_1.default)([constants_1.USER_ROLES.admin]), (0, validationMiddleware_1.default)(DeleteDepartmentDto_1.DeleteDepartmentDto, constants_1.default.params), this.deleteDepartmentById);
        this.router.post(`${this.path}`, (0, authorize_1.default)([constants_1.USER_ROLES.admin]), (0, validationMiddleware_1.default)(CreateDepartmentDto_1.CreateDepartmentDto, constants_1.default.body), this.createDepartment);
    }
}
exports.DepartmentController = DepartmentController;
exports.default = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map