import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./schemas/auth.schema";
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      UserModule,
      MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
