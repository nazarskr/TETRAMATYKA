import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { UpdatePasswordDto, UserLoginDto, UserRegisterDto, UserRegisterGoogleDto } from "./dto/user.dtos";
import { TokenRes } from "../../common/interfaces/token-res";

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

    @Post('/google-register')
    registerGoogleUser(@Body() userRegisterGoogleDto: UserRegisterGoogleDto): Promise<TokenRes> {
        return this.authService.registerGoogleUser(userRegisterGoogleDto);
    }

    // TODO login via BE
    // @Get('google/login')
    // @UseGuards(AuthGuard('google'))
    // googleLogin() {
    //     // initiates the Google OAuth2 login flow
    // }
    //
    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // googleLoginCallback(@Req() req, @Res() res) {
    //     const jwt: string = req.user.jwt;
    //     if (jwt) {
    //         res.redirect(process.env.HOST + '/google-login/success/' + jwt);
    //     } else {
    //         res.redirect(process.env.HOST + '/google-login/failure');
    //     }
    // }
}
