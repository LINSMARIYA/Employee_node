import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS, { USER_ROLES } from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import authorize from "../middleware/authorize";
import { LoginDto } from "../dto/LoginDto";
import { GetEmployeeDto } from "../dto/GetEmployeeDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { DeleteEmployeeDto } from "../dto/DeleteEmployeeDto";
import { IdDto } from "../dto/IdDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {

    this.router.get(`${this.path}`,
   // authorize([USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.developer, USER_ROLES.engineer]),
    this.getEmployee);

 
/////////////////////////////////////////////=================
    this.router.get(`${this.path}/:role`,
    // authorize([USER_ROLES.admin, USER_ROLES.manager]),
    // validationMiddleware(GetEmployeeDto, APP_CONSTANTS.params),
    this.getEmployeeByRole);

//////////////////////////////////////////////======================
    console.log("Hello")
    this.router.get(`${this.path}/:id`,
    //authorize([USER_ROLES.admin, USER_ROLES.manager]),
    validationMiddleware(GetEmployeeDto, APP_CONSTANTS.params),
    this.getEmployeeById);

  


    this.router.put(`${this.path}/:id`,
    //authorize([USER_ROLES.admin]),
    validationMiddleware(IdDto, APP_CONSTANTS.params),
    validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
    this.updateEmployee);

    this.router.delete(`${this.path}/:id`, 
    // authorize([USER_ROLES.admin]),
    validationMiddleware(DeleteEmployeeDto, APP_CONSTANTS.params),
    this.deleteEmployeeById);

    this.router.post(
      `${this.path}`,
      //authorize([USER_ROLES.admin]),
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      this.createEmployee
    );
    this.router.post(`${this.path}/login`,
    //validationMiddleware(LoginDto,APP_CONSTANTS.body),
    this.login );
  }
  private getEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.getAllEmployees();
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
      const data = await this.employeeService.getEmployeeById(
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



  //============================================================================
  
  private getEmployeeByRole = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.getEmployeeByRole(
        request.params.role,
      
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };


  //==============================================================================
  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployee(request.body, request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err)
    }
  }

  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.softDeleteEmployee(
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
    
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (error) {
      next(error);
    }
  };



  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
     
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