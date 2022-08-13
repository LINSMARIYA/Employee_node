import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../Repository/EmployeeRepository";
import bcrypt from "bcrypt";
import  jsonwebtoken  from "jsonwebtoken";
import { CustomError, ErrorCodes } from "../util/errorCode";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Address } from "../entities/Address";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";



export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepository) {}
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

    }
  }
//==========================================================

  public async getEmployeeByRole(role: string) {
    const employee=await this.employeeRepo.getEmployeeByRole(role);
    if(!employee){
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEES_WITH_ROLE_NOT_FOUND);
  }
    return employee;
  }


//==========================================================================
 

 

  public async softDeleteEmployee(id: string) {
    try{
      const employee=await this.employeeRepo.getEmployeeById(id)
      await this.employeeRepo.softDeleteEmployee(employee);
      
  }
    catch(err){
      throw new HttpException(400, "Failed to delete employee", "code-400");
    }
  }

  public async updateEmployee(employeeDetails: UpdateEmployeeDto, employeeId: string):Promise<Employee> {
    try {
        const updatedEmpAddress = plainToClass(Address, {
            id: employeeDetails.address.id,
            line1: employeeDetails.address.line1,
            line2: employeeDetails.address.line2,
            city: employeeDetails.address.city,
            state: employeeDetails.address.state,
            country: employeeDetails.address.country,
            pincode: employeeDetails.address.pincode,
        })
        const updatedEmployee = plainToClass(Employee, {
            id: employeeId,
            name: employeeDetails.name,
            username: employeeDetails.username,
            password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '',
            dateofjoining: employeeDetails.dateOfJoining,
            experience: employeeDetails.experience,
            status: employeeDetails.status,
            role: employeeDetails.role,
            departmentId: employeeDetails.departmentId,
            address: updatedEmpAddress
        })
        
        const save = await this.employeeRepo.updateEmployee(updatedEmployee);
        return save;
    } catch (err) {
      throw new HttpException(400, "Failed to update employee", "code-400");
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
      throw new EntityNotFoundException(ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR);
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
      throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORECT_USERNAME_PASSWORD_ERROR);
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };

}
