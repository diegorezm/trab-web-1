import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "src/users/users.service";
import {SignInDto} from "./dto/signIn.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}
  async signIn(payload: SignInDto) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== payload.password) {
      throw new UnauthorizedException()
    }
    const tokenPayload = {sub: user.id, email: user.email};
    return {
      token: this.jwtService.sign(tokenPayload)
    };
  }
}
