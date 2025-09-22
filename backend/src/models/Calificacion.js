const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Calificacion = sequelize.define("Calificacion",
{
    id:
    {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    puntuacion:
    {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:
        {
            min:1,
            max:5,

        },
    },


});

module.exports=Calificacion;