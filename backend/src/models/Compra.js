const {DataTypes}= require("sequelize");
const sequelize = require("../config/db");

const Compra = sequelize.define("Compra",
{
id:
{
type:DataTypes.INTEGER,
autoIncrement:true,
primaryKey:true,
},
fechaCompra:
{
type:DataTypes.DATE,
defaultValue:DataTypes.NOW,
},
monto:
{
    type:DataTypes.FLOAT,
    allowNull:false,
},


});

module.exports=Compra;