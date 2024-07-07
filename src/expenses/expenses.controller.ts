import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { currentUser } from 'src/users/dto/current-user.dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() currentUser: currentUser,
  ) {
    return this.expensesService.create(createExpenseDto, currentUser);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll().populate({
      path: 'userId',
      select: 'email _id',
    });
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.expensesService.remove(id);
  }
}
