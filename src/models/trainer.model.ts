import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';

class TrainerModel extends Model {
    public id!: number;
    public names!: string;
    public surnames!: string;
    public email!: string;
    public phone!: string;
    public address!: string;
    public status!: boolean;
}

TrainerModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    names: {
        type: DataTypes.STRING(50),
    },
    surnames: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(50),
    },
    phone: {
        type: DataTypes.STRING(50),
    },
    address: {
        type: DataTypes.STRING(50),
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'trainers', 
    sequelize: db, 
    timestamps: false
})

export { TrainerModel };