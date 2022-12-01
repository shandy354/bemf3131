import { Sequelize } from "sequelize";

const db = new Sequelize('matchingfund1', 'root','', {
    host: "localhost",
    dialect: "mysql"

});

export default db;