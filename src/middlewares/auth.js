const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // se token existe
  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

  /**
   * Bearer ...
   * separa Bearer do token
   * nao tem as duas partes
   * retorna 401
   */
  const parts = authHeader.split(' ');

  if (!parts.lenght === 2)
    return res.status(401).send({ error: 'Token error' });
  
  // 2 partes ? então separa/desestrutura
  const [ scheme, token ] = parts;

  // se scheme tem a palavra Bearer
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  /**
   * recebe token da desestruturacao
   * hash secret
   * call back com err e decoded
   * 
   * decoded: id do user se token estiver certo
   */
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    // recebe user.id=decoded.id de auth/authenticate
    req.userId = decoded.id;

    return next();
  });
};