import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ItemImage } from "./itemImage.model";
import { User } from "src/user/model/user.model";
import { Wish } from "src/wish/model/wish.model";

@Table({
    tableName : "item",
    timestamps : true,
    paranoid : true
})

export class Item extends Model {
    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    title : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    content : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    category : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    brand : string

    @Column({
        type : DataType.BOOLEAN,
        allowNull : false
    })
    sold : boolean

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    price : number

    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_sellerId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    fk_buyerId: number;
    
    @BelongsTo(() => User, "fk_sellerId")
    sellerId: User;
    
    @BelongsTo(() => User, "fk_buyerId")
    buyerId: User;


    @HasMany(() => ItemImage, {
        onDelete: "CASCADE"
    })
    items: ItemImage[];

    @HasMany(() => Wish, {
        foreignKey: "fk_itemId",
        onDelete: "CASCADE"
    })
    haveWish: Wish[];

}