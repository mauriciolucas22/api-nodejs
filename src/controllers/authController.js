const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send('OK');

  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Registration failed' })
  }
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