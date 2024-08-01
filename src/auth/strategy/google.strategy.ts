import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get<string>("CLIENT_SECRET"),
            callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, user: Profile, done: any): Promise<any> {
        // console.log(user);
        const { emails, displayName } = user
        const userResult = {
            email: emails[0].value,
            name: displayName
        }
        // console.log(userResult);
        done(null, userResult);
    }



}