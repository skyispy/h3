import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, Render, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ItemService } from 'src/item/item.service';
import { JwtService } from '@nestjs/jwt';
import { TokenGuard } from 'src/common/guard/token.guard';

@ApiTags("유저")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  ///////////////////// GET 회원가입 창 //////////////////////
  @Get('signup')
  @Render('signUp')
  signUpRender(@Param('true') compare: string) {
    return {compare};
  }

  ///////////////////// GET 로그인 창 //////////////////////
  @Get('login')
  @Render('login')
  loginRender() {
    return;
  }

  @Get('history/:id')
  @Render('history')
  @UseGuards(TokenGuard)
  async historyRender(@Param("id") id : number, @Req() req) {
    if (req.user.id === id) {
      const data = await this.userService.historyRender(id)
      return {data}
    } else {
      throw new UnauthorizedException
    }
  }
  
  ///////////////////// GET 유저 스토어 창 //////////////////////
  @ApiOperation({ summary: "유저 스토어" })
  @Get(":id")
  @Render('profile')
  async selectMyInclude(@Param("id") id: number, @Req() req) {
    const token = req.cookies.loginToken
    const data = await this.userService.selectMyInclude(id)
    if (!token) { // 토큰 없으면 그냥 데이터만 렌더
      return { data }
    } else { // 토큰 있으면 토큰 id값 전달
      try {
        const loginUserId = this.jwtService.verify(token).id
        console.log(loginUserId);
        console.log(data.id);
        return { data, loginUserId }
      } catch (error) { // 쿠키에 토큰은 있으나 유효하지 않을 경우 예외 처리
        return { data }
      }
    }
  }

  ///////////////////// POST 일반 회원가입 //////////////////////
  @ApiOperation({ summary: "회원가입" })
  @ApiBody({
    schema: {
      properties: { email: { type: "string" }, nickname: { type: "string" }, upw: { type: "string" } }
    }
  })
  @Post("signUp")
  signUp(@Body() signInData: SignInUserDTO) {
    // console.log(signInData);
    return this.userService.signUp(signInData);
  }

  // ///////////////////// 유저 선택 //////////////////////
  // @ApiOperation({ summary: "유저 선택" })
  // @Get(":id")
  // @Render('profile')
  // selectUser(@Param("id") getId: number) {
  //   return this.userService.selectUser(getId);
  // }

  ///////////////////// 유저 비밀번호, 이미지, 소개 수정 (멀터)//////////////////////
  ///////////////////// PUT 유저 비밀번호, 이미지, 소개 수정 (멀터)//////////////////////
  @ApiOperation({ summary: "회원정보 수정" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { nickname: { type: "string" }, upw: { type: "string" }, profileImg: { type: "string", format: "binary" }, introduce: { type: "string" } }
    }
  })
  @Put("mod/:id")
  @UseInterceptors(FileInterceptor("profileImg")) // 파일 인터셉터
  async updateUser(@Body() updateData: UpdateUserDTO, @Param("id") updateUserId: number, @UploadedFile() file: Express.Multer.File) {
    console.log(updateData);
    return this.userService.updateUser(updateData, updateUserId, file.filename);
  }

  ///////////////////// DELETE 회원 탈퇴(force) //////////////////////
  @ApiOperation({ summary: "회원 탈퇴(force)" })
  @Delete("del/:id")
  deleteUser(@Param("id") DelId: number) {
    return this.userService.deleteUser(DelId);
  }

  ///////////////////// POST 로그 아웃 //////////////////////
  @ApiOperation({ summary: "로그아웃" })
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('loginToken')
    return res.redirect("/")
  }

  // /// test 마이 스토어
  // @Get('test/:id')
  // selectMyInclude(@Param("id") id: number) {
  //   return this.userService.selectMyInclude(id)
  // }

  // 증복확인
  @Post('duplicate')
  async checkDuplicate(@Body('email') email: string, @Res() res: Response) {
    const result = await this.userService.checkDuplicateEmail(email);
    // 중복이 false 아니면 true
    await console.log(result)
    return await res.send(result)
  }
  @Post('duplicate2')
  async checkDuplicate2(@Body('nickname') nickname: string, @Res() res: Response) {
    const result = await this.userService.checkDuplicateNickName(nickname);
    // 중복이 false 아니면 true
    await console.log(result)
    return await res.send(result)
  }
}
