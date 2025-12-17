const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    googleID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    displayName: {
        type: DataTypes.STRING,
    },
    // We store tokens as JSON objects containing { iv, content } from our crypto util
    accessToken: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    refreshToken: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});
module.exports = User;