
import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeByIdDto{
    @IsUUID()
    public id: string;


}