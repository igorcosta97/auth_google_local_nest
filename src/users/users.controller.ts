import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('create')
  async create(@Body() body) {
    const { name, email, password } = body;
    console.log(email);
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user) {
      return 'Users existents';
    }
    return await this.usersService.createUserLocal(name, email, password);
    //Criar tratativa de erro
  }
}
