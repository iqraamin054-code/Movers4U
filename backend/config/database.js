import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "movers4u",     // database name
    "root",         // mysql username
    "abdul#1234",     // mysql password
    {
        host: "127.0.0.1",
        dialect: "mysql"
    }
);

try {

    await sequelize.authenticate();

    console.log("MySQL Connected Successfully");

} catch(error){

    console.log("Database Error:", error);

}

export default sequelize;