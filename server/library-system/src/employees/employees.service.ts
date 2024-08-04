import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, User } from 'src/common/schemas';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import {
  CreateEmployeeDto,
  CreateEmployeeFromUserDto,
  UpdateEmployeeDto,
  UpdateUserDto,
} from 'src/common/dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UsersService,
  ) {}

  async createFromUser(employee: CreateEmployeeFromUserDto): Promise<Employee> {
    const user = await this.userService.findOne(employee.userId);
    if (!user) {
      throw new NotFoundException(`User with id ${employee.userId} not found`);
    }

    const hashedPassword: string = await bcrypt.hash(employee.password, 10);
    const employeeData: Employee = {
      user: user._id,
      employmentDate: new Date(),
      position: 'Librarist',
      role: 'USER',
      password: hashedPassword,
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
    });
    if (!user) {
      throw new BadRequestException('Error, during creating user');
    }
    userId = user._id as string;
    const hashedPassword: string = await bcrypt.hash(employee.password, 10);
    const employeeData = {
      user,
      email: employee.email,
      password: hashedPassword,
      employmentDate: new Date(),
    };

    const createdEmployee = new this.employeeModel(employeeData);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findById(id)
      .populate('user')
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    if (employeeDto.user) {
      const updateUser = await this.userService.update(
        employee.user._id as string,
        employeeDto.user as UpdateUserDto,
      );
      if (!updateUser) {
        throw new Error('User updating failed');
      }
      employeeDto.user = updateUser;
    }
    if (employeeDto.password) {
      employeeDto.password = await bcrypt.hash(employeeDto.password, 10);
    }
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, employeeDto, { new: true })
      .populate('user')
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updatedEmployee;
  }

  async delete(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }

  async findByName(fullName: string): Promise<Employee> {
    const employee = await this.employeeModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $match: {
          'user.fullName': fullName,
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          position: 1,
          employmentDate: 1,
          role: 1,
          password: 1,
        },
      },
    ]);
    if (!employee || employee.length === 0) {
      throw new NotFoundException(
        `Employee with user name ${fullName} not found`,
      );
    }
    return employee[0] as Employee;
  }

  async findOneByEmail(email: string): Promise<Employee> {
    return await this.employeeModel.findOne({ email: email }).exec();
  }
}
