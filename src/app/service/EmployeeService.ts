import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../Repository/EmployeeRepository";
import bcrypt from "bcrypt";
import  jsonwebtoken  from "jsonwebtoken";
import { CustomError, ErrorCodes } from "../util/errorCode";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";



export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {}
  async getAllEmployees() {
    return await this.employeeRepo.getAllEmployees();
  }

  async getEmployeeById(id: string) {
    const employee=await this.employeeRepo.getEmployeeById(id);
    if(!employee){
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
  }
    
  }

  public async createEmployee(employeeDetails: any) {
    try {
      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        username: employeeDetails.username,
        // age: employeeDetails.age,
        status: employeeDetails.status,
        role:employeeDetails.role,
        departmentId: employeeDetails.departmentId,
        doj:employeeDetails.doj,
        experience: employeeDetails.experience,
        password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
        // isActive: true,
      });
      const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "code-400");
    }
  }

  public async updateEmployeeById(id: string, employeeDetails: any) {
    try {
      const updatedEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        departmentId: employeeDetails.departmentId,
      });
      const save = await this.employeeRepo.updateEmployeeDetails(
        id,
        updatedEmployee
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "code-400");
    }
  }

  public async softDeleteEmployeeById(id: string) {
    return await this.employeeRepo.softDeleteEmployeeById(id);
  }
  
  public employeeLogin = async (
    name: string,
    password: string
  ) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByName(
      name
    );
    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {

      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "custom:role":employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      // console.log("Invalid");
      // throw new IncorrectUsernameOrPasswordException({
      //   "MESSAGE":"invalid password",
      //   "CODE":"INCORRECT_USERNAME_AND_PASSWORD_ERROR"}
      // );
      throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR);
    }
  };

 private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };

}
