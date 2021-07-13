import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() createUserDto: UserDto): Promise<User> {
        return this.authService.register(createUserDto);
    }
}
