import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {

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

  public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
    const employeeRepo = getConnection().getRepository(Employee);
    const updateEmployeeDetails = await employeeRepo.update(
      { id: employeeId, deletedAt: null },
      {
        name: employeeDetails.name ? employeeDetails.name : undefined,
        departmentId: employeeDetails.departmentId
          ? employeeDetails.departmentId
          : undefined,
      }
    );
    return updateEmployeeDetails;
  }

  public async softDeleteEmployeeById(employee:Employee) {
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