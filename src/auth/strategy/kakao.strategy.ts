import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao"

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>("KAKAO_CLIENT_ID"),
            callbackURL: configService.get<string>("KAKAO_CALLBACK_URL"),
        })
    }

    validate
}