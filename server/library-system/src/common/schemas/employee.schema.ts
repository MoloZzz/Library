import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Employee extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  employmentDate: Date;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true, unique: true })
  password: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
