import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {

  async getAllEmployees(): Promise<Employee[]> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.find();
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne({
      where: {
          id,
      },
      relations: ['address'],
  });
  }


//========================================================================
  async getEmployeeByRole(role: string): Promise<Employee[]> {
    const employeeRepo = getConnection().getRepository(Employee);
    // console.log("in repo")
    return employeeRepo.find({
      where: {
        role
    },
   
});
}


//===============================================



  public async updateEmployee(employeeId: Employee): Promise<Employee> {
    const employeeRepo = getConnection().getRepository(Employee);
    const data = await employeeRepo.save(employeeId)
    //const updatedData = await employeeRepo.findOne(employeeId.id)
    return data;
}

  public async softDeleteEmployee(employee:Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.softRemove(
      employee
    );
  }
  public async saveEmployeeDetails(employeeDetails: Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.save(employeeDetails);
  }
  public async getEmployeeByUserName(username: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
        where: { username: username },
    });
    return employeeDetail;
}
}