import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import { UserController } from './user.controller';
import {JwtModule} from "@nestjs/jwt";
import {FileService} from "../file/file.service";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, FileService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
