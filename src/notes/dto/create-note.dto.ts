import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"something",description:"user's note lable"})
    rotulo:string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"some note",description:"user's note"})
    note:string 

    constructor(params?: Partial<CreateNoteDto>) {
        Object.assign(this, params);
    }
}
