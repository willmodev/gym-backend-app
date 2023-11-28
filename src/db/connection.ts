import { Sequelize } from 'sequelize';


const host = process.env.DB_HOST;

const db = new Sequelize('gymdb', 'root','123456', {
    host,
    dialect: 'mysql',
    port: 3306,
    // logging: false
});

export default db;