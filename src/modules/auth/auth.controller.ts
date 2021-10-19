import { Body, Controller, Param, Post, Headers } from '@nestjs/common';
import { AuthService } from "./auth.service";
import {
    UpdatePasswordDto,
    UserChangePasswordDto,
    UserLoginDto,
    UserRegisterDto,
    UserRegisterGoogleDto
} from "./dto/user.dtos";
import { TokenRes } from "../../common/interfaces/token-res";
import { UserCredential } from "../users/schemas/user-credential.schema";

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
                   @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.authService.updatePassword(token, updatePasswordDto);
    }

    @Post('/forgot-password')
    async forgotPassword(@Body() body: {email: string}): Promise<void> {
        return this.authService.sendResetPassword(body.email);
    }

    @Post('/google-register')
    registerGoogleUser(@Body() userRegisterGoogleDto: UserRegisterGoogleDto): Promise<TokenRes> {
        return this.authService.registerGoogleUser(userRegisterGoogleDto);
    }

    @Post('/change-password')
    // @UseGuards(JwtAuthGuard)
    changeUserPassword(@Body() body: UserChangePasswordDto, @Headers() headers): Promise<UserCredential> {
        const token = headers.authorization;
        return this.authService.changeUserPassword(token, body);
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
