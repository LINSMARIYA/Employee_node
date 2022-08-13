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
exports.EmployeeRepository = void 0;
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entities/Employee");
class EmployeeRepository {
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.find();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.findOne({
                where: {
                    id,
                },
                relations: ['address'],
            });
        });
    }
    getEmployeeByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.find({
                where: {
                    role
                },
            });
        });
    }
    updateEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            const data = yield employeeRepo.save(employeeId);
            return data;
        });
    }
    softDeleteEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.softRemove(employee);
        });
    }
    saveEmployeeDetails(employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.save(employeeDetails);
        });
    }
    getEmployeeByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            const employeeDetail = yield employeeRepo.findOne({
                where: { username: username },
            });
            return employeeDetail;
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map