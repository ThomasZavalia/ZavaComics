const app = require("./app");
const sequelize = require("./config/db");

require("./models");


const PORT = 3000;

sequelize.sync({alter:true}).then(()=>
    {
        app.listen(PORT,()=>console.log(`Servidor en puerto ${PORT}`));
    });
