import { Controller, Body, Post, Response } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() UserDTO: LoginDTO, @Response() res,) {
        const user = await this.authService.findByEmail(UserDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.userService.signPayload(payload);

        res.cookie('accessToken', token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        return res.send(user);
    }
}
