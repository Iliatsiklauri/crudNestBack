import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { currentUser } from 'src/users/dto/current-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersServise: UsersService,
    private JwtService: JwtService,
  ) {}

  async SignUp(CreateUserDto: SignUpDto) {
    const { email, password } = CreateUserDto;
    const existingUser = await this.usersServise.findByEmail(email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassoword = await bcrypt.hash(password, 10);
    await this.usersServise.create({ email, password: hashedPassoword });

    return 'user created succesfully';
  }

  async signIn(SignInDto: SignInDto) {
    const { email, password } = SignInDto;
    const existingUser = await this.usersServise.findByEmail(email);
    if (!existingUser) throw new BadRequestException('User is not registered');

    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) throw new UnauthorizedException('incorrect password');

    const jwtpPayload = {
      email: existingUser.email,
      id: existingUser.id,
    };
    const accessToken = await this.JwtService.sign(jwtpPayload);

    return { accessToken };
  }
  async getCurrentUser(user: currentUser) {
    return user;
  }
}
