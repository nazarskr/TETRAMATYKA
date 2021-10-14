import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { UserInfoDto } from "./dto/user-info.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { hasRoles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createUser(@Body() userInfoDto: UserInfoDto): Promise<User> {
        return this.usersService.createUser(userInfoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userInfoDto: UserInfoDto): Promise<User> {
        return this.usersService.updateUser(id, userInfoDto);
    }

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }

}
