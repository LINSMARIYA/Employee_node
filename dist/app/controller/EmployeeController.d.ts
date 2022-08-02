import { AbstractController } from "../util/rest/controller";
import { EmployeeService } from "../service/EmployeeService";
import { Employee } from "../entities/Employee";
declare class EmployeeController extends AbstractController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    protected initializeRoutes(): void;
    private getEmployee;
    private getEmployeeById;
    private updateEmployeeById;
    private deleteEmployeeById;
    private createEmployee;
    getEmployeeByName(userName: string): Promise<Employee>;
    private login;
}
export default EmployeeController;
