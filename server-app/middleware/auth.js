var jwt = require('jsonwebtoken');
const secret = 'test';

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ msg: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts.length == 2) {
    return res.status(401).send({ msg: 'Token error' })
  }

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ msg: 'Token wrong formatted' })
  }

  const decrypt = jwt.verify(token, secret, (error, decode)=>{
    if(error) return {error: true, msg: "Invalid Token"}
    req.decode = decode;
  })
  return next()
}