
import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsUUID()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsString()
    public dateOfJoining: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;

}