import { Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Review } from "src/review/model/review.model";
import { SellerReply } from "src/review/model/sellerReply.model";
import { Wish } from "src/wish/model/wish.model";


//////////////// user 테이블 /////////////////

@Table({
    tableName: "user",
    timestamps: true,
    paranoid: true,
})

export class User extends Model {
    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nickname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    upw: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    profileImg: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    introduce: string;

    @HasMany(() => Review, {
        foreignKey: 'fk_sellerId',
        onDelete: 'CASCADE'
    })
    receiveReviews: Review[]

    @HasMany(() => Review, {
        foreignKey: 'fk_writerId',
        onDelete: 'CASCADE'
    })
    writtenReviews: Review[]

    @HasMany(() => Wish, {
        foreignKey: 'fk_userId',
        onDelete: 'CASCADE'
    })
    wishItems: Wish[]

    @HasMany(() => SellerReply, {
        foreignKey: 'fk_sellerId',
        onDelete: 'CASCADE'
    })
    writtenReplys: SellerReply[]

}