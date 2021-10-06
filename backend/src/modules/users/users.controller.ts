import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { UserInfoDto } from "./dto/user-info.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser(@Body() userInfoDto: UserInfoDto): Promise<User> {
        return this.usersService.createUser(userInfoDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userInfoDto: UserInfoDto): Promise<User> {
        return this.usersService.updateUser(id, userInfoDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }

}
