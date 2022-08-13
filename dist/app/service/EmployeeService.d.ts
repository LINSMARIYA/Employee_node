import { Employee } from "../entities/Employee";
import { EmployeeRepository } from "../Repository/EmployeeRepository";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
export declare class EmployeeService {
    private employeeRepo;
    constructor(employeeRepo: EmployeeRepository);
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    createEmployee(employeeDetails: CreateEmployeeDto): Promise<Employee>;
    getEmployeeByRole(role: string): Promise<Employee[]>;
    softDeleteEmployee(id: string): Promise<void>;
    updateEmployee(employeeDetails: UpdateEmployeeDto, employeeId: string): Promise<Employee>;
    employeeLogin: (name: string, password: string) => Promise<{
        idToken: string;
        employeeDetails: Employee;
    }>;
    private generateAuthTokens;
}
