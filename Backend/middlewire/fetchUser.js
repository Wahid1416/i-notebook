const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

function Featchuser(req,res,next) {

    const token=req.header("auth-token")
    if (!token){
        res.status(401).send("please send authenticate token")
    }
    try {
        const user=jwt.verify(token,JWT_SECRET)
        // console.log(user);
        req.user=user.user;
    } catch (error) {
        res.status(401).send("please send authenticate token")
    }
    next()
    
}

module.exports=Featchuser;