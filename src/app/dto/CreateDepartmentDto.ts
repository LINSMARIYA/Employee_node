
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;


    // @IsNumber()
    // public experience: number;

    @IsUUID()
    public departmentId: string;
}