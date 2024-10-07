import { IsEmail, IsNotEmpty } from "class-validator";
import { UserCreationAttrs } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto implements UserCreationAttrs{
    @ApiProperty({example: 'user@email.com', description: 'user email', type: String, required: true})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @ApiProperty({example: 'qwerty123', description: 'user password', type: String, required: true})
    @IsNotEmpty()
    readonly password: string; 
}