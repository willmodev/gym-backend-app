import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';
import { RoleModel } from './role.model';

class UserModel extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public status!: boolean;
    public roleId!: number;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(25),
    },
    password: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'users', 
    sequelize: db, 
    timestamps: false
})


RoleModel.hasMany(UserModel, { as : 'role', foreignKey: 'roleId' });
UserModel.belongsTo(RoleModel, { as : 'role', foreignKey: 'roleId' });

export { UserModel };