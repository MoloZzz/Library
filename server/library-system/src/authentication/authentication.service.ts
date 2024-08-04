import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EmployeesService } from 'src/employees/employees.service';
import * as jwt from 'jsonwebtoken';
import { config } from 'process';

@Injectable()
export class AuthenticationService {
  constructor(
    private employeeService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.employeeService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
