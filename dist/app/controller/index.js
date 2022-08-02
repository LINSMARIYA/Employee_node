"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DepartmentRepository_1 = require("../Repository/DepartmentRepository");
const EmployeeRepository_1 = require("../Repository/EmployeeRepository");
const DepartmentService_1 = require("../service/DepartmentService");
const EmployeeService_1 = require("../service/EmployeeService");
const DepartmentController_1 = __importDefault(require("./DepartmentController"));
const EmployeeController_1 = __importDefault(require("./EmployeeController"));
const HealthController_1 = __importDefault(require("./HealthController"));
exports.default = [
    new HealthController_1.default(),
    new EmployeeController_1.default(new EmployeeService_1.EmployeeService(new EmployeeRepository_1.EmployeeRespository())),
    new DepartmentController_1.default(new DepartmentService_1.DepartmentService(new DepartmentRepository_1.DepartmentRespository()))
];
//# sourceMappingURL=index.js.map