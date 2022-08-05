import { Employee } from "../entities/Employee";
import { EmployeeRepository } from "../Repository/EmployeeRepository";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
export declare class EmployeeService {
    private employeeRepo;
    constructor(employeeRepo: EmployeeRepository);
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    createEmployee(employeeDetails: CreateEmployeeDto): Promise<Employee>;
    updateEmployeeById(id: string, employeeDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteEmployee(id: string): Promise<void>;
    employeeLogin: (name: string, password: string) => Promise<{
        idToken: string;
        employeeDetails: Employee;
    }>;
    private generateAuthTokens;
}
