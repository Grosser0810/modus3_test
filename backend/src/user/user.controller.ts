import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
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

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req) {
        const { authorization } = req?.headers;
        if (authorization) {
            const decodedToken = this.jwtService.decode(authorization.split(' ')[1]);
            const user = await this.userService.findByEmail(decodedToken['email']);

            return this.userService.sanitizeUser(user);
        }
    }

    @Patch()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
    ]))
    async updateAvatar(@UploadedFiles() files: { avatar?: Express.Multer.File[] }, @Body() id: Types.ObjectId) {
        const { avatar } = files;
        const some = await this.userService.update(id, avatar[0]);
        return this.userService.sanitizeUser(some);
    }
}
