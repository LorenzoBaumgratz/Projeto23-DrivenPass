import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma:PrismaService){}
  
  create(createCredentialDto: CreateCredentialDto, user: User) {
    return this.prisma.credential.create({
      data:{
        rotulo:createCredentialDto.rotulo,
        senha:createCredentialDto.senha,
        url:createCredentialDto.url,
        username:createCredentialDto.username,
        userId:user.id
      }
    })
  }
  
  findByRotulo(rotulo:string, userId:number){
    return this.prisma.credential.findFirst({
      where:{
        userId,
        rotulo
      }
    })
  }

  delete(id: number, userId: number) {
    return this.prisma.credential.delete({
      where:{id,userId}
    })
  }

  findByIdAndUser(id: number, userId: number) {
    return this.prisma.credential.findFirst({
      where:{id,userId}
    })
  }

  findById(id:number){
    return this.prisma.credential.findFirst({
      where:{id}
    })
  }

  findByUserId(userId:number){
    return this.prisma.credential.findFirst({
      where:{userId}
    })
  }

  findAll(userId: number) {
    return this.prisma.credential.findMany({
      where:{userId}
    })
  }
}
