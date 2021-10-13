import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { UpdatePasswordDto, UserLoginDto, UserRegisterDto } from "./dto/user.dtos";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userLoginDto: UserLoginDto): Promise<any> {
        return this.authService.login(userLoginDto);
    }

    @Post('/register')
    register(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.register(userRegisterDto);
    }

    @Post('/new-password/:token')
    updatePassword(@Param('token') token: string,
                   @Body() createPasswordDto: UpdatePasswordDto) {
        return this.authService.updatePassword(token, createPasswordDto);
    }

    @Post('/forgot-password')
    forgotPassword(@Body() email: string): Promise<void> {
        return this.authService.sendResetPassword(email);
    }
}
