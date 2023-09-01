import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma:PrismaService){}

  async erase(userId: number) {
    await this.prisma.cards.deleteMany({
      where:{userId}
    })

    await this.prisma.notes.deleteMany({
      where:{userId}
    })

    await this.prisma.credential.deleteMany({
      where:{userId}
    })

    return await this.prisma.user.delete({
      where:{
        id:userId
      }
    })
  }
  getHello(): string {
    return "I'm okay!";
  }
}
