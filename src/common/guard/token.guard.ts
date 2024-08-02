import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { cookies: { loginToken } } = context.switchToHttp().getRequest();
        if (!loginToken) {
            throw new UnauthorizedException('쿠키에 토큰 없음') // 401
        }

        try {
            const payload = await this.jwtService.verifyAsync(loginToken) // 토큰 유효성 검사
            context.switchToHttp().getRequest().user = payload // 요청 객체에 user payload저장
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 토큰');
        }

        return true
    }
}

