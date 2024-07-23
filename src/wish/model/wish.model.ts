import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/model/user.model";

//////////////// wish 테이블 /////////////////

@Table({
    tableName: "wish",
    timestamps: true,
    paranoid: true,
})

export class Wish extends Model {


    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    onOff: boolean;


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_userId: number;


    // @ForeignKey(() => Item)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    fk_itemId: number;


    @BelongsTo(() => User, 'fk_userId')
    userId: User;

    // @BelongsTo(() => Item, 'fk_itemId')
    // itemId: Item;
}