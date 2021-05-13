import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user.credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userCredentialDto:UserCredentialDto):Promise<User> {
        const { username, password } = userCredentialDto;
        const salt = bcrypt.genSaltSync();

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;

        try {
            const result = await user.save();
            return result;
        } catch (error) {
            console.log(error);
            if (error.code === '23505') {
                throw new ConflictException('Error, username exited');
            }else {
                throw new InternalServerErrorException();
            }
        }
    }

    async verifyUserPassword(userCredentialDto:UserCredentialDto) {
        const { username, password } = userCredentialDto;
        const user = await this.findOne({username});
        if (user && await user.verifyPassword(password)) {
            return user.username;
        }else {
            return null
        }
    }

    async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}