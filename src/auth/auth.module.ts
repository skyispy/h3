import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [UserModule, // user서비스쓸거 모듈을 임포트
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ //Jwt설정
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60m" }
    })],
  controllers: [AuthController],
  providers: [AuthService,
    { provide: "KAKAO_STRATEGY", useClass: KakaoStrategy },
    { provide: "GOOGLE_STRATEGY", useClass: GoogleStrategy }
    // useClass로 가져오고, 이름을 설정해서 사용가능
    // provide : "KAKAO_STRATEGY" Inject 데코레이터에서 가져오는 이름 auth.service.ts에 inject()안에 써서 사용가능
  ]
})
export class AuthModule { }
