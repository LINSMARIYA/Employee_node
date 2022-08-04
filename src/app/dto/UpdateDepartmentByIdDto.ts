import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentByIdDto{

    @IsUUID()
    public id: string;


}