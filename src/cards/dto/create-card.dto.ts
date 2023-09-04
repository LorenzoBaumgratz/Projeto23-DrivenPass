import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateCardDto {
    @IsNotEmpty()     
    @IsString()
    @ApiProperty({example:"5555555555554444",description:"user's card number"})
    cardNumber:string

    @IsNotEmpty()  
    @IsString()
    @ApiProperty({example:"John Petterson",description:"user's card name"})
    cardName: string

    @IsNotEmpty()  
    @IsString()
    @ApiProperty({example:"123",description:"user's card CVC"})
    cardCVC:string

    @IsNotEmpty() 
    @IsString()
    @ApiProperty({example:"25/02",description:"user's card exp date"})
    cardExp:string

    @IsNotEmpty()  
    @IsNumberString()
    @ApiProperty({example:"123456",description:"user's card password"})
    cardPassword:string

    @IsNotEmpty()  
    @IsString()
    @ApiProperty({example:"credit",description:"user's card type (credit,debit,both)"})
    cardType: string

    @IsNotEmpty()   
    @IsBoolean()
    @ApiProperty({example:"true",description:"user's card is virtual or not"})
    virtual:boolean

    constructor(params?: Partial<CreateCardDto>) {
        Object.assign(this, params);
    }
}
