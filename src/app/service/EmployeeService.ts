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
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Address } from "../entities/Address";



export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {}
  async getAllEmployees() {
    return await this.employeeRepo.getAllEmployees();
  }

  public async getEmployeeById(id: string) {
    const employee=await this.employeeRepo.getEmployeeById(id);
    if(!employee){
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
  }
    return employee;
  }

  public async createEmployee(employeeDetails: CreateEmployeeDto): Promise<Employee> {
    
    try {

        const newAddress = plainToClass(Address,{    
        line1: employeeDetails.address.line1,
        line2: employeeDetails.address.line2,
        city: employeeDetails.address.city,
        state: employeeDetails.address.state,
        country: employeeDetails.address.country,
        pincode: employeeDetails.address.pincode

      });

      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        username: employeeDetails.username,
        // age: employeeDetails.age,
        status: employeeDetails.status,
        role:employeeDetails.role,
        address: newAddress,
        departmentId: employeeDetails.departmentId,
        dateOfJoining:employeeDetails.dateOfJoining,
        experience: employeeDetails.experience,
        password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
        isActive: true,
      });
      const save: Employee = await this.employeeRepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
     throw new HttpException(400, "Failed to create employee", "code-400");
    //  throw err;
    }
  }

  public async updateEmployeeById(id: string, employeeDetails: any) {
    try {
        await this.getEmployeeById(id);
        
        const newAddress = plainToClass(Address,{
          id: employeeDetails.address.id,
          line1: employeeDetails.address.line1,
          line2: employeeDetails.address.line2,
          city: employeeDetails.address.city,
          state: employeeDetails.address.state,
          country: employeeDetails.address.country,
          pincode: employeeDetails.address.pincode
        });

        const updatedEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        departmentId: employeeDetails.departmentId,
        role:employeeDetails.role,
        status:employeeDetails.status,
        experience:employeeDetails.experience,
        dateOfJoining:employeeDetails.dateOfJoining,
        username:employeeDetails.username,
        address: newAddress,
        password:employeeDetails.password,
        isActive: true,
      });
      const updated = await this.employeeRepo.updateEmployeeDetails(
        id,
        updatedEmployee
      );
      if(updated.affected===0)
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_NOT_FOUND);
      else
      return updated;
    } catch (err) {
      throw new HttpException(400, "Failed to update employee", "code-400");
    }
  }

  public async softDeleteEmployeeById(id: string) {
    try{
      await this.getEmployeeById(id);
    const update=await this.employeeRepo.softDeleteEmployeeById(id);
    // if(update){
    //   throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);  
    // }
  }
    catch(err){
      throw err;
    }
  }
    
  
  
  public employeeLogin = async (
    name: string,
    password: string
  ) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByUserName(
      name
    );
    if (!employeeDetails) {
     
      // throw new UserNotAuthorizedException();
      throw new EntityNotFoundException(ErrorCodes.EM)
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {

      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.username,
        //"custom:role": "admin",
        "custom:role":employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      console.log("Error");
      throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR);
    }
  };

 private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };

}
