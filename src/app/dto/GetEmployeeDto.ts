import { IsNumber, IsString, IsUUID } from "class-validator";

export class GetEmployeeDto {


    @IsUUID()
    public employeeId: string;
    

}