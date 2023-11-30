import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';
import { PlanModel } from './plan.model';
import { TrainerModel } from './trainer.model';
import { UserModel } from './user.model';

class ClientModel extends Model {
    public id!: number;
    public names!: string;
    public surnames!: string;
    public email!: string;
    public phone!: string;
    public address!: string;
    public status!: boolean;
    public planId!: number;
    public trainerId!: number;
}

ClientModel.init({
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
    }
}, {
    tableName: 'clients',
    sequelize: db,
    timestamps: false
})

// Relation with PlanModel and TrainerModel

PlanModel.hasOne(ClientModel, { as: 'plan', foreignKey: 'planId' });
ClientModel.belongsTo(PlanModel, { as: 'plan', foreignKey: 'planId' });

TrainerModel.hasOne(ClientModel, { as: 'trainer', foreignKey: 'trainerId' });
ClientModel.belongsTo(TrainerModel, { as: 'trainer', foreignKey: 'trainerId' });

UserModel.hasOne(ClientModel, { as: 'user', foreignKey: 'userId' });
ClientModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' });


export { ClientModel };