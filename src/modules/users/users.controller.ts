import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { UserInfoDto } from "./dto/user-info.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { hasRoles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { JWTUtil } from "../../common/utils/jwtUtil";
import { UserProfileDto } from "./dto/user-profile.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtUtil: JWTUtil
    ) {}

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
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
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }

    @Get('/current/:token')
    async getCurrentUser(@Param('token') token: string): Promise<User> {
        const email: string = this.jwtUtil.decode(token)['email'];
        return this.usersService.getUserInfoByEmail(email);
    }

    @Post('/change-profile/:id')
    async changeProfile(@Param('id') id, @Body() userProfileDto: UserProfileDto): Promise<User> {
        return this.usersService.changeProfile(id, userProfileDto);
    }

}
