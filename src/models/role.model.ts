import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class RoleModel extends Model {
    public id!: number;
    public name!: string;
}

const roles = ['CLIENT_ROLE', 'ADMIN_ROLE', 'TRAINER_ROLE'];

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        tableName: 'roles',
        sequelize: db, 
        timestamps: false
    }
)

RoleModel.afterSync(async () => {
  for (const role of roles) {
      await RoleModel.findOrCreate({
          where: { name: role },
          defaults: { name: role },
      }).then(([role, created]) => {
          console.log(role.get({ plain: true }));
          console.log(created);
      });
  }
});

export { RoleModel };