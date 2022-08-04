import { Employee } from "../entities/Employee";
export declare class EmployeeRespository {
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    updateEmployeeDetails(employeeId: string, employeeDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteEmployeeById(employee: Employee): Promise<Employee>;
    saveEmployeeDetails(employeeDetails: Employee): Promise<Employee>;
    getEmployeeByUserName(username: string): Promise<Employee>;
}
