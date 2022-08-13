import { Employee } from "../entities/Employee";
export declare class EmployeeRepository {
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    getEmployeeByRole(role: string): Promise<Employee[]>;
    updateEmployee(employeeId: Employee): Promise<Employee>;
    softDeleteEmployee(employee: Employee): Promise<Employee>;
    saveEmployeeDetails(employeeDetails: Employee): Promise<Employee>;
    getEmployeeByUserName(username: string): Promise<Employee>;
}
