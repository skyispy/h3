import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { SellerReply } from "./sellerReply.model";
import { User } from "src/user/model/user.model";

//////////////// review 테이블 /////////////////

@Table({
    tableName: "review",
    timestamps: true,
    paranoid: true,
})

export class Review extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    reviewComment: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    star: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_sellerId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_writerId: number;

    @BelongsTo(() => User, 'fk_sellerId')
    sellerId: User;

    @BelongsTo(() => User, 'fk_writerId')
    writerId: User;

    @HasMany(() => SellerReply, {
        foreignKey: 'fk_reviewId',
        onDelete: 'CASCADE'
    })
    receiveReply: SellerReply[]
}