const { User } = require("../models");
const Comic = require("../models/Comic");


exports.obtenerTodos = async (req,res)=>
{
try
{
const comics = await Comic.findAll();
res.json(comics);

}catch(err)
{
    res.status(500).json({message:"Error al obtener todos los comics"});
}
};




exports.crearComic = async (req,res)=>
    {
    try
        {
            const comic = await Comic.create(req.body);
            res.status(201).json(comic);


        }catch(err)
        {
            res.status(500).json({message:"Error al crear comic"});
        }
    };

    exports.editarComic = async (req,res)=>
        {
        try
            {
                const comic = await Comic.findByPk(req.params.id);
                if(!comic){return res.status(404).json({message:"Comic no encontrado"})};
                await comic.update(req.body);
                res.json(comic);


            }catch(err)
            {
                res.status(500).json({message:"Error al encontrar comic"});
            }
        };

        exports.eliminarComic = async (req,res)=>
        {
        try
            {
                const comic = await Comic.findByPk(req.params.id);
                if(!comic){return res.status(404).json({message:"Comic no encontrado"})};
                await comic.destroy();
                res.json({message:"Comic eliminado"});


            }catch(err)
            {
                res.status(500).json({message:"Error al eliminar el comic"});
            }
        };


        exports.obtenerComicPromedio = async (req,res)=>
            {
                try
                {
                   const {id} = req.params;
                    console.log("id:",id);
                    const comic = await Comic.findByPk(id,{

                        include:{

                            model:User,
                            as:"Calificadores",
                            attributes:["id","nombre"],
                            through:{attributes:["puntuacion"]},
                        },
                    });
                    if (!comic) return res.status(404).json({ error: "Comic no encontrado" });

   
    const puntajes = comic.Calificadores.map(u => u.Calificacion.puntuacion);
    const promedio = puntajes.length > 0
      ? (puntajes.reduce((a, b) => a + b, 0) / puntajes.length).toFixed(2)
      : null;

    res.json({ ...comic.toJSON(), calificacionPromedio: promedio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


    }

    exports.obtenerComic = async (req,res)=>
        {
            try {
    const { id } = req.params;
    const comic = await Comic.findByPk(id);
if (!comic) {
      return res.status(404).json({ message: "Comic no encontrado" });
    }
    res.json(comic);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comic", error });
  }
};
        
    
            
