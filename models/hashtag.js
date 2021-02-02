const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.export = (sequelize, DataTypes) = sequelize.define(
    {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);
