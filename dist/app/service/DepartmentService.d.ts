import { Department } from "../entities/Department";
import { DepartmentRespository } from "../Repository/DepartmentRepository";
export declare class DepartmentService {
    private departmentRepo;
    constructor(departmentRepo: DepartmentRespository);
    getAllDepartments(): Promise<Department[]>;
    getDepartmentById(id: string): Promise<Department>;
    createDepartment(departmentDetails: any): Promise<Department>;
    updateDepartmentById(id: string, departmentDetails: any): Promise<import("typeorm").UpdateResult>;
    softDeleteDepartmentById(id: string): Promise<void>;
}
