import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Mongoose } from 'mongoose';
import { Expense } from 'src/expenses/entities/expense.entity';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Expense' })
  expenses: [mongoose.Schema.Types.ObjectId];
}
export const UserSchema = SchemaFactory.createForClass(User);
