const {User,Comic,Calificacion}= require("../models");


exports.calificarComic = async (req,res)=>
{
    try
    {
        const {comicId} = req.params;
        const puntuacion = req.body;
        const userId = req.userId;

        if(puntuacion<1 || puntuacion>5)
            {
                return res.status(400).json({error:"La puntuacion debe ser entre 1 y 5"});

                
            }

            const usuario = await User.findByPk(userId);
            const comic = await Comic.findByPk(comicId);

            if(!usuario || !comic)
                {
                    return res.status(404).json({error:"Usuario o comic no encontrado"});
                }

                await Califiacion.upsert({
                    UserId:userId,
                    ComicId:comicId,
                    puntuacion,


                });
                res.json({message:"Calificacion registrada",comicId,puntuacion});

    }catch(err)
    {
        res.status(500).json({error:err.message});
    }
}