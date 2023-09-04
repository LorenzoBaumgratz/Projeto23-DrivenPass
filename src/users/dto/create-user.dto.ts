import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example:"fulano@gmail.com",description:"user's email"})
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({example:"s3nh@F4rte",description:"user's password"})
    senha:string

    constructor(params?: Partial<CreateUserDto>) {
        Object.assign(this, params);
    }
}
