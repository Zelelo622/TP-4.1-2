const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dbName = env === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME;

module.exports = new Sequelize(
    dbName,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);