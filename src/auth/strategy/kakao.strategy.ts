import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-kakao"

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") { // 패스포트의 이름
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>("KAKAO_CLIENT_ID"),
            callbackURL: configService.get<string>("KAKAO_CALLBACK_URL"),
        })
    }

    // 동의하고 로그인하면 실행할 함수
    async validate(accessToken: string, refreshToken: string, user: Profile, done: any): Promise<any> {
        const { id, username, _json } = user;
        const userResult = {
            id, // 카카오 아이디
            username, // 카카오 닉네임
            // email: _json.kakao_accout.email
        }
        // console.log(userResult);
        done(null, userResult);
        // req에 user값 추가
    }
}