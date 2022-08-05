import { Department } from "../entities/Department";
import { DepartmentRepository } from "../Repository/DepartmentRepository";
export declare class DepartmentService {
    private departmentRepo;
    constructor(departmentRepo: DepartmentRepository);
    getAllDepartments(): Promise<Department[]>;
    getDepartmentById(id: string): Promise<Department>;
    createDepartment(departmentDetails: any): Promise<Department>;
    updateDepartmentById(id: string, departmentDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteDepartmentById(id: string): Promise<void>;
}
