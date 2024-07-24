import { IsNotEmpty , IsAlphanumeric, IsEmail} from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}