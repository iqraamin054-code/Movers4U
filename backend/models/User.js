import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define("User", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    contact: {
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.ENUM("buyer", "seller", "admin"),
        allowNull: false
    },

    cnic_number: {
        type: DataTypes.STRING
    },

    cnic_front: {
        type: DataTypes.STRING
    },

    cnic_back: {
        type: DataTypes.STRING
    },

    contact_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },

    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true
}
});