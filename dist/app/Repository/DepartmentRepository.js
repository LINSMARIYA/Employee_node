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
exports.DepartmentRespository = void 0;
const typeorm_1 = require("typeorm");
const Department_1 = require("../entities/Department");
class DepartmentRespository {
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepo = (0, typeorm_1.getConnection)().getRepository(Department_1.Department);
            return departmentRepo.find();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepo = (0, typeorm_1.getConnection)().getRepository(Department_1.Department);
            return departmentRepo.findOne(id);
        });
    }
    updateDepartmentDetails(departmentId, departmentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepo = (0, typeorm_1.getConnection)().getRepository(Department_1.Department);
            const updateDepartmentDetails = yield departmentRepo.update({ id: departmentId, deletedAt: null }, {
                name: departmentDetails.name ? departmentDetails.name : undefined,
            });
            return updateDepartmentDetails;
        });
    }
    softDeleteDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepo = (0, typeorm_1.getConnection)().getRepository(Department_1.Department);
            return departmentRepo.softDelete({
                id,
            });
        });
    }
    saveDepartmentDetails(departmentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepo = (0, typeorm_1.getConnection)().getRepository(Department_1.Department);
            return departmentRepo.save(departmentDetails);
        });
    }
}
exports.DepartmentRespository = DepartmentRespository;
//# sourceMappingURL=DepartmentRepository.js.map