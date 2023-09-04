import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class CreateCredentialDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"Facebook",description:"user's credential lable"})
    rotulo:string

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({example:"https://www.facebook.com",description:"user's credential url"})
    url:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"John",description:"user's credential username"})
    username:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"s3nh@f4rte",description:"user's credential password"})
    senha:string
    
    constructor(params?: Partial<CreateCredentialDto>) {
        Object.assign(this, params);
    }
}
