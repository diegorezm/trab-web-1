import {Body, Controller, forwardRef, HttpCode, HttpStatus, Inject, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto} from "./dto/signIn.dto";
import {CreateUserDto} from "src/users/dto/create-user.dto";
import {UsersService} from "src/users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  signUp(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

}
