import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Item } from 'src/item/model/item.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User) { }

    ///////////////////// 회원가입 //////////////////////
    async signUp(signInData: SignInUserDTO): Promise<User> {
        const { email, nickname, upw } = signInData;
        const hashed = bcrypt.hashSync(upw, 10);
        return await this.userModel.create({ email, nickname, upw: hashed, profileImg: "default.png", introduce: "" })
    }

    ///////////////////// 유저 선택 //////////////////////
    async selectUser(id: number): Promise<User> {
        return await this.userModel.findOne({ where: { id } })
    }
    ///////////////////// 이메일로 유저 선택 //////////////////////
    async selectUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ where: { email } })
    }

    ///////////////////// 유저 비밀번호, 이미지, 소개 수정 //////////////////////
    async updateUser(updateData: UpdateUserDTO, id: number, filename: string): Promise<number[]> {
        // updateData.profileImg = filename
        const { nickname, upw, profileImg, introduce } = updateData;
        const hashed = bcrypt.hashSync(upw, 10);
        console.log(filename);
        return await this.userModel.update({ nickname, upw: hashed, profileImg: filename, introduce }, { where: { id } })
    }

    ///////////////////// 회원 탈퇴(force) //////////////////////
    async deleteUser(id: number): Promise<Number> {
        return await this.userModel.destroy({ where: { id }, force: true })
    }

    ///////////////////// id 값으로 내 정보들 조회 //////////////////////
    async selectMyInclude(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: { id },
            include: [{
                model: Item,
                as: 'sellingItem'
            }]
        })
    }
}
