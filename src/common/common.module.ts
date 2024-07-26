import { Module } from "@nestjs/common";
import { TokenGuard } from "./guard/token.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' }
        })
    ],
    providers: [TokenGuard],
    exports: [TokenGuard, JwtModule] // 다른 모듈에서 사용하기 위해
})
export class CommonModule { }