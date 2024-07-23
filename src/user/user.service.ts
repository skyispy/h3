import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User) { }

    ///////////////////// 회원가입 //////////////////////
    async signIn(signInData: SignInUserDTO): Promise<User> {
        const { email, nickname, upw, profileImg, introduce } = signInData;
        return await this.userModel.create({ email, nickname, upw, profileImg, introduce })
    }

    ///////////////////// 유저 선택 //////////////////////
    async selectUser(id: number): Promise<User> {
        return await this.userModel.findOne({ where: { id } })
    }

    ///////////////////// 유저 비밀번호, 이미지, 소개 수정 //////////////////////
    async updateUser(updateData: UpdateUserDTO, id: number): Promise<number[]> {
        const { nickname, upw, profileImg, introduce } = updateData;
        return await this.userModel.update({ nickname, upw, profileImg, introduce }, { where: { id } })
    }

    ///////////////////// 회원 탈퇴(force) //////////////////////
    async deleteUser(id: number): Promise<Number> {
        return await this.userModel.destroy({ where: { id }, force: true })
    }
}
