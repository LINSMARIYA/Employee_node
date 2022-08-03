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
exports.DepartmentService = void 0;
const class_transformer_1 = require("class-transformer");
const Department_1 = require("../entities/Department");
const HttpException_1 = __importDefault(require("../exception/HttpException"));
class DepartmentService {
    constructor(departmentRepo) {
        this.departmentRepo = departmentRepo;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepo.getAllDepartments();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepo.getDepartmentById(id);
        });
    }
    createDepartment(departmentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDepartment = (0, class_transformer_1.plainToClass)(Department_1.Department, {
                    name: departmentDetails.name,
                });
                const save = yield this.departmentRepo.saveDepartmentDetails(newDepartment);
                return save;
            }
            catch (err) {
                throw new HttpException_1.default(400, "Failed to create department", "code-400");
            }
        });
    }
    updateDepartmentById(id, departmentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDepartment = (0, class_transformer_1.plainToClass)(Department_1.Department, {
                    name: departmentDetails.name,
                });
                const save = yield this.departmentRepo.updateDepartmentDetails(id, updatedDepartment);
                return save;
            }
            catch (err) {
                throw new HttpException_1.default(400, "Failed to update department", "code-400");
            }
        });
    }
    softDeleteDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepo.softDeleteDepartmentById(id);
        });
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=DepartmentService.js.map