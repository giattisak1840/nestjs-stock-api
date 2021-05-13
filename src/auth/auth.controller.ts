import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('test')
    @UseGuards(AuthGuard())
    test(@Req() req, @GetUsername() username) {
        // console.log(req);
        // return req.user.username
        return username;
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() userCredentialDto: UserCredentialDto) {
        return this.authService.signUp(userCredentialDto)
    }

    @Post('signin')
    signIn(@Body() userCredential: UserCredentialDto) {
        console.log(userCredential);
        return this.authService.signIn(userCredential)
    }
}
