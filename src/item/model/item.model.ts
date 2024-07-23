import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ItemImage } from "./itemImage.model";

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

    @HasMany(() => ItemImage)
    items: ItemImage[];

    // @ForeignKey(() => User)
    // @Column
    // fk_sellerId : number;
    // fk_buyerId : number;

    // @BelongsTo(() => User)
    // user : USer;


}