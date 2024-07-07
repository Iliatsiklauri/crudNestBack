import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Expense {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  cost: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
