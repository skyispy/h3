import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { SignInUserDTO, UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Item } from 'src/item/model/item.model';
import { Wish } from 'src/wish/model/wish.model';
import { Review } from 'src/review/model/review.model';
import { SellerReply } from 'src/review/model/sellerReply.model';
import { ItemImage } from 'src/item/model/itemImage.model';

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

    ///////////////////// 아이디로 유저 선택 //////////////////////
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

    ///////////////////// id 값으로 구매내역 아이템 정보 + 판매자 닉네임 조회 //////////////////
    async historyRender(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: { id },
            include: [{
                model: Item,
                as: 'boughtItem',
                include: [{
                    model: User,
                    as: "sellerId",
                    attributes: ["nickname"]// 판매자 닉네임만
                }],
                order: [['updatedAt', 'DESC']]
            }]
        })
    }

    ///////////////////// id 값으로 내 정보들 + 내가 판매중인 아이템 + 이미지 //////////////////////
    async includeMyItem(id: number): Promise<User> {
        console.log(id)
        return await this.userModel.findOne({
            where: { id },
            include: [{
                model: Item,
                as: 'sellingItem', // 내가 팔고 있는 아이템 rows
                include: [{
                    model: ItemImage, // 의 이미지
                    as: 'imgs',
                    order: [['id', 'ASC']], // 순서대로
                    attributes: ['imgPath'] // 이미지만
                }],
                order: [['id', 'DESC']]
            }]
        })
    }
    ///////////////////// id 값으로 내정보 + 내 위시 리스트 + 아이템 + 이미지 들 조회 //////////////////////
    async includeMyWish(id: number): Promise<User> {
        console.log(id)
        return await this.userModel.findOne({
            where: { id },
            include: [{
                model: Wish,
                as: 'wishItems', // 내가 좋아요 눌러논 rows
                include: [{
                    model: Item,
                    as: 'itemId', // rows들의 item
                    include: [{
                        model: ItemImage,
                        as: 'imgs', // item들의 imgs
                        attributes: ['imgPath']
                    }],
                    order: [['id', 'DESC']]
                }],
                order: [['id', 'DESC']]
            }]
        })
    }
    ///////////////////// id 값으로 내정보 + 내 댓글, 대댓글들 + 쓴 유저 이미지 조회 //////////////////////
    async includeMyReview(id: number): Promise<User> {
        console.log(id)
        return await this.userModel.findOne({
            where: { id },
            include: [{
                model: Review, // 리뷰 테이블
                as: 'receiveReviews', // 나에게 쓰여진 리뷰들 rows
                include: [{
                    model: User,
                    as: 'writerId', // 리뷰 단 댓글 작성자의 정보
                    attributes: ['profileImg', 'nickname'] // 댓글 작성자 이미지
                }, {
                    model: SellerReply,
                    as: 'receiveReply',
                    include: [{
                        model: User,
                        as: "sellerId", // 대댓글 작성자의 정보
                        attributes: ['profileImg', 'nickname'] // 대댓글 작성자 이미지
                    }],
                    order: [['id', 'DESC']]
                }],
                order: [['id', 'DESC']]
            }]
        })
    }

    async checkDuplicateEmail(email) {
        const data = await this.userModel.findOne({ where: { email } });
        if (data) return false;
        return true;
    }
    async checkDuplicateNickName(nickname) {
        const data = await this.userModel.findOne({ where: { nickname } });
        if (data) return false;
        return true;
    }
}
