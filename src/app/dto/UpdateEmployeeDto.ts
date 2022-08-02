
import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeDto {
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
    public doj: string;
}