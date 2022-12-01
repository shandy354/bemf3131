import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./userModel.js";

 const {DataTypes} = Sequelize;

 const Tanaman = db.define('tanaman', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    lokasi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },

    img: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
 }, {
    freezeTableName:true
 });

 User.hasMany(Tanaman);
 Tanaman.belongsTo(User, {foreignKey: 'userId'});
 export default Tanaman;