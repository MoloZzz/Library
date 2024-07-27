import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  formular: string;

  @Prop({ required: true })
  registrationDate: Date;

  @Prop({ unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
