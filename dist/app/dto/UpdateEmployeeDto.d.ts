import { Address } from "../entities/Address";
export declare class UpdateEmployeeDto {
    name: string;
    username: string;
    password: string;
    dateOfJoining: string;
    experience: number;
    status: string;
    role: string;
    departmentId: string;
    address: Address;
}
