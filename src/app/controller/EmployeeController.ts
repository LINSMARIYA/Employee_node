import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import authorize from "../middleware/authorize";
import { GetEmployeeDto } from "../dto/GetEmployeeDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { DeleteEmployeeDto } from "../dto/DeleteEmployeeDto";
import { UpdateEmployeeByIdDto } from "../dto/UpdateEmployeeByIdDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, /*authorize(),*/ this.getEmployee);

    this.router.get(`${this.path}/:id`, 
    validationMiddleware(GetEmployeeDto, APP_CONSTANTS.params),
    this.getEmployeeById);

    this.router.put(`${this.path}/:id`,
    validationMiddleware(UpdateEmployeeByIdDto, APP_CONSTANTS.params),
    validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.params),
    this.updateEmployeeById);

    this.router.delete(`${this.path}/:id`, 
    validationMiddleware(DeleteEmployeeDto, APP_CONSTANTS.params),
    this.deleteEmployeeById);

    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee
    );
    this.router.post(`${this.path}/login`, this.login );
  }
  private getEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeById(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.softDeleteEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    console.log(request.body)
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (error) {
      next(error);
    }
  };

  public async getEmployeeByUserName(userName: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
        where: { name: userName },
    });
    return employeeDetail;
}

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      console.log(request.body);
      const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username,
      loginData.password
      
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
    }
    catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;