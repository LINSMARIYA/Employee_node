import { Employee } from "../entities/Employee";
export declare class EmployeeRespository {
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    updateEmployeeDetails(employeeId: string, employeeDetails: Employee): Promise<import("typeorm").UpdateResult>;
    softDeleteEmployee(employee: Employee): Promise<Employee>;
    saveEmployeeDetails(employeeDetails: Employee): Promise<Employee>;
    getEmployeeByUserName(username: string): Promise<Employee>;
}
