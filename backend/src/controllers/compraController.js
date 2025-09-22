const { where } = require("sequelize");
const{User,Comic,Compra}=require("../models");

exports.comprarComic = async (req,res)=>
{
try
    {
        const {comicId}=req.params;
        const {numeroTarjeta,cvv}= req.body;
        const userId = req.userId;

        if(!numeroTarjeta || !cvv)
            {
                return res.status(400).json({message:"Datos de pago incompletos"});
            }
        if(numeroTarjeta.length!=16 || cvv.length!=3)
            {
                return res.status(400).json({message:"Pago rechazado: Tarjeta invalida"});
            }    

    const usuario = await User.findByPk(userId);
    const comic = await Comic.findByPk(comicId);

    if ( !usuario || !comic )
    {
        return res.status(404).json({message:"Usuario o comic no encontrados"});

    }

    const yaComprado = await Compra.findOne({where:{UserId: userId, ComicId: comicId }});
    if(yaComprado)
        {
            return res.status(400).json({message:"Ya has comprado este comic"});
        }

        const monto = comic.precio;
        const comprado = await Compra.create({UserId:userId,ComicId:comicId,monto});
        res.json({message:"Compra realizada con exito (simulada)",comprado,paymentStatus:"Aprobado"});

    }catch(err)
    {
        res.status(500).json({error:err.message});
    } 

};




exports.obtenerBiblioteca = async (req, res) => {
  try {
    const userId = req.userId; 

    const usuario = await User.findByPk(userId, {
      include: {
        model: Comic,
        through: { attributes: ["fechaCompra", "monto"] }, 
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario.Comics); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
