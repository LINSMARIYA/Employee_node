import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import authorize from "../middleware/authorize";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import { UpdateDepartmentDto } from "../dto/UpdateDepartmentDto";
import { UpdateDepartmentByIdDto } from "../dto/UpdateDepartmentByIdDto";
import { GetDepartmentDto } from "../dto/GetDepartmentDto";
import { DeleteDepartmentDto } from "../dto/DeleteDepartmentDto";

export class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, 
    authorize(["APP_CONSTANTS.sde,APP_CONSTANTS.admin"]),
    this.getDepartment);

    this.router.get(
      `${this.path}/:id`,
      authorize(["APP_CONSTANTS.sde,APP_CONSTANTS.admin"]),
      validationMiddleware(GetDepartmentDto, APP_CONSTANTS.params),
      this.getDepartmentById
    );

    this.router.put(
      `${this.path}/:id`,
      authorize([APP_CONSTANTS.admin]),
      validationMiddleware(UpdateDepartmentByIdDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
      this.updateDepartmentById
    );

    this.router.delete(
      `${this.path}/:id`,
      authorize([APP_CONSTANTS.admin]),
      validationMiddleware(DeleteDepartmentDto, APP_CONSTANTS.params),
      this.deleteDepartmentById
    );

    this.router.post(
      `${this.path}`,
      authorize([APP_CONSTANTS.admin]),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createDepartment)
      this.createDepartment
    );
  }
  private getDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getDepartmentById(
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

  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.updateDepartmentById(
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

  private deleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.softDeleteDepartmentById(
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

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
