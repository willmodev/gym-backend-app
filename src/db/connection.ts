import { Sequelize } from 'sequelize';


const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD;

const db = new Sequelize('gymdb', user, password, {
    host,
    dialect: 'mysql',
    port: 3306,
    // logging: false
});

export default db;