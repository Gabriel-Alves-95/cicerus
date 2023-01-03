import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
require('dotenv').config({ path: 'src/.env' });

const { 
    SQL_DB_USER, 
    SQL_DB_PASSWORD, 
    SQL_DB_HOST, 
    SQL_DB_PORT,
    SQL_DB_NAME, 
    MONGO_DB_USER, 
    MONGO_DB_PASSWORD, 
    MONGO_DB_HOST, 
    MONGO_DB_PORT, 
    MONGO_DB_NAME 
} = process.env; 

mongoose.connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`)
const mongooseDb = mongoose.connection;

const sequelizeDb = new Sequelize(`mysql://${SQL_DB_USER}:${SQL_DB_PASSWORD}@${SQL_DB_HOST}:${SQL_DB_PORT}/${SQL_DB_NAME}`, {
    dialect: 'mysql'
});

export {
    sequelizeDb,
    mongooseDb
};
