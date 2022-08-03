import { IsNumber, IsString, IsUUID } from "class-validator";

export class GetDepartmentDto {


    @IsUUID()
    public id: string;


}