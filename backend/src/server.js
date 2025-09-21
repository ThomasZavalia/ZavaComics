const app = require("./app");
const sequelize = require("./config/db");

require("./models/Comic");
require("./models/Calificacion");
require("./models/Compra");
require("./models/User");
require("./models/index");

const PORT = 3000;

sequelize.sync({alter:true}).then(()=>
    {
        app.listen(PORT,()=>console.log(`Servidor en puerto ${PORT}`));
    });
