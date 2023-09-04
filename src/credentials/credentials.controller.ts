import { Controller, Get, Post, Body,  Param, Delete, UseGuards, HttpStatus} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma} from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("credentials")
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary:"Create user's credential"})
  @ApiResponse({status:HttpStatus.CREATED})
  async create(@Body() createCredentialDto: CreateCredentialDto, @User() user:UserPrisma) {
    return await this.credentialsService.create(createCredentialDto,user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({summary:"Get user's credentials"})
  @ApiResponse({status:HttpStatus.OK})
  async findAll(@User() user:UserPrisma) {
    return await this.credentialsService.findAll(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({name:'credentialId',description:"credentialId",example:"1"})
  @ApiOperation({summary:"Get specific user's credential"})
  @ApiResponse({status:HttpStatus.OK})
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.credentialsService.findOne(+id,user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({name:'credentialId',description:"credentialId",example:"1"})
  @ApiOperation({summary:"Delete specific user's credential"})
  @ApiResponse({status:HttpStatus.OK})
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.credentialsService.remove(+id,user.id);
  }
}
