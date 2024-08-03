import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { EmployeesService } from 'src/employees/employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema, User, UserSchema } from 'src/common/schemas';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthenticationController],
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    AuthenticationService,
    JwtStrategy,
    EmployeesService,
    UsersService,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
