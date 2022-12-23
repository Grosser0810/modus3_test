import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({  isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
