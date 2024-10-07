import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { ApiKeysModel } from "./api-keys.model";
import { HasOneGetAssociationMixin, NonAttribute } from "sequelize";

export interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users', timestamps: false})
export class UserModel extends Model<UserModel, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    declare email: string;

    @Column({type: DataType.TEXT, allowNull: false})
    declare password: string;

    @HasOne(() => ApiKeysModel, 'user_id')
    declare apiKey: NonAttribute<ApiKeysModel>;

    declare getApiKey: HasOneGetAssociationMixin<ApiKeysModel>;

}