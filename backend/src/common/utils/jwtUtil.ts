import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { VerificationTokenPayload } from "../interfaces/verification-token-payload";

@Injectable()
export class JWTUtil {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): VerificationTokenPayload {
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(jwt, { json: true }) as VerificationTokenPayload;
    }
}
