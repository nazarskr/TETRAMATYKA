import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
        try {
            console.log(profile);
            const jwt: string = await this.authService.validateOAuthLogin(profile.email);
            const user = {jwt};
            done(null, user);
        } catch(err) {
            done(err, false);
        }
    }
}
