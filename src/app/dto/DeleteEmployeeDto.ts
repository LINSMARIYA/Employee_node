
import { IsNumber, IsString, IsUUID } from "class-validator";

export class DeleteEmployeeDto {

    @IsUUID()
    public id: string;

}