import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { User as UserPrisma} from '@prisma/client';
import { User } from './decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(AuthGuard)
  @Delete("/erase")
  async erase(@User() user:UserPrisma){
    return await this.appService.erase(user.id)
  }
}
