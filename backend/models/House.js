import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./User.js";

export const House = sequelize.define("House", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM(
            "Apartment",
            "House",
            "Portion"
        ),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            "pending",
            "approved",
            "rejected"
        ),
        defaultValue: "pending"
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isSold: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
},

soldTo: {
    type: DataTypes.INTEGER,
    allowNull: true
},

soldAt: {
    type: DataTypes.DATE,
    allowNull: true
}
});

// RELATIONSHIPS
User.hasMany(House, {
    foreignKey: "seller_id"
});

House.belongsTo(User, {
    foreignKey: "seller_id",
    as: "seller"
});