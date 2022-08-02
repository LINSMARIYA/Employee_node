import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentDtoByIdDto{
    // @IsString()
    // public name: string;

    @IsUUID()
    public departmentId: string;


}