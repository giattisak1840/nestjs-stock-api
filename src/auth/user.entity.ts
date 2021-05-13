import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import * as bcrypt  from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async verifyPassword(password) {
        const hashPassword = await bcrypt.hash(password, this.salt);
        return this.password === hashPassword;
    }
}