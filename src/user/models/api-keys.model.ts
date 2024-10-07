import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";

interface ApiKeysCreationAttrs {
    key: string;
    user_id: number;
}

@Table({tableName: "api_keys", timestamps: false})
export class ApiKeysModel extends Model<ApiKeysModel, ApiKeysCreationAttrs>{
    @Column({type: DataType.TEXT, allowNull: false, unique: true, primaryKey: true})
    declare key: string;
    
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare user_id: number;
}