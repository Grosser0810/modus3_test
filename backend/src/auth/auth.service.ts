import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {Payload} from "../types/payload";
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signPayload(payload: Payload) {
        return sign(payload, process.env.SECRET_KEY || "SECRET_KEY", { expiresIn: '1d' });
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
    }
}
