import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersRepository {
  
  constructor(private readonly prisma:PrismaService){}
  private SALT=10
  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where:{
        email
      }
    })
  }
  
  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data:{
        ...createUserDto,
        senha:bcrypt.hashSync(createUserDto.senha,this.SALT)
      }
    })
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where:{
        id
      }
    })
  }
}
