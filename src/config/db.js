const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // keep this false to disable SQL query logging
    }
);
const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        //this sync will create the table if it does not exist (and do nothing if it already exists)
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with failure
    }
}
module.exports = { sequelize, connectDB };