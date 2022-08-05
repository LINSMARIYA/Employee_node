import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../Repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";


export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}
  async getAllDepartments() {
    return await this.departmentRepo.getAllDepartments();
  }

  async getDepartmentById(id: string) {
    return await this.departmentRepo.getDepartmentById(id);
  }

  public async createDepartment(departmentDetails: any) {
    try {
      const newDepartment = plainToClass(Department, {
        name: departmentDetails.name,

      });
      const save = await this.departmentRepo.saveDepartmentDetails(
        newDepartment
      );
      
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create department", "code-400");
    }
  }

  public async updateDepartmentById(id: string, departmentDetails: any) {
    try {
      const updatedDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.updateDepartmentDetails(
        id,
        updatedDepartment
      );
      if(save.affected===0)
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
      else
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to update department", "code-400");
    }
  }

  public async softDeleteDepartmentById(id: string) {
    const deleted= await this.departmentRepo.softDeleteDepartmentById(id);
    if(deleted.affected===0)
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);

  }
}