import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserCredentialDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/, {message: 'password to week'})
    password: string;
}