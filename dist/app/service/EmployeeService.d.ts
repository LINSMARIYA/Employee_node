import { Employee } from "../entities/Employee";
import { EmployeeRespository } from "../Repository/EmployeeRepository";
export declare class EmployeeService {
    private employeeRepo;
    constructor(employeeRepo: EmployeeRespository);
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<void>;
    createEmployee(employeeDetails: any): Promise<Employee>;
    updateEmployeeById(id: string, employeeDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteEmployeeById(id: string): Promise<import("typeorm").UpdateResult>;
    employeeLogin: (name: string, password: string) => Promise<{
        idToken: string;
        employeeDetails: Employee;
    }>;
    private generateAuthTokens;
}
