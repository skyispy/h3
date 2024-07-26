import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Item } from "./item.model";


@Table ({
    tableName : "itemImage",
    timestamps : true,
    paranoid : true
})

export class ItemImage extends Model {
    @Column({
        type : DataType.TEXT,
        allowNull : false
    })
    imgPath : string

    @ForeignKey(()=> Item)
    @Column
    fk_sellerId: number;

    @BelongsTo(()=>Item)
    item: Item; 

}