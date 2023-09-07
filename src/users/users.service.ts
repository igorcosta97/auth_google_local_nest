import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  //Implmentar integração com banco de dados.

  async createUserLocal(name: string, email: string, password: string) {
    const newPassword = bcrypt.hashSync(password, 8);
    const user = await this.prismaService.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        password: newPassword,
        googleId: '',
        picture: '',
        username: '',
      },
    });
    return user;
  }

  async createUserGoogle(
    name: string,
    email: string,
    googleId: string,
    picture: string,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        password: '',
        googleId,
        picture,
        username: '',
      },
    });
    return user;
  }

  async findOne(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }
}
