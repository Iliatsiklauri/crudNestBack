import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ExpensesService } from 'src/expenses/expenses.service';
import { findIndex } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => ExpensesService))
    private ExpensesService: ExpensesService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel
      .findOne({ email })
      .select(['email', 'password', '_id']);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async addPost(
    userId: mongoose.Schema.Types.ObjectId,
    expenseId: mongoose.Schema.Types.ObjectId,
  ) {
    const user = await this.userModel.findById(userId);
    user.expenses.push(expenseId);
    await user.save();
  }

  async remove(id) {
    await this.ExpensesService.reset(id);
    return this.userModel.findByIdAndDelete(id);
  }
  async removeFromParent(id) {
    const obj = await this.userModel.findOne({ expenses: id });
    const index = obj.expenses.findIndex((el) => el == id);
    obj.expenses.splice(index, 1);
    return obj.save();
  }
}
