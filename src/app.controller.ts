import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) { }

  @Get()
  @Render('main')
  async renderMain(@Req() req: Request) {
    const token = req.cookies.loginToken
    if (!token) {
      return
    } else {
      try {
        const loginUserId = this.jwtService.verify(token).id
        console.log(loginUserId)
        return { loginUserId }
      } catch (error) {
        return
      }
    }
  }
}
