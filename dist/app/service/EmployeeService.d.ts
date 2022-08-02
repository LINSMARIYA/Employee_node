import { Employee } from "../entities/Employee";
import { EmployeeRespository } from "../Repository/EmployeeRepository";
export declare class EmployeeService {
    private employeeRepo;
    constructor(employeeRepo: EmployeeRespository);
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    createEmployee(employeeDetails: any): Promise<Employee>;
    updateEmployeeById(id: string, employeeDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteEmployeeById(id: string): Promise<import("typeorm").UpdateResult>;
}
