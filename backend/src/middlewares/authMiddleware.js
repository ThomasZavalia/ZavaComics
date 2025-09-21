const jwt = require("jsonwebtoken");

module.exports = async (req,res,next)=>
    {
        const token = req.headers["authorization"];
        if(!token){return res.status(403).json({message:"Token requerido"})};

        try
        {
            const decoded = jwt.verify(token.split("")[1],process.env.JWT_SECRET);
             const user = await User.findByPk(decoded.id);
             if (!user) 
                {
                return res.status(401).json({ message: "Usuario no encontrado" });
                }
            req.userId = decoded.id;
            req.userRole = user.role;
            next();
        
        }catch(err)
        {
            res.status(401).json({message:"Token invalido"});
        }
    };