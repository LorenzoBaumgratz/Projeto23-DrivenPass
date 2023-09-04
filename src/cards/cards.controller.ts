import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma} from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("cards")
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary:"User create payment card"})
  @ApiResponse({status:HttpStatus.CREATED})
  async create(@Body() createCardDto: CreateCardDto,@User() user:UserPrisma) {
    return await this.cardsService.create(createCardDto,user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({summary:"Get all user's payment cards"})
  @ApiResponse({status:HttpStatus.OK})
  async findAll(@User() user:UserPrisma) {
    return await this.cardsService.findAll(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({name:'cardId',description:"cardId",example:"1"})
  @ApiOperation({summary:"Get specific user's payment card"})
  @ApiResponse({status:HttpStatus.OK})
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.cardsService.findOne(+id,user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({name:'cardId',description:"cardId",example:"1"})
  @ApiOperation({summary:"Delete specific user's payment card"})
  @ApiResponse({status:HttpStatus.OK})
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.cardsService.remove(+id,user.id);
  }
}
