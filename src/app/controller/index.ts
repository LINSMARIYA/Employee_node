/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentRepository } from "../Repository/DepartmentRepository";
import { EmployeeRepository } from "../Repository/EmployeeRepository";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(
    new EmployeeService(
      new EmployeeRepository()
    )
  ),
  new DepartmentController(new DepartmentService(new DepartmentRepository()))
];
