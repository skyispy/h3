import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/model/user.model";
import { Review } from "./review.model";

//////////////// sellerReply 테이블 /////////////////

@Table({
    tableName: "sellerReply",
    timestamps: true,
    paranoid: true,
})

export class SellerReply extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    replyComment: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_sellerId: number;

    @ForeignKey(() => Review)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_reviewId: number;

    @BelongsTo(() => User, 'fk_sellerId')
    sellerId: User;

    @BelongsTo(() => Review, 'fk_reviewId')
    reviewId: Review;
}