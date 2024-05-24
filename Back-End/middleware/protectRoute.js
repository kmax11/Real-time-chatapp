import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req,res,next)=>{
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message:'unauthorized user - no token available'});
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

    if (!decode) {
        return res.status(401).json({message:'unauthorized user - no token available'});
    }

    const user = await User.findById(decode.userId).select("-password");
    
    if (!user) {
        return res.status(401).json({message:'user not found'});
    }

    req.user = user;
    next();
}

export default protectRoute;