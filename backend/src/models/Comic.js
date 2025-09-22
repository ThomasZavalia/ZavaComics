const {DataTypes}=require("sequelize");
const sequelize = require("../config/db");

const Comic= sequelize.define("Comic",
{
id:
{
   type:DataTypes.INTEGER,
   autoIncrement:true,
   primaryKey:true,
},

titulo:
{
type:DataTypes.STRING,
allowNull:false,

},
genero:
{
type:DataTypes.STRING,
},
ilustrador:
{
    type:DataTypes.STRING,
},
escritor:
{
    type:DataTypes.STRING,
},
sinopsis:
{
    type:DataTypes.TEXT,
},
portada:
{
    type:DataTypes.STRING,
},
urlLectura:
{
    type:DataTypes.STRING,
},
precio:
{
    type:DataTypes.FLOAT,
    allowNull:false,
},
editorial:
{
    type:DataTypes.STRING,
},
fechaPublicacion:
{
type:DataTypes.DATE,

},


});

module.exports=Comic;

