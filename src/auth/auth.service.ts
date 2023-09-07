import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUserGoogle(user: any) {
    const userRegistred = await this.usersService.findOne(user.email);
    console.log('User Registred' + userRegistred);
    if (userRegistred) {
      console.log('Return User Registred');
      return userRegistred;
    } else {
      const newUser = await this.usersService.createUserGoogle(
        user.firstName + ' ' + user.lastName,
        user.email,
        user.googleId,
        user.picture,
      );
      console.log('New User');
      return newUser;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
