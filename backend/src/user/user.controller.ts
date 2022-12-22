import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import { RegisterDTO } from './dto/register.dto'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Post()
    async register(@Body() RegisterDTO: RegisterDTO) {
        const user = await this.userService.create(RegisterDTO);
        const payload = {
            email: user.email,
        };

        const token = await this.userService.signPayload(payload);
        return { user, token };
    }
}
