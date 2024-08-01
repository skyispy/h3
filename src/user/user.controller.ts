import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ItemService } from 'src/item/item.service';
import { JwtService } from '@nestjs/jwt';

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
  signUpRender() {
    return;
  }

  ///////////////////// GET 로그인 창 //////////////////////
  @Get('login')
  @Render('login')
  loginRender() {
    return;
  }

  @Get('history')
  @Render('history')
  historyRender() {
    return;
  }

  ///////////////////// GET 유저 스토어 창 //////////////////////
  @ApiOperation({ summary: "유저 스토어" })
  @Get("/:id")
  // @Render('profile')
  async selectMyInclude(@Param("id") id: number, @Req() req) {
    const token = req.cookies.loginToken
    const data = await this.userService.selectMyInclude(id)
    if (!token) { // 토큰 없으면 그냥 데이터만 렌더
      return { data }
    } else { // 토큰 있으면 토큰 id값 전달
      const loginUserId = this.jwtService.verify(token).id
      console.log(loginUserId);
      return { data, loginUserId }
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

  ///////////////////// 유저 선택 //////////////////////
  @ApiOperation({ summary: "유저 선택" })
  @Get(":id")
  @Render('profile')
  selectUser(@Param("id") getId: number) {
    return this.userService.selectUser(getId);
  }

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
}
