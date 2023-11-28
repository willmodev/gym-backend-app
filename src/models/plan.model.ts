import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';


class PlanModel extends Model {

    public id!: number;
    public name!: string;
    public description!: string;
    public durationInDays!: number;
    public price!: number;
    public status!: boolean;
}

PlanModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING(50),
    },
    description: {
        type: DataTypes.STRING,
    },
    durationInDays: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'plans', 
    sequelize: db, 
    timestamps: false
})


export { PlanModel }