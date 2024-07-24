import jwt from "jsonwebtoken";

const createToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    });

    const options = {
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite:'none',
        domain: process.env.NODE_ENV !== 'development' ? 'pentg-kr1l.onrender.com' : 'localhost',
        maxAge:30*24*60*60*1000
    }
    //set jwt as an httpOnly cookie
    res.cookie('jwt',token,options);
}

export default createToken;