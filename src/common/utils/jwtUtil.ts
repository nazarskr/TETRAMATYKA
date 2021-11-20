import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { VerificationTokenPayload } from "../interfaces/verification-token-payload";

@Injectable()
export class JWTUtil {
    constructor(private readonly jwtService: JwtService) {}

    decode(jwt: string): VerificationTokenPayload {
        if (jwt) {
            return this.jwtService.decode(jwt, { json: true }) as VerificationTokenPayload;
        } else {
            throw new UnauthorizedException();
        }
    }
}
