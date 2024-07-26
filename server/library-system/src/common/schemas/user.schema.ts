import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: string;

  @Prop()
  formId: string;

  @Prop({ required: true })
  registrationDate: Date;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
