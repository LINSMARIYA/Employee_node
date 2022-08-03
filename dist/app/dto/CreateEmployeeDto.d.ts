import { CreateAddressDto } from "./CreateAddressDto";
export declare class CreateEmployeeDto {
    name: string;
    username: string;
    experience: number;
    departmentId: string;
    password: string;
    role: string;
    status: string;
    dateOfJoining: string;
    address: CreateAddressDto;
}
