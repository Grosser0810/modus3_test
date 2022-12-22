import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import {LoginDTO} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
        const user = await this.authService.findByEmail(UserDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.userService.signPayload(payload);
        return { user, token };
    }
}
