const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");


const User = sequelize.define("User",
{
id:
{
type:DataTypes.INTEGER,
autoIncrement:true,
primaryKey:true
},
nombre:
{
type:DataTypes.STRING,
allowNull:false,

},
email:
{
type:DataTypes.STRING,
unique:true,
allowNull:false,
},

password:
{
type:DataTypes.STRING,
allowNull:false,
},
rol:
{
 type:DataTypes.ENUM("usuario","admin"),
 defaultValue:"usuario",   
},


});

module.exports= User;