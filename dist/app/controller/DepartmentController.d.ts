import { AbstractController } from "../util/rest/controller";
import { DepartmentService } from "../service/DepartmentService";
export declare class DepartmentController extends AbstractController {
    private departmentService;
    constructor(departmentService: DepartmentService);
    protected initializeRoutes(): void;
    private getDepartment;
    private getDepartmentById;
    private updateDepartmentById;
    private deleteDepartmentById;
    private createDepartment;
}
export default DepartmentController;
