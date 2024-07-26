import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload/upload.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
    SequelizeModule.forFeature([User]),
    MulterModule.registerAsync({
      useClass: UploadService // 업로드 서비스 사용
    })],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // auth에서 쓸수있도록 exports
})
export class UserModule { }
