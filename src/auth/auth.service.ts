import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/auth.dto';
import { SignInUserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    /////////////////// 소셜 로그인 이미 가입 된 회원인지 확인 //////////////////////////
    async validateLogin(user: any): Promise<any> {
        let existUser = await this.userService.selectUserByEmail(user.email) // 유저 db 확인
        if (!existUser) { // 유저 없을때
            const payload = { // 회원가입토큰 발급
                email: user.email // 카카오 아이디 3124124
            }
            const signToken = this.jwtService.sign(payload);
            return { signToken } // result.signToken
        } else { // 유저 있을때
            const payload = {
                id: existUser.id,
                // nickname: existUser.nickname,
                // profileImg: existUser.profileImg
            }
            const token = this.jwtService.sign(payload);
            return { token }; // result.token
        }
    }

    /////////////////// 이메일로 패스워드 검증 후 토큰 발급 (로그인) //////////////////////////
    async login(loginData: LoginDTO): Promise<any> {
        const { email, upw: loginPw } = loginData;
        const data = await this.userService.selectUserByEmail(email) // 유저db 이메일로검색
        const { upw } = data;
        const pwTrue = await bcrypt.compare(loginPw, upw) // db비밀번호 가 맞는지 확인
        console.log(pwTrue);
        if (pwTrue) {
            const { nickname, id, profileImg } = data;
            const payload = {
                id,
                // nickname, profileImg
            }
            const token = this.jwtService.sign(payload)
            return token;
        } else {
            // 비밀번호 안맞음
        }
    }


    /////////////////// 토큰 해제해서 페이로드값 추출 //////////////////////////
    async getPayload(token: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(token) // 시크릿명시안해도됨
            return await payload
        } catch (error) {
            return null;
        }
    }

    ///////////////////// 소셜 회원가입 완료 //////////////////////
    async socialSignUp(signInData: SignInUserDTO): Promise<any> {
        const hashed = bcrypt.hashSync(signInData.upw, 10);
        signInData.upw = hashed
        return await this.userService.signUp(signInData)
    }
}





