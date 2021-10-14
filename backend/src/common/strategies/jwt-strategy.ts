import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VerificationTokenPayload } from "../interfaces/verification-token-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_VERIFICATION_TOKEN_SECRET')
        });
    }

    async validate(payload: VerificationTokenPayload) {
        return payload.email;
    }
}
