import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {AuthService} from "./auth.service";
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY || "SECRET_KEY",
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        return { userId: payload.sub, username: payload.username };

        return done(null, user, payload.iat);
    }
}