import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    login(@Body('email') email: string, @Body('password') password: string) {
        // console.log(email, password)
        return this.userService.login(email, password);
    }

    @Post('register')
    create(@Body() user: UserDto) {
        this.userService.create(user)
        // console.log(user);
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

}
