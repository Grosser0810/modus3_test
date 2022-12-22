import {Injectable, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from "./schemas/user.schema";
import { RegisterDTO } from './dto/register.dto'
import {Payload} from "../types/payload";
import {sign} from "jsonwebtoken";
import {LoginDTO} from "../auth/dto/login.dto";
import * as bcrypt from 'bcrypt';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    sanitizeUser(user: UserDocument) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

    async signPayload(payload: Payload) {
        return sign(payload, process.env.SECRET_KEY || "SECRET_KEY", { expiresIn: '1d' });
    }

    async create(RegisterDTO: RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    @UseGuards(AuthGuard("jwt"))
    async getUser() {

    }

    async findByEmail(UserDTO: LoginDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('incorrect email or password', HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException('incorrect email or password', HttpStatus.BAD_REQUEST);
        }
    }

    async findByPayload(payload: Payload) {
        const { email } = payload;
        return this.userModel.findOne({email});
    }
}
