import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/common/dto/employees/create-employee-dto.dto';
import { CreateEmployeeFromUserDto } from 'src/common/dto/employees/create-employee-from-user-dto.dto';
import { UpdateEmployeeDto } from 'src/common/dto/employees/update-employee-dto.dto';
import { Employee, User } from 'src/common/schemas';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UsersService,
  ) {}

  async createFromUser(employee: CreateEmployeeFromUserDto,): Promise<Employee> {
    const user = await this.userService.findOne(employee.userId);
    if (!user) {
      throw new NotFoundException(`User with id ${employee.userId} not found`);
    }

    console.log(user);
    const employeeData: Employee = {
      user: user._id,
      employmentDate: new Date(),
      position: 'Librarist',
      role: 'USER',
      password: employee.password,
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
      email: employee.email,
    });
    if (!user) {
      throw new BadRequestException('Error, during creating user');
    }
    userId = user._id as string;
    const employeeData = {
      user,
      password: employee.password,
      employmentDate: new Date(),
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

  async update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee> {console.log('here1')
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    if (employeeDto.user) {
      await this.userModel.findByIdAndUpdate(employee.user.id, employeeDto.user).exec();
    }
console.log('here')
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, employeeDto, { new: true })
      .populate('user')
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
