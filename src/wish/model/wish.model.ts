import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/model/user.model";
import { Item } from "src/item/model/item.model";

//////////////// wish 테이블 /////////////////

@Table({
    tableName: "wish",
    timestamps: true,
    paranoid: true,
})

export class Wish extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_userId: number;


    @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    fk_itemId: number;


    @BelongsTo(() => User, 'fk_userId')
    userId: User;

    @BelongsTo(() => Item, 'fk_itemId')
    itemId: Item;
}