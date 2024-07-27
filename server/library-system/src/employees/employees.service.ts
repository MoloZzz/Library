import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/common/dto/employees/create-employee-dto.dto';
import { CreateEmployeeFromUserDto } from 'src/common/dto/employees/create-employee-from-user-dto.dto';
import { UpdateEmployeeDto } from 'src/common/dto/employees/update-employee-dto.dto';
import { Employee } from 'src/common/schemas';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>, private readonly userService: UsersService,) {}

  async createFromUser(userId: string, createEmployeeDto: CreateEmployeeFromUserDto): Promise<Employee> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const employeeData : Employee = {
      user: user._id,
      position: createEmployeeDto.position,
      role: createEmployeeDto.role,
      employmentDate: new Date,
      password: createEmployeeDto.password,
    } as Employee;

    const createdEmployee = new this.employeeModel(employeeData);
    return createdEmployee.save();
  }

  async create(employee: CreateEmployeeDto): Promise<Employee> {
    let userId: string;
    const user = await this.userService.create({
      fullName: employee.fullName,
      phone: employee.phone,
      address: employee.address,
      formular: employee.formular,
      email: employee.email,
      });
    userId = user._id as string;
    const employeeData = {
      user,
      position: employee.position,
      role: employee.role,
      email: employee.email,
      password: employee.password,
      employmentDate: new Date,
    };

    const createdEmployee = new this.employeeModel(employeeData);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updatedEmployee;
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }
}
