import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
export declare class Employee extends AbstractEntity {
    id: string;
    name: string;
    username: string;
    role: string;
    status: string;
    experience: string;
    doj: string;
    password: string;
    department: Department;
    departmentId: string;
}
