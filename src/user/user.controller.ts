import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags("유저")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  ///////////////////// 일반 회원가입 //////////////////////
  @ApiOperation({ summary: "회원가입" })
  @ApiBody({
    schema: {
      properties: { email: { type: "string" }, nickname: { type: "string" }, upw: { type: "string" } }
    }
  })
  @Post("/signUp")
  signUp(@Body() signInData: SignInUserDTO) {
    return this.userService.signUp(signInData);
  }

  ///////////////////// 유저 선택 //////////////////////
  @ApiOperation({ summary: "유저 선택" })
  @Get("/:id")
  selectUser(@Param("id") getId: number) {
    return this.userService.selectUser(getId);
  }

  ///////////////////// 유저 비밀번호, 이미지, 소개 수정 (멀터)//////////////////////
  @ApiOperation({ summary: "회원정보 수정" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: { nickname: { type: "string" }, upw: { type: "string" }, profileImg: { type: "string", format: "binary" }, introduce: { type: "string" } }
    }
  })
  @Put("/mod/:id")
  @UseInterceptors(FileInterceptor("profileImg")) // 파일 인터셉터
  async updateUser(@Body() updateData: UpdateUserDTO, @Param("id") updateUserId: number, @UploadedFile() file: Express.Multer.File) {
    console.log(updateData);
    return this.userService.updateUser(updateData, updateUserId, file.filename);
  }

  ///////////////////// 회원 탈퇴(force) //////////////////////
  @ApiOperation({ summary: "회원 탈퇴(force)" })
  @Delete("/del/:id")
  deleteUser(@Param("id") DelId: number) {
    return this.userService.deleteUser(DelId);
  }

  ///////////////////// 로그 아웃 //////////////////////
  @ApiOperation({ summary: "로그아웃" })
  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('loginToken')
    return res.redirect("/")
  }

  /// test 마이 스토어
  @Get('/test/:id')
  selectMyInclude(@Param("id") id: number) {
    return this.userService.selectMyInclude(id)
  }
}
