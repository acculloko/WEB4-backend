import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async login(email: string, password: string) {
        const foundUser = await this.findByEmail(email);

        if (!foundUser || foundUser.password != password) {
            return false;
        } else {
            return foundUser.id;
        }

    }

    async create(newUser: UserDto) {
        const registered = await this.findByEmail(newUser.email);

        if (registered) {
            return false
        }

        const dbUser = new UserEntity();
        dbUser.name = newUser.name;
        dbUser.email = newUser.email;
        dbUser.password = newUser.password;

        let purchases = newUser.purchases;
        purchases = JSON.stringify(purchases);
        console.log(purchases)
        dbUser.purchases = purchases

        const { id, email } = await this.userRepository.save(dbUser);

        return id
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        const foundUser = await this.userRepository.findOne({
            where: { email }
        });

        if (!foundUser) {
            return null
        }

        return {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password,
            purchases: foundUser.purchases
        }
    }

    async findById(id: string): Promise<UserDto | null> {
        const foundUser = await this.userRepository.findOne({
            where: { id }
        });

        if (!foundUser) {
            return null
        }

        return {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password,
            purchases: foundUser.purchases
        }
    }
}
