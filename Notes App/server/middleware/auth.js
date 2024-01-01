const jwt = require('jsonwebtoken');
const User = require('../model/user');

async function requireAuth(req, res, next){
//Read the token
const token = req.cookies.autherization;
 
//Decode the token
var decoded = jwt.verify(token, process.env.SECRET);

//check expiration

if(Date.now() > decoded.expiresIn) return res.sendStatus(401);

//Find the user
const user = await User.findById(decoded.sub);
if(!user) return res.sendStatus(401)

//attach the use to req
req.user = user;
res.sendStatus(200)

//continue
next();
}

module.exports = requireAuth;