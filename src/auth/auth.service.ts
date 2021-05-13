import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user.credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {}

    signUp(userCredentialDto:UserCredentialDto) {
        return this.userRepository.signUp(userCredentialDto)
    }

    async signIn(userCredentialDto:UserCredentialDto) {
        const username = await this.userRepository.verifyUserPassword(userCredentialDto)
    
        if (!username) {
            throw new UnauthorizedException("Invalid username or password")
        }

        const payload = { username }
        console.log("payload"+username)
        const token = await this.jwtService.sign(payload)
        return {token}
    }
}
