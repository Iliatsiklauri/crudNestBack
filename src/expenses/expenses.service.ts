import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { currentUser } from 'src/users/dto/current-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<Expense>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
  async create(createExpenseDto: CreateExpenseDto, currentUser: currentUser) {
    const obj = await this.ExpenseModel.create({
      ...createExpenseDto,
      userId: currentUser.id,
    });
    await this.usersService.addPost(currentUser.id, obj._id);
    return obj;
  }

  findAll() {
    return this.ExpenseModel.find();
  }

  async findOne(id) {
    const target = await this.ExpenseModel.findById(id);
    return target;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const obj = await this.ExpenseModel.findByIdAndUpdate(id, updateExpenseDto);
    return obj;
  }

  async remove(id) {
    await this.ExpenseModel.findByIdAndDelete(id);
    return this.usersService.removeFromParent(id);
  }
  async reset(id) {
    await this.ExpenseModel.deleteMany({ userId: id });
  }
}
