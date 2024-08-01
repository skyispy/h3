import { Body, Controller, Get, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/auth.dto';
import { SignInUserDTO } from 'src/user/dto/user.dto';

@ApiTags("인증")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /////////////////////////// 카카오 버튼 누르면 여기로 요청 ! //////////////////////////////
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
  }

  @ApiOperation({ summary: "카카오 로그인" })
  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res: Response) {
    const user = {
      email: req.user.id,
      name: req.user.username
    }
    console.log(user);
    const result = await this.authService.validateLogin(user)

    if (result.token) { // 유저가 존재하는 경우
      // console.log(result.existUser);
      const date = new Date()
      const expireDate = new Date(date.setMinutes(date.getMinutes() + 60));
      res.cookie('loginToken', result.token, { httpOnly: true, expires: expireDate })
      res.send("인증성공")
      // res.redirect("/메인페이지")
    } else { // 존재하지 않는 경우
      // console.log(result.signToken);
      console.log("없어")
      res.redirect(`/auth/signSns?signToken=${result.signToken}`)
      // 카카오 id값 담긴 토큰 쿼리로 리다이렉트 회원가입 홈페이지로 !
    }
  }

  /////////////////////////// 구글 버튼 누르면 여기로 요청 ! //////////////////////////////
  @Get("/google")
  @UseGuards(AuthGuard('google'))
  googleLogin() {
  }

  @ApiOperation({ summary: "구글 로그인" })
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const { user } = req;
    console.log(user);
    const result = await this.authService.validateLogin(user)
    if (result.token) { // 유저가 존재하는 경우
      // console.log(result.existUser);
      const date = new Date()
      const expireDate = new Date(date.setMinutes(date.getMinutes() + 60));
      res.cookie('loginToken', result.token, { httpOnly: true, expires: expireDate })
      res.send("인증성공")
      // res.redirect("/메인페이지")
    } else { // 존재하지 않는 경우
      // console.log(result.signToken);
      console.log("없어")
      res.redirect(`/auth/signSns?signToken=${result.signToken}`)
      // 구글 email값 담긴 토큰 쿼리로 리다이렉트 회원가입 홈페이지로 !
    }
  }

  /////////////////////////// 일반 로그인 //////////////////////////////
  @ApiOperation({ summary: "일반 로그인" })
  @Post('/login')
  @ApiBody({
    schema: {
      properties: { email: { type: "string" }, upw: { type: "string" } }
    }
  })
  async userlogin(@Body() loginData: LoginDTO, @Res() res: Response) {
    try {
      const token = await this.authService.login(loginData) // 비밀번호맞으면 토큰 생성
      const date = new Date()
      const expireDate = new Date(date.setMinutes(date.getMinutes() + 60));
      res.cookie('loginToken', token, { httpOnly: true, expires: expireDate }) // 쿠키로
      return res.status(200).end(); // 로그인 성공, 메인페이지로 리다이렉트 해야함
    } catch (error) {
      return res.status(401).end() // 로그인 실패 얼러트 띄워야함
    }
  }


  /////////////////////////// 페이로드 확인 //////////////////////////////
  @ApiOperation({ summary: "페이로드 확인" })
  @Get('/profile')
  async getPayload(@Req() req) {
    const token = req.cookies.loginToken
    if (!token) {
      console.log("토큰없어")
    } else {
      const payload = await this.authService.getPayload(token);
      console.log(payload);
    }
  }

  /////////////////// 소셜 회원가입창 렌더 //////////////////////
  @Get("/signSns") // 쿼리
  async signSnsRender(@Query('signToken') signToken: string) {
    // 렌더 하면서 쿼리에 signToken값 같이 줘야함
    return
  }

  /////////////////// 소셜 회원가입 완료 //////////////////////
  @ApiOperation({ summary: "소셜 회원가입 완료" })
  @ApiBody({
    schema: {
      properties: { email: { type: "string" }, nickname: { type: "string" }, upw: { type: "string" }, profileImg: { type: "string" }, introduce: { type: "string" } }
    }
  })
  @Post("/signSns")
  async socialSignUp(@Body() SignInData: SignInUserDTO) {
    const payload = await this.authService.getPayload(SignInData.email)
    SignInData.email = payload.email
    console.log(SignInData);
    return this.authService.socialSignUp(SignInData) // 회원가입 완료
  }


}