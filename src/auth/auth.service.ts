import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/authuser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService:UsersService){}
    
    async signIn(authDto: AuthDto) {
        const user=await this.usersService.create(authDto)
    }

    async signUp(authDto: AuthDto) {
        throw new Error('Method not implemented.');
    }
    
}
