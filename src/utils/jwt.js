const jwt = require('jsonwebtoken');
const  {AuthenticationError} = require("apollo-server-express");

module.exports.genarateToken = (User) => {
    const date = Date.now();
    return jwt.sign({
            _id: User,
            exp: date + 604800
        },
        process.env.TOKEN_SECRET);
};

module.exports.checkUser = async function (req) {
    const token = req.headers['token'];
    if (token) {
        try {
          //  let authToken = parseAuthToken(token);
            return await jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (error) {
            console.log(error);
            throw new AuthenticationError('Your session expired. Sign in again.');
        }
    }
}

function parseAuthToken(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}