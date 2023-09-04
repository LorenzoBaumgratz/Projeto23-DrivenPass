import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User as UserPrisma} from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("notes")
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary:"Create user's note"})
  @ApiResponse({status:HttpStatus.CREATED})
  async create(@Body() createNoteDto: CreateNoteDto,@User() user:UserPrisma) {
    return await this.notesService.create(createNoteDto,user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({summary:"Get user's notes"})
  @ApiResponse({status:HttpStatus.OK})
  async findAll(@User() user:UserPrisma) {
    return await this.notesService.findAll(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({name:'noteId',description:"noteId",example:"1"})
  @ApiOperation({summary:"Get specific user's note"})
  @ApiResponse({status:HttpStatus.OK})
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.notesService.findOne(+id,user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({name:'noteId',description:"noteId",example:"1"})
  @ApiOperation({summary:"Delete specific user's note"})
  @ApiResponse({status:HttpStatus.OK})
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.notesService.remove(+id,user.id);
  }
}
