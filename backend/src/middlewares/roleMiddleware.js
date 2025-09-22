module.exports = (roles)=>
    {
        return (req,res,next)=>
            {
                if(!roles.includes(req.userRole))
                    {
                        return res.status(403).json({message:"No tienes los permisos suficientes"});
                    }
                    next();
            };
    };