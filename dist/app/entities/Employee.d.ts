import { AbstractEntity } from "./AbstractEntity";
import { Address } from "./Address";
import { Department } from "./Department";
export declare class Employee extends AbstractEntity {
    id: string;
    name: string;
    username: string;
    role: string;
    status: string;
    experience: string;
    dateOfJoining: string;
    password: string;
    department: Department;
    departmentId: string;
    address: Address;
    addressId: string;
}
