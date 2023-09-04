import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { User as UserPrisma} from '@prisma/client';
import { User } from './decorators/user.decorator';
import { EraseDto } from './dto/erase.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @ApiOperation({summary:"Checks APIs health"})
  @ApiResponse({status:HttpStatus.OK, description:"Everything is okay"})
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post("/erase")
  @ApiBearerAuth()
  @ApiOperation({summary:"Get specific user's note"})
  @ApiResponse({status:204})
  async erase(@Body() eraseDto:EraseDto,@User() user:UserPrisma){
    return await this.appService.erase(eraseDto,user)
  }
}
