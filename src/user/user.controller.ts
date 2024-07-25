import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("유저")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  ///////////////////// 회원가입 //////////////////////
  @Get('signup')
  @Render('signUp')
  signUpRender() {
    return;
  }

  @Get('login')
  @Render('login')
  loginRender() {
    return;
  }

  @ApiOperation({ summary: "회원가입" })
  @ApiBody({
    schema: {
      properties: { email: { type: "string" }, nickname: { type: "string" }, upw: { type: "string" }, profileImg: { type: "string" }, introduce: { type: "string" } }
    }
  })
  @Post("/signUp")
  signUp(@Body() signInData: SignInUserDTO) {
    return this.userService.signIn(signInData);
  }

  ///////////////////// 유저 선택 //////////////////////
  @ApiOperation({ summary: "유저 선택" })
  @Get("/:id")
  @Render('profile')
  selectUser(@Param("id") getId: number) {
    return this.userService.selectUser(getId);
  }

  ///////////////////// 유저 비밀번호, 이미지, 소개 수정 //////////////////////
  @ApiOperation({ summary: "회원정보 수정" })
  @ApiBody({
    schema: {
      properties: { nickname: { type: "string" }, upw: { type: "string" }, profileImg: { type: "string" }, introduce: { type: "string" } }
    }
  })
  @Put("/mod/:id")
  async updateUser(@Body() updateData: UpdateUserDTO, @Param("id") updateUserId: number) {
    return this.userService.updateUser(updateData, updateUserId);
  }

  ///////////////////// 회원 탈퇴(force) //////////////////////
  @ApiOperation({ summary: "회원 탈퇴(force)" })
  @Delete("/del/:id")
  deleteUser(@Param("id") DelId: number) {
    return this.userService.deleteUser(DelId);
  }
}
