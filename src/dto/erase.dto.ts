import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EraseDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"s3nh@f4rte",description:"user's login password"})
    password:string
}