import { AbstractController } from "../util/rest/controller";
import { EmployeeService } from "../service/EmployeeService";
declare class EmployeeController extends AbstractController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    protected initializeRoutes(): void;
    private getEmployee;
    private getEmployeeById;
    private getEmployeeByRole;
    private updateEmployee;
    private deleteEmployeeById;
    private createEmployee;
    private login;
}
export default EmployeeController;
