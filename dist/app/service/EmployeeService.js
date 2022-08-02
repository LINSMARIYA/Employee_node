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
const HttpException_1 = __importDefault(require("../exception/HttpException"));
class EmployeeService {
    constructor(employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepo.getAllEmployees();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepo.getEmployeeById(id);
        });
    }
    createEmployee(employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmployee = (0, class_transformer_1.plainToClass)(Employee_1.Employee, {
                    name: employeeDetails.name,
                    status: employeeDetails.status,
                    role: employeeDetails.role,
                    departmentId: employeeDetails.departmentId,
                    doj: employeeDetails.doj,
                    experience: employeeDetails.experience,
                    password: employeeDetails.password
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