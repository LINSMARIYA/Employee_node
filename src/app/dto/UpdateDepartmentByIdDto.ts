import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentByIdDto{
    // @IsString()
    // public name: string;

    @IsUUID()
    public departmentId: string;


}