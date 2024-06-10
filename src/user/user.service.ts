import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    private readonly users: UserDto[] = [
        {
            id: 'uuidgamer',
            name: 'user',
            password: '12345678',
            email: 'email@email.com',
            purchases: [{
                api_name: 'api gamer',
                api_token: '1234',
                api_exp_date: '06/10/2025'
            }]
        }
    ]

    login(email: string, password: string) {
        const foundUser = this.findByEmail(email);

        if (!foundUser || foundUser.password != password) {
            return false;
        } else {
            return foundUser.id;
        }

    }

    create(newUser: UserDto) {
        newUser.id = uuid();
        this.users.push(newUser);
        // console.log(this.users)
    }

    findByEmail(email: string): UserDto | null {
        return this.users.find(user => user.email === email);
    }

    findById(id: string): UserDto | null {
        return this.users.find(user => user.id === id);
    }
}
