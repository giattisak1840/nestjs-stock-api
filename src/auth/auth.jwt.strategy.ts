import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as config from 'config';

const jwtConfig = config.get('jwt');

export class AuthJwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secretKey
        });
    }

    async validate(payload) {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });
    
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}