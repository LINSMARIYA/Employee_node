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
exports.EmployeeService = void 0;
const class_transformer_1 = require("class-transformer");
const Employee_1 = require("../entities/Employee");
const EntityNotFoundException_1 = __importDefault(require("../exception/EntityNotFoundException"));
const HttpException_1 = __importDefault(require("../exception/HttpException"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorCode_1 = require("../util/errorCode");
const UserNotAuthorizedException_1 = __importDefault(require("../exception/UserNotAuthorizedException"));
const IncorrectUsernameOrPasswordException_1 = __importDefault(require("../exception/IncorrectUsernameOrPasswordException"));
class EmployeeService {
    constructor(employeeRepo) {
        this.employeeRepo = employeeRepo;
        this.employeeLogin = (name, password) => __awaiter(this, void 0, void 0, function* () {
            const employeeDetails = yield this.employeeRepo.getEmployeeByName(name);
            if (!employeeDetails) {
                throw new UserNotAuthorizedException_1.default();
            }
            const validPassword = yield bcrypt_1.default.compare(password, employeeDetails.password);
            if (validPassword) {
                let payload = {
                    "custom:id": employeeDetails.id,
                    "custom:name": employeeDetails.name,
                    "custom:role": employeeDetails.role,
                };
                const token = this.generateAuthTokens(payload);
                return {
                    idToken: token,
                    employeeDetails,
                };
            }
            else {
                throw new IncorrectUsernameOrPasswordException_1.default(errorCode_1.ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR);
            }
        });
        this.generateAuthTokens = (payload) => {
            return jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN_SECRET, {
                expiresIn: process.env.ID_TOKEN_VALIDITY,
            });
        };
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepo.getAllEmployees();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepo.getEmployeeById(id);
            if (!employee) {
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            }
        });
    }
    createEmployee(employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmployee = (0, class_transformer_1.plainToClass)(Employee_1.Employee, {
                    name: employeeDetails.name,
                    username: employeeDetails.username,
                    status: employeeDetails.status,
                    role: employeeDetails.role,
                    departmentId: employeeDetails.departmentId,
                    doj: employeeDetails.doj,
                    experience: employeeDetails.experience,
                    password: employeeDetails.password ? yield bcrypt_1.default.hash(employeeDetails.password, 10) : '',
                });
                const save = yield this.employeeRepo.saveEmployeeDetails(newEmployee);
                return save;
            }
            catch (err) {
                throw new HttpException_1.default(400, "Failed to create employee", "code-400");
            }
        });
    }
    updateEmployeeById(id, employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedEmployee = (0, class_transformer_1.plainToClass)(Employee_1.Employee, {
                    name: employeeDetails.name,
                    departmentId: employeeDetails.departmentId,
                });
                const save = yield this.employeeRepo.updateEmployeeDetails(id, updatedEmployee);
                return save;
            }
            catch (err) {
                throw new HttpException_1.default(400, "Failed to create employee", "code-400");
            }
        });
    }
    softDeleteEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepo.softDeleteEmployeeById(id);
        });
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map