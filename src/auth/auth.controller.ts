import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authuser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('users')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post("/sign-in")
    @ApiOperation({summary:"User login"})
    @ApiResponse({status:HttpStatus.CREATED})
    async signIn(@Body() authDto:AuthDto){
        return await this.authService.signIn(authDto)
    }

    @Post("/sign-up")
    @ApiOperation({summary:"User create account"})
    @ApiResponse({status:HttpStatus.CREATED})
    async signUp(@Body() authDto:AuthDto){
        return await this.authService.signUp(authDto)
    }
}
