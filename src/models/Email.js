const {DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Email = sequelize.define('Email', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    gmailId:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    threadId:{
        type: DataTypes.STRING,
    },
    subject:{
        type: DataTypes.STRING(500),
    },
    from:{
        type: DataTypes.STRING,
    },
    to:{
        type: DataTypes.STRING,
    },
    snippet:{
        type: DataTypes.TEXT,
    },
    date:{
        type: DataTypes.DATE,
    },
    isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
User.hasMany(Email, { foreignKey: 'userId', onDelete: 'CASCADE' });
Email.belongsTo(User, { foreignKey: 'userId' });
module.exports = Email;