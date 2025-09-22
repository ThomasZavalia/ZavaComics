const {Sequelize} = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


const sequelize = new Sequelize
(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASS,

{
    host:process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging:false,

});


module.exports=sequelize;


console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
});