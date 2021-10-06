import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/reset-password')
    resetPassword(@Body() email: string): Promise<void> {
        return this.authService.resetPassword(email);
    }
}
