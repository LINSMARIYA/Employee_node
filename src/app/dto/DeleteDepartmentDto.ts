
import { IsNumber, IsString, IsUUID } from "class-validator";

export class DeleteDepartmentDto {

    @IsUUID()
    public departmentId: string;


}