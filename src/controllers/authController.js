const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authConfig = require('../config/auth'); // hash unico para identificar token da app

// gera token
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // um dia
  });
};

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {

    if(await User.findOne({ email })){
      // verifica se email já existe
      return res.status(400).send({ error: 'Usuário já existe!' });
    }
    
    const user = await User.create(req.body);

    user.password = undefined; // remove password

    return res.send({
      user,
      token: generateToken({ id: user.id }), // token para apos cadastro se logar
    });

  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Registration failed' })
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  // Verifica se existe email e traz o password junto do banco de dados
  const user = await User.findOne({ email }).select('+password');

  // se user nao existe
  if (!user)
    return res.status(400).send({ error: 'User not found' });

  // compara a password enviada com a do bando de dados
  if (!await bcryptjs.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid passwrod' });

  user.password = undefined; // remove password

  // se existe devolve o user e token
  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

/**
 *  recupera o app de require('./controllers/authController')(app) in index.js
 *  
 *  para a rota /auth
 *  add /register
 * 
 *  ../auth/register
 */
module.exports = app => app.use('/auth', router);