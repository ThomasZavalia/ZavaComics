const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.register=async (req,res)=>
    {
        try
        {
            const{nombre,email,password}=req.body;
            const existe = await User.findOne({where:{email}});
            if (existe) return res.status(400).json({message:"Email ya registrado"});

            const hash = await bcrypt.hash(password,10);
            const usuario = await User.create({nombre,email,password:hash});

            res.json(usuario);
        }catch(err)
        {
            res.status(500).json({error:err.message});

        }
        
        };


        exports.login = async (req,res)=>
        {
            try
            {
                const {nombre,email,password}=req.body;

                const usuario = await User.findOne({where:{email}});
                if(!usuario){return res.status(400).json({message:"Credenciales invalidas"})};

                const coincide = await bcrypt.compare(password,usuario.password);
                if(!coincide){return res.status(400).json({message:"Credenciales invalidas"})};

               const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1d" });

                
                res.json({token});

            }catch(err)
            {
                res.status(500).json({error:err.message});
            }

        }
    

        exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ['id', 'nombre', 'email', 'rol'] });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};