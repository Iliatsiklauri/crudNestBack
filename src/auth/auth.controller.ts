import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { currentUser } from 'src/users/dto/current-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() CreateUserDto: SignUpDto) {
    return this.authService.SignUp(CreateUserDto);
  }
  @Post('sign-in')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }
  @UseGuards(AuthGuard)
  @Get('current-user')
  curentUser(@CurrentUser() user: currentUser) {
    return this.authService.getCurrentUser(user);
  }
}
