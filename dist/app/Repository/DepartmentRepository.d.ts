import { Department } from "../entities/Department";
export declare class DepartmentRespository {
    getAllDepartments(): Promise<Department[]>;
    getDepartmentById(id: string): Promise<Department>;
    updateDepartmentDetails(departmentId: string, departmentDetails: Department): Promise<import("typeorm").UpdateResult>;
    softDeleteDepartmentById(id: string): Promise<import("typeorm").UpdateResult>;
    saveDepartmentDetails(departmentDetails: Department): Promise<Department>;
}
