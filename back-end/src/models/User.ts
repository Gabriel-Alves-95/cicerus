import { DataTypes } from "sequelize";
import { sequelizeDb } from '../db';

const User = sequelizeDb.define("User", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(60),
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    isEmailValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }

});

export default User;