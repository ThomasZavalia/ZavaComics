const User = require("./user");
const Comic = require("./comic");
const Compra = require("./Compra");
const Calificacion = require("./Calificacion");


User.belongsToMany(Comic,{through:Compra});
Comic.belongsToMany(User,{through:Compra});

User.belongsToMany(Comic,{through:Calificacion,as:"Calificaciones"});
Comic.belongsToMany(User,{through:Calificacion,as:"Calificadores"});

module.exports={User,Comic,Compra,Calificacion};